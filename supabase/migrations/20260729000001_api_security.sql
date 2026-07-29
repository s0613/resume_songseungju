-- API abuse controls: persistent fixed-window rate limits and inquiry
-- delivery idempotency. Raw IP addresses and inquiry contents are never stored.

-- 기존 조회수 RPC도 제한된 search_path와 명시적 service_role 권한으로 교체한다.
create or replace function public.increment_blog_view(p_slug text)
returns bigint
language sql
security definer
set search_path = pg_catalog, public
as $$
  insert into public.blog_views (slug, count)
  values (p_slug, 1)
  on conflict (slug)
  do update set count = public.blog_views.count + 1
  returning count;
$$;

create table if not exists public.api_rate_limits (
  scope text not null,
  key_hash text not null,
  window_start timestamptz not null,
  hit_count bigint not null,
  expires_at timestamptz not null,
  primary key (scope, key_hash, window_start),
  constraint api_rate_limits_scope_format
    check (scope ~ '^[a-z0-9:_-]{1,80}$'),
  constraint api_rate_limits_key_hash_format
    check (key_hash ~ '^[a-f0-9]{64}$'),
  constraint api_rate_limits_hit_count_positive check (hit_count > 0)
);

create index if not exists api_rate_limits_expires_at_idx
  on public.api_rate_limits (expires_at);

create or replace function public.consume_api_rate_limit(
  p_scope text,
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns table (
  allowed boolean,
  remaining integer,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_window_start timestamptz;
  v_window_end timestamptz;
  v_count bigint;
begin
  if p_scope is null
    or p_scope !~ '^[a-z0-9:_-]{1,80}$'
    or p_key_hash is null
    or p_key_hash !~ '^[a-f0-9]{64}$'
    or p_limit is null
    or p_limit < 1
    or p_limit > 100000
    or p_window_seconds is null
    or p_window_seconds < 1
    or p_window_seconds > 604800
  then
    raise exception 'invalid rate-limit parameters'
      using errcode = '22023';
  end if;

  v_window_start := to_timestamp(
    floor(extract(epoch from v_now) / p_window_seconds) * p_window_seconds
  );
  v_window_end := v_window_start + make_interval(secs => p_window_seconds);

  insert into public.api_rate_limits (
    scope,
    key_hash,
    window_start,
    hit_count,
    expires_at
  )
  values (
    p_scope,
    p_key_hash,
    v_window_start,
    1,
    v_window_end + interval '1 day'
  )
  on conflict (scope, key_hash, window_start)
  do update set
    hit_count = least(
      public.api_rate_limits.hit_count + 1,
      p_limit::bigint + 1
    ),
    expires_at = excluded.expires_at
  returning hit_count into v_count;

  allowed := v_count <= p_limit;
  remaining := greatest(p_limit::bigint - v_count, 0)::integer;
  retry_after_seconds := greatest(
    1,
    ceil(extract(epoch from (v_window_end - v_now)))::integer
  );

  -- 낮은 확률로 만료 bucket을 정리해 요청 경로의 쓰기 비용을 제한한다.
  if random() < 0.01 then
    delete from public.api_rate_limits
    where expires_at <= v_now;
  end if;

  return next;
end;
$$;

create table if not exists public.inquiry_delivery_attempts (
  review_fingerprint text primary key,
  request_id uuid not null,
  request_fingerprint text not null,
  state text not null,
  claimed_at timestamptz not null,
  sent_at timestamptz,
  expires_at timestamptz not null,
  constraint inquiry_delivery_review_fingerprint_format
    check (review_fingerprint ~ '^[a-f0-9]{64}$'),
  constraint inquiry_delivery_request_fingerprint_format
    check (request_fingerprint ~ '^[a-f0-9]{64}$'),
  constraint inquiry_delivery_state
    check (state in ('pending', 'sent')),
  constraint inquiry_delivery_sent_at
    check (
      (state = 'pending' and sent_at is null)
      or (state = 'sent' and sent_at is not null)
    )
);

create index if not exists inquiry_delivery_attempts_expires_at_idx
  on public.inquiry_delivery_attempts (expires_at);

create or replace function public.claim_inquiry_delivery(
  p_review_fingerprint text,
  p_request_id uuid,
  p_request_fingerprint text,
  p_pending_ttl_seconds integer
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_entry public.inquiry_delivery_attempts%rowtype;
  v_rows integer;
  v_attempt integer;
begin
  if p_review_fingerprint is null
    or p_review_fingerprint !~ '^[a-f0-9]{64}$'
    or p_request_id is null
    or p_request_fingerprint is null
    or p_request_fingerprint !~ '^[a-f0-9]{64}$'
    or p_pending_ttl_seconds is null
    or p_pending_ttl_seconds < 30
    or p_pending_ttl_seconds > 604800
  then
    raise exception 'invalid inquiry claim parameters'
      using errcode = '22023';
  end if;

  if random() < 0.01 then
    delete from public.inquiry_delivery_attempts
    where expires_at <= v_now;
  end if;

  for v_attempt in 1..2 loop
    insert into public.inquiry_delivery_attempts (
      review_fingerprint,
      request_id,
      request_fingerprint,
      state,
      claimed_at,
      sent_at,
      expires_at
    )
    values (
      p_review_fingerprint,
      p_request_id,
      p_request_fingerprint,
      'pending',
      v_now,
      null,
      v_now + make_interval(secs => p_pending_ttl_seconds)
    )
    on conflict (review_fingerprint) do nothing;

    get diagnostics v_rows = row_count;
    if v_rows = 1 then
      return 'claimed';
    end if;

    select *
    into v_entry
    from public.inquiry_delivery_attempts
    where review_fingerprint = p_review_fingerprint
    for update;

    if found then
      exit;
    end if;
  end loop;

  if not found then
    raise exception 'inquiry claim concurrency failure';
  end if;

  if v_entry.expires_at <= v_now then
    update public.inquiry_delivery_attempts
    set request_id = p_request_id,
        request_fingerprint = p_request_fingerprint,
        state = 'pending',
        claimed_at = v_now,
        sent_at = null,
        expires_at = v_now + make_interval(secs => p_pending_ttl_seconds)
    where review_fingerprint = p_review_fingerprint;
    return 'claimed';
  end if;

  if v_entry.request_id <> p_request_id then
    return 'review_token_already_used';
  end if;
  if v_entry.request_fingerprint <> p_request_fingerprint then
    return 'idempotency_conflict';
  end if;
  if v_entry.state = 'sent' then
    return 'replay';
  end if;
  return 'in_progress';
end;
$$;

create or replace function public.mark_inquiry_delivery_sent(
  p_review_fingerprint text,
  p_request_id uuid,
  p_request_fingerprint text,
  p_sent_ttl_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := clock_timestamp();
begin
  if p_review_fingerprint is null
    or p_review_fingerprint !~ '^[a-f0-9]{64}$'
    or p_request_id is null
    or p_request_fingerprint is null
    or p_request_fingerprint !~ '^[a-f0-9]{64}$'
    or p_sent_ttl_seconds is null
    or p_sent_ttl_seconds < 60
    or p_sent_ttl_seconds > 604800
  then
    raise exception 'invalid inquiry mark parameters'
      using errcode = '22023';
  end if;

  update public.inquiry_delivery_attempts
  set state = 'sent',
      sent_at = v_now,
      expires_at = v_now + make_interval(secs => p_sent_ttl_seconds)
  where review_fingerprint = p_review_fingerprint
    and request_id = p_request_id
    and request_fingerprint = p_request_fingerprint
    and state = 'pending';

  if found then
    return true;
  end if;

  return exists (
    select 1
    from public.inquiry_delivery_attempts
    where review_fingerprint = p_review_fingerprint
      and request_id = p_request_id
      and request_fingerprint = p_request_fingerprint
      and state = 'sent'
  );
end;
$$;

create or replace function public.release_inquiry_delivery(
  p_review_fingerprint text,
  p_request_id uuid,
  p_request_fingerprint text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if p_review_fingerprint is null
    or p_review_fingerprint !~ '^[a-f0-9]{64}$'
    or p_request_id is null
    or p_request_fingerprint is null
    or p_request_fingerprint !~ '^[a-f0-9]{64}$'
  then
    raise exception 'invalid inquiry release parameters'
      using errcode = '22023';
  end if;

  delete from public.inquiry_delivery_attempts
  where review_fingerprint = p_review_fingerprint
    and request_id = p_request_id
    and request_fingerprint = p_request_fingerprint
    and state = 'pending';
  return found;
end;
$$;

alter table public.api_rate_limits enable row level security;
alter table public.inquiry_delivery_attempts enable row level security;

revoke all on public.api_rate_limits
  from public, anon, authenticated, service_role;
revoke all on public.inquiry_delivery_attempts
  from public, anon, authenticated, service_role;

revoke execute on function public.consume_api_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
revoke execute on function public.increment_blog_view(text)
  from public, anon, authenticated;
revoke execute on function public.claim_inquiry_delivery(text, uuid, text, integer)
  from public, anon, authenticated;
revoke execute on function public.mark_inquiry_delivery_sent(text, uuid, text, integer)
  from public, anon, authenticated;
revoke execute on function public.release_inquiry_delivery(text, uuid, text)
  from public, anon, authenticated;

grant execute on function public.consume_api_rate_limit(text, text, integer, integer)
  to service_role;
grant execute on function public.increment_blog_view(text)
  to service_role;
grant execute on function public.claim_inquiry_delivery(text, uuid, text, integer)
  to service_role;
grant execute on function public.mark_inquiry_delivery_sent(text, uuid, text, integer)
  to service_role;
grant execute on function public.release_inquiry_delivery(text, uuid, text)
  to service_role;

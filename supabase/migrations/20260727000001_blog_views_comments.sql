-- 블로그 조회수
create table if not exists public.blog_views (
  slug text primary key,
  count bigint not null default 0
);

-- 익명 댓글 (이름 + bcrypt 비밀번호 해시)
create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null check (char_length(name) between 1 and 40),
  password_hash text not null,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_slug_created_idx
  on public.blog_comments (slug, created_at);

-- 조회수 원자적 증가
create or replace function public.increment_blog_view(p_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.blog_views (slug, count) values (p_slug, 1)
  on conflict (slug) do update set count = blog_views.count + 1
  returning count;
$$;

-- RLS: anon/authenticated 전면 차단 (모든 접근은 service_role 경유)
alter table public.blog_views enable row level security;
alter table public.blog_comments enable row level security;
revoke all on public.blog_views from anon, authenticated;
revoke all on public.blog_comments from anon, authenticated;
revoke execute on function public.increment_blog_view(text) from anon, authenticated, public;

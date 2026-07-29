import { posts } from "@/data/blog";
import type { RateLimitResult } from "@/lib/api-rate-limit";
import {
  ApiHttpError,
  noStoreJson,
  safeErrorMetadata,
} from "@/lib/api-security";

const SLUG_FORMAT = /^[a-z0-9-]{1,100}$/;
const UUID_FORMAT = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const KNOWN_SLUGS = new Set(posts.map((post) => post.slug));

/** 형식이 유효하고, src/data/blog.ts에 실제 존재하는 slug인지 확인한다. */
export function isValidSlug(slug: string): boolean {
  return SLUG_FORMAT.test(slug) && KNOWN_SLUGS.has(slug);
}

/** 댓글 id가 uuid 형식인지 확인한다. */
export function isValidUuid(id: string): boolean {
  return UUID_FORMAT.test(id);
}

export function notConfiguredResponse() {
  return noStoreJson({ error: "not_configured" }, { status: 503 });
}

export function invalidSlugResponse() {
  return noStoreJson({ error: "invalid_slug" }, { status: 400 });
}

export function invalidBodyResponse(reason: string) {
  return noStoreJson(
    { error: "invalid_body", reason },
    { status: 400 },
  );
}

export function httpErrorResponse(error: ApiHttpError) {
  return noStoreJson({ error: error.code }, { status: error.status });
}

export function rateLimitedResponse(rate: RateLimitResult) {
  return noStoreJson(
    { error: "rate_limited" },
    {
      status: 429,
      headers: { "Retry-After": String(rate.retryAfterSeconds) },
    },
  );
}

export function securityUnavailableResponse() {
  return noStoreJson(
    { error: "security_service_unavailable" },
    { status: 503 },
  );
}

export function dbErrorResponse(context: string, error: unknown) {
  // 쿼리/입력/credential이 포함될 수 있는 원본 에러는 로그에도 남기지 않는다.
  console.error(`[blog-api] ${context}`, safeErrorMetadata(error));
  return noStoreJson({ error: "db_error" }, { status: 500 });
}

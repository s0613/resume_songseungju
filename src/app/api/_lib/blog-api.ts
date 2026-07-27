// 블로그 조회수·댓글 API 공통 헬퍼 (slug 검증 + 표준 에러 응답)
import { NextResponse } from "next/server";
import { posts } from "@/data/blog";

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
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}

export function invalidSlugResponse() {
  return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
}

export function invalidBodyResponse(reason: string) {
  return NextResponse.json({ error: "invalid_body", reason }, { status: 400 });
}

export function dbErrorResponse(context: string, error: unknown) {
  // 내부 에러 메시지는 노출하지 않고 서버 로그에만 기록한다.
  console.error(`[blog-api] ${context}:`, error);
  return NextResponse.json({ error: "db_error" }, { status: 500 });
}

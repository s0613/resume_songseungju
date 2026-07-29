import bcrypt from "bcryptjs";
import { unstable_cache } from "next/cache";
import {
  consumeRateLimit,
  RateLimitUnavailableError,
  signApiValue,
  verifyApiValue,
} from "@/lib/api-rate-limit";
import {
  ApiHttpError,
  noStoreJson,
  readTrustedJsonBody,
} from "@/lib/api-security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  dbErrorResponse,
  httpErrorResponse,
  invalidBodyResponse,
  invalidSlugResponse,
  isValidSlug,
  notConfiguredResponse,
  rateLimitedResponse,
  securityUnavailableResponse,
} from "@/app/api/_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

const BCRYPT_COST = 10;
const MAX_BODY_BYTES = 16 * 1024;
const COMMENT_PAGE_SIZE = 100;
const CREATE_RATE_LIMIT = 5;
const CREATE_RATE_WINDOW_SECONDS = 10 * 60;
const COMMENT_READ_CACHE_SECONDS = 10;
const COMMENT_CURSOR_VERSION = "v1";
const COMMENT_CURSOR_DOMAIN =
  "songseungju.dev/blog-comment-cursor/v1";
const COMMENT_CURSOR_FORMAT =
  /^v1\.([A-Za-z0-9_-]{1,80})\.([A-Za-z0-9_-]{43})$/u;

/**
 * HTTP 응답은 no-store를 유지하되 동일 페이지의 Supabase read만 짧게
 * 공유한다. 오류는 throw되어 캐시에 저장되지 않는다.
 */
const readCommentPage = unstable_cache(
  async (slug: string, before: string | null, limit: number) => {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;

    let query = supabase
      .from("blog_comments")
      .select("id, name, body, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(limit + 1);
    if (before) query = query.lt("created_at", before);
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },
  ["blog-comment-page-v1"],
  { revalidate: COMMENT_READ_CACHE_SECONDS },
);

function createPageCursor(createdAt: string): string {
  const canonicalDate = new Date(createdAt).toISOString();
  const encoded = Buffer.from(canonicalDate, "utf8").toString("base64url");
  const value = `${COMMENT_CURSOR_VERSION}.${encoded}`;
  return `${value}.${signApiValue(COMMENT_CURSOR_DOMAIN, value)}`;
}

function parsePageCursor(cursor: string | null): string | null | undefined {
  if (cursor === null) return null;
  if (cursor.length > 160) return undefined;
  const match = COMMENT_CURSOR_FORMAT.exec(cursor);
  if (!match) return undefined;
  const [, encoded, suppliedMac] = match;
  const value = `${COMMENT_CURSOR_VERSION}.${encoded}`;
  if (!verifyApiValue(COMMENT_CURSOR_DOMAIN, value, suppliedMac)) {
    return undefined;
  }

  const decoded = Buffer.from(encoded, "base64url").toString("utf8");
  if (decoded.length > 40 || Number.isNaN(Date.parse(decoded))) {
    return undefined;
  }
  const canonicalDate = new Date(decoded).toISOString();
  if (
    Buffer.from(canonicalDate, "utf8").toString("base64url") !== encoded
  ) {
    return undefined;
  }
  return canonicalDate;
}

function parsePageOptions(request: Request): {
  limit: typeof COMMENT_PAGE_SIZE;
  before: string | null;
} | null {
  const searchParams = new URL(request.url).searchParams;
  for (const key of searchParams.keys()) {
    if (key !== "limit" && key !== "cursor") return null;
  }
  if (
    searchParams.getAll("limit").length > 1 ||
    searchParams.getAll("cursor").length > 1
  ) {
    return null;
  }
  const rawLimit = searchParams.get("limit");
  if (rawLimit !== null && rawLimit !== String(COMMENT_PAGE_SIZE)) return null;
  const before = parsePageCursor(searchParams.get("cursor"));
  return before === undefined
    ? null
    : { limit: COMMENT_PAGE_SIZE, before };
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  try {
    const page = parsePageOptions(request);
    if (!page) {
      return noStoreJson({ error: "invalid_query" }, { status: 400 });
    }
    // password_hash는 캐시 loader에서도 절대 select하지 않는다.
    const rows = await readCommentPage(slug, page.before, page.limit);
    if (rows === null) return notConfiguredResponse();
    const hasMore = rows.length > page.limit;
    const comments = rows.slice(0, page.limit).reverse();
    return noStoreJson(
      {
        comments,
        nextCursor:
          hasMore && comments[0]
            ? createPageCursor(comments[0].created_at)
            : null,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof RateLimitUnavailableError) {
      return securityUnavailableResponse();
    }
    return dbErrorResponse("comments GET", error);
  }
}

interface CreateCommentBody {
  name?: unknown;
  password?: unknown;
  body?: unknown;
  website?: unknown; // honeypot
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const payload = await readTrustedJsonBody(request, MAX_BODY_BYTES);
    const { slug } = await params;
    if (!isValidSlug(slug)) return invalidSlugResponse();
    if (payload === null || typeof payload !== "object") {
      return invalidBodyResponse("invalid_json");
    }
    const comment = payload as CreateCommentBody;

    // honeypot: 값이 채워져 있으면 스팸봇으로 간주해 조용히 무시한다.
    if (
      typeof comment.website === "string" &&
      comment.website.trim().length > 0
    ) {
      return new Response(null, {
        status: 204,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const name = typeof comment.name === "string" ? comment.name.trim() : "";
    const password =
      typeof comment.password === "string" ? comment.password : "";
    const body = typeof comment.body === "string" ? comment.body.trim() : "";

    if (name.length < 1 || name.length > 40) {
      return invalidBodyResponse("name");
    }
    // bcrypt의 72-byte 절삭을 피하고 새 댓글에는 최소 8자를 강제한다.
    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return invalidBodyResponse("password");
    }
    if (body.length < 1 || body.length > 2_000) {
      return invalidBodyResponse("body");
    }

    const rate = await consumeRateLimit({
      request,
      scope: "blog_comment_create",
      limit: CREATE_RATE_LIMIT,
      windowSeconds: CREATE_RATE_WINDOW_SECONDS,
    });
    if (!rate.allowed) return rateLimitedResponse(rate);

    const supabase = getSupabaseAdmin();
    if (!supabase) return notConfiguredResponse();
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

    const { data, error } = await supabase
      .from("blog_comments")
      .insert({ slug, name, password_hash: passwordHash, body })
      .select("id, name, body, created_at")
      .single();

    if (error) return dbErrorResponse("comments POST", error);

    return noStoreJson({ comment: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiHttpError) return httpErrorResponse(error);
    if (error instanceof RateLimitUnavailableError) {
      return securityUnavailableResponse();
    }
    return dbErrorResponse("comments POST", error);
  }
}

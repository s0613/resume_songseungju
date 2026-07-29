import bcrypt from "bcryptjs";
import {
  consumeRateLimit,
  RateLimitUnavailableError,
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
  isValidUuid,
  notConfiguredResponse,
  rateLimitedResponse,
  securityUnavailableResponse,
} from "@/app/api/_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string; id: string }> };

interface DeleteCommentBody {
  password?: unknown;
}

const MAX_BODY_BYTES = 2 * 1024;
const DELETE_RATE_LIMIT = 10;
const DELETE_RATE_WINDOW_SECONDS = 15 * 60;

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const payload = await readTrustedJsonBody(request, MAX_BODY_BYTES);
    const { slug, id } = await params;
    if (!isValidSlug(slug)) return invalidSlugResponse();
    if (!isValidUuid(id)) {
      return noStoreJson({ error: "invalid_id" }, { status: 400 });
    }
    if (payload === null || typeof payload !== "object") {
      return invalidBodyResponse("invalid_json");
    }

    const password =
      typeof (payload as DeleteCommentBody).password === "string"
        ? (payload as { password: string }).password
        : "";
    // 기존 4자리 댓글도 삭제할 수 있게 최소 길이는 유지하되 72-byte 절삭은 막는다.
    if (
      password.length < 1 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return invalidBodyResponse("password");
    }

    const rate = await consumeRateLimit({
      request,
      scope: "blog_comment_delete",
      limit: DELETE_RATE_LIMIT,
      windowSeconds: DELETE_RATE_WINDOW_SECONDS,
    });
    if (!rate.allowed) return rateLimitedResponse(rate);

    const supabase = getSupabaseAdmin();
    if (!supabase) return notConfiguredResponse();
    const { data: existing, error: fetchError } = await supabase
      .from("blog_comments")
      .select("id, password_hash")
      .eq("slug", slug)
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return dbErrorResponse("comments DELETE fetch", fetchError);
    if (!existing) {
      return noStoreJson({ error: "not_found" }, { status: 404 });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      existing.password_hash,
    );
    if (!passwordMatches) {
      return noStoreJson({ error: "wrong_password" }, { status: 403 });
    }

    const { error: deleteError } = await supabase
      .from("blog_comments")
      .delete()
      .eq("slug", slug)
      .eq("id", id);

    if (deleteError) return dbErrorResponse("comments DELETE delete", deleteError);

    return noStoreJson({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiHttpError) return httpErrorResponse(error);
    if (error instanceof RateLimitUnavailableError) {
      return securityUnavailableResponse();
    }
    return dbErrorResponse("comments DELETE", error);
  }
}

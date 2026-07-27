import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  dbErrorResponse,
  invalidBodyResponse,
  invalidSlugResponse,
  isValidSlug,
  isValidUuid,
  notConfiguredResponse,
} from "@/app/api/_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string; id: string }> };

interface DeleteCommentBody {
  password?: unknown;
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { slug, id } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();
  if (!isValidUuid(id)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  let payload: DeleteCommentBody;
  try {
    payload = await request.json();
  } catch {
    return invalidBodyResponse("invalid_json");
  }
  if (payload === null || typeof payload !== "object") {
    return invalidBodyResponse("invalid_json");
  }

  const password = typeof payload.password === "string" ? payload.password : "";
  // 상한 72바이트(UTF-8): 생성 시와 동일 — bcrypt 72바이트 절삭으로 인한 우회 방지.
  if (password.length < 1 || Buffer.byteLength(password, "utf8") > 72) return invalidBodyResponse("password");

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("blog_comments")
      .select("id, password_hash")
      .eq("slug", slug)
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return dbErrorResponse("comments DELETE fetch", fetchError);
    if (!existing) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const passwordMatches = await bcrypt.compare(password, existing.password_hash);
    if (!passwordMatches) {
      return NextResponse.json({ error: "wrong_password" }, { status: 403 });
    }

    const { error: deleteError } = await supabase
      .from("blog_comments")
      .delete()
      .eq("slug", slug)
      .eq("id", id);

    if (deleteError) return dbErrorResponse("comments DELETE delete", deleteError);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return dbErrorResponse("comments DELETE", error);
  }
}

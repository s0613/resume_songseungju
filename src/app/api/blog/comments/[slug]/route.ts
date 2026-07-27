import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  dbErrorResponse,
  invalidBodyResponse,
  invalidSlugResponse,
  isValidSlug,
  notConfiguredResponse,
} from "@/app/api/_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

const BCRYPT_COST = 10;

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  try {
    // password_hash는 절대 select하지 않는다.
    const { data, error } = await supabase
      .from("blog_comments")
      .select("id, name, body, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: true });

    if (error) return dbErrorResponse("comments GET", error);

    return NextResponse.json({ comments: data ?? [] }, { status: 200 });
  } catch (error) {
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
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  let payload: CreateCommentBody;
  try {
    payload = await request.json();
  } catch {
    return invalidBodyResponse("invalid_json");
  }
  if (payload === null || typeof payload !== "object") {
    return invalidBodyResponse("invalid_json");
  }

  // honeypot: 값이 채워져 있으면 스팸봇으로 간주 — 성공을 가장한 204로 조용히 무시한다.
  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return new NextResponse(null, { status: 204 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const password = typeof payload.password === "string" ? payload.password : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";

  if (name.length < 1 || name.length > 40) return invalidBodyResponse("name");
  // 상한 72바이트(UTF-8): bcrypt는 72바이트 이후를 절삭하므로 초과 입력을 거부한다.
  if (password.length < 4 || Buffer.byteLength(password, "utf8") > 72) return invalidBodyResponse("password");
  if (body.length < 1 || body.length > 2000) return invalidBodyResponse("body");

  try {
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

    const { data, error } = await supabase
      .from("blog_comments")
      .insert({ slug, name, password_hash: passwordHash, body })
      .select("id, name, body, created_at")
      .single();

    if (error) return dbErrorResponse("comments POST", error);

    return NextResponse.json({ comment: data }, { status: 201 });
  } catch (error) {
    return dbErrorResponse("comments POST", error);
  }
}

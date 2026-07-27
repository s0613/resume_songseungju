import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { dbErrorResponse, invalidSlugResponse, isValidSlug, notConfiguredResponse } from "@/app/api/_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  try {
    const { data, error } = await supabase
      .from("blog_views")
      .select("count")
      .eq("slug", slug)
      .maybeSingle();

    if (error) return dbErrorResponse("views GET", error);

    return NextResponse.json({ count: data?.count ?? 0 }, { status: 200 });
  } catch (error) {
    return dbErrorResponse("views GET", error);
  }
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  try {
    const { data, error } = await supabase.rpc("increment_blog_view", { p_slug: slug });
    if (error) return dbErrorResponse("views POST", error);

    return NextResponse.json({ count: data ?? 0 }, { status: 200 });
  } catch (error) {
    return dbErrorResponse("views POST", error);
  }
}

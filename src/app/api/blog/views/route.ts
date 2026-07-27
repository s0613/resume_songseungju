import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { dbErrorResponse, notConfiguredResponse } from "../../_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 블로그 목록용 — 전체 글의 조회수를 한 번에 반환한다. */
export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return notConfiguredResponse();

  try {
    const { data, error } = await supabase.from("blog_views").select("slug, count");
    if (error) return dbErrorResponse("views:list", error);

    const counts: Record<string, number> = {};
    for (const row of data ?? []) counts[row.slug] = row.count;
    return NextResponse.json({ counts });
  } catch (error) {
    return dbErrorResponse("views:list", error);
  }
}

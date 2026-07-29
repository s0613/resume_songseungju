import { unstable_cache } from "next/cache";
import { noStoreJson } from "@/lib/api-security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { dbErrorResponse, notConfiguredResponse } from "../../_lib/blog-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VIEW_LIST_CACHE_SECONDS = 10;

const readAllBlogViews = unstable_cache(
  async () => {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("blog_views")
      .select("slug, count");
    if (error) throw error;
    return data ?? [];
  },
  ["blog-view-list-v1"],
  { revalidate: VIEW_LIST_CACHE_SECONDS },
);

/** 블로그 목록용 — 전체 글의 조회수를 한 번에 반환한다. */
export async function GET() {
  try {
    const rows = await readAllBlogViews();
    if (rows === null) return notConfiguredResponse();

    const counts: Record<string, number> = {};
    for (const row of rows) counts[row.slug] = row.count;
    return noStoreJson({ counts });
  } catch (error) {
    return dbErrorResponse("views:list", error);
  }
}

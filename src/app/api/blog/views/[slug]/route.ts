import {
  consumeRateLimit,
  RateLimitUnavailableError,
} from "@/lib/api-rate-limit";
import { unstable_cache } from "next/cache";
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

const MAX_BODY_BYTES = 1024;
const VIEW_RATE_LIMIT = 1;
const VIEW_RATE_WINDOW_SECONDS = 10 * 60;
const VIEW_READ_CACHE_SECONDS = 10;

const readBlogView = unstable_cache(
  async (slug: string) => {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("blog_views")
      .select("count")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return { count: data?.count ?? 0 };
  },
  ["blog-view-v1"],
  { revalidate: VIEW_READ_CACHE_SECONDS },
);

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return invalidSlugResponse();

  try {
    const result = await readBlogView(slug);
    if (result === null) return notConfiguredResponse();
    return noStoreJson(result, { status: 200 });
  } catch (error) {
    return dbErrorResponse("views GET", error);
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const payload = await readTrustedJsonBody(request, MAX_BODY_BYTES);
    const { slug } = await params;
    if (!isValidSlug(slug)) return invalidSlugResponse();
    if (
      payload === null ||
      typeof payload !== "object" ||
      Array.isArray(payload) ||
      Object.keys(payload).length > 0
    ) {
      return invalidBodyResponse("invalid_json");
    }

    const rate = await consumeRateLimit({
      request,
      scope: "blog_view_increment",
      subject: slug,
      limit: VIEW_RATE_LIMIT,
      windowSeconds: VIEW_RATE_WINDOW_SECONDS,
    });
    if (!rate.allowed) return rateLimitedResponse(rate);

    const supabase = getSupabaseAdmin();
    if (!supabase) return notConfiguredResponse();
    const { data, error } = await supabase.rpc("increment_blog_view", {
      p_slug: slug,
    });
    if (error) return dbErrorResponse("views POST", error);

    return noStoreJson({ count: data ?? 0 }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiHttpError) return httpErrorResponse(error);
    if (error instanceof RateLimitUnavailableError) {
      return securityUnavailableResponse();
    }
    return dbErrorResponse("views POST", error);
  }
}

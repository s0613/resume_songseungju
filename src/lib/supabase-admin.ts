// 서버 전용 Supabase 클라이언트 (service_role 키 사용)
// 절대 클라이언트 컴포넌트에서 import하지 말 것 — "server-only"가 빌드 시 이를 강제한다.
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

/**
 * env(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않은 경우 null을 반환한다.
 * 호출부(Route Handler)는 null일 때 503 { error: "not_configured" }로 graceful degrade해야 한다.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

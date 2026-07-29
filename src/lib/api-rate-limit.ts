import "server-only";

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getClientIp, safeErrorMetadata } from "@/lib/api-security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const KEY_DOMAIN = "songseungju.dev/api-rate-limit/key/v1";
const MAX_MEMORY_BUCKETS = 10_000;
const developmentKey = randomBytes(32);

interface MemoryEntry {
  count: number;
  windowStartedAt: number;
  expiresAt: number;
}

const memoryEntries = new Map<string, MemoryEntry>();
const lastStoreFailureLog = new Map<string, number>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  storage: "supabase" | "memory";
}

interface ConsumeRateLimitOptions {
  request: Request;
  scope: string;
  limit: number;
  windowSeconds: number;
  /**
   * slug처럼 공개적이고 낮은 cardinality의 라우트 구분자만 전달한다.
   * 저장소에는 IP와 함께 HMAC 처리된 값만 남는다.
   */
  subject?: string;
}

export class RateLimitUnavailableError extends Error {
  constructor() {
    super("rate_limit_unavailable");
    this.name = "RateLimitUnavailableError";
  }
}

function logStoreFailure(scope: string, error: unknown): void {
  const now = Date.now();
  const lastLoggedAt = lastStoreFailureLog.get(scope) ?? 0;
  if (now - lastLoggedAt < 60_000) return;
  lastStoreFailureLog.set(scope, now);
  console.error("[api-rate-limit] persistent store failure", {
    scope,
    ...safeErrorMetadata(error),
  });
}

function rateLimitKey(): Buffer | string {
  const configured = process.env.RATE_LIMIT_HASH_KEY?.trim();
  if (configured && Buffer.byteLength(configured, "utf8") >= 32) {
    return configured;
  }
  if (process.env.NODE_ENV === "development") return developmentKey;
  throw new RateLimitUnavailableError();
}

function apiValueMac(domain: string, value: string): Buffer {
  if (
    !/^[a-z0-9:/._-]{1,120}$/u.test(domain) ||
    value.length > 1_024 ||
    /[\r\n]/u.test(value)
  ) {
    throw new TypeError("Invalid API HMAC input");
  }
  return createHmac("sha256", rateLimitKey())
    .update(domain, "utf8")
    .update("\0", "utf8")
    .update(value, "utf8")
    .digest();
}

/** 공개 cursor처럼 변조 방지가 필요한 짧은 값에 domain-separated MAC을 붙인다. */
export function signApiValue(domain: string, value: string): string {
  return apiValueMac(domain, value).toString("base64url");
}

export function verifyApiValue(
  domain: string,
  value: string,
  suppliedMac: string,
): boolean {
  if (!/^[A-Za-z0-9_-]{43}$/u.test(suppliedMac)) return false;
  const expected = apiValueMac(domain, value);
  const supplied = Buffer.from(suppliedMac, "base64url");
  return (
    supplied.length === expected.length &&
    timingSafeEqual(supplied, expected)
  );
}

function validateOptions(
  scope: string,
  limit: number,
  windowSeconds: number,
  subject: string,
): void {
  if (
    !/^[a-z0-9:_-]{1,80}$/u.test(scope) ||
    !Number.isSafeInteger(limit) ||
    limit < 1 ||
    limit > 100_000 ||
    !Number.isSafeInteger(windowSeconds) ||
    windowSeconds < 1 ||
    windowSeconds > 7 * 24 * 60 * 60 ||
    subject.length > 200 ||
    /[\r\n]/u.test(subject)
  ) {
    throw new TypeError("Invalid rate-limit configuration");
  }
}

function bucketHash(request: Request, scope: string, subject: string): string {
  return createHmac("sha256", rateLimitKey())
    .update(KEY_DOMAIN, "utf8")
    .update("\0", "utf8")
    .update(scope, "utf8")
    .update("\0", "utf8")
    .update(getClientIp(request), "utf8")
    .update("\0", "utf8")
    .update(subject, "utf8")
    .digest("hex");
}

function consumeMemory(
  scope: string,
  keyHash: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1_000;
  const windowStartedAt = Math.floor(now / windowMs) * windowMs;
  const mapKey = `${scope}:${keyHash}`;

  for (const [key, entry] of memoryEntries) {
    if (entry.expiresAt <= now) memoryEntries.delete(key);
  }

  const existing = memoryEntries.get(mapKey);
  if (!existing || existing.windowStartedAt !== windowStartedAt) {
    if (!existing && memoryEntries.size >= MAX_MEMORY_BUCKETS) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((windowStartedAt + windowMs - now) / 1_000),
        ),
        storage: "memory",
      };
    }
    memoryEntries.set(mapKey, {
      count: 1,
      windowStartedAt,
      expiresAt: windowStartedAt + windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((windowStartedAt + windowMs - now) / 1_000),
      ),
      storage: "memory",
    };
  }

  existing.count += 1;
  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((windowStartedAt + windowMs - now) / 1_000),
    ),
    storage: "memory",
  };
}

async function consumeSupabase(
  supabase: SupabaseClient,
  scope: string,
  keyHash: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const { data, error } = await supabase.rpc("consume_api_rate_limit", {
    p_scope: scope,
    p_key_hash: keyHash,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  const allowed =
    row && typeof row === "object" && "allowed" in row
      ? (row as { allowed?: unknown }).allowed
      : undefined;
  const remaining = Number(
    row && typeof row === "object" && "remaining" in row
      ? (row as { remaining?: unknown }).remaining
      : Number.NaN,
  );
  const retryAfterSeconds = Number(
    row && typeof row === "object" && "retry_after_seconds" in row
      ? (row as { retry_after_seconds?: unknown }).retry_after_seconds
      : Number.NaN,
  );
  if (
    typeof allowed !== "boolean" ||
    !Number.isSafeInteger(remaining) ||
    remaining < 0 ||
    !Number.isSafeInteger(retryAfterSeconds) ||
    retryAfterSeconds < 1
  ) {
    throw new TypeError("Invalid rate-limit response");
  }

  return {
    allowed,
    remaining,
    retryAfterSeconds,
    storage: "supabase",
  };
}

/**
 * 운영에서는 Supabase의 원자적 RPC만 사용하며 장애/미설정 시 fail closed한다.
 * 로컬 development에서만 프로세스 메모리 fallback을 허용한다.
 */
export async function consumeRateLimit({
  request,
  scope,
  limit,
  windowSeconds,
  subject = "",
}: ConsumeRateLimitOptions): Promise<RateLimitResult> {
  validateOptions(scope, limit, windowSeconds, subject);
  const keyHash = bucketHash(request, scope, subject);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      return await consumeSupabase(
        supabase,
        scope,
        keyHash,
        limit,
        windowSeconds,
      );
    } catch (error) {
      logStoreFailure(scope, error);
    }
  }

  if (process.env.NODE_ENV === "development") {
    return consumeMemory(scope, keyHash, limit, windowSeconds);
  }
  throw new RateLimitUnavailableError();
}

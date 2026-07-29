import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { safeErrorMetadata } from "@/lib/api-security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type InquiryDeliveryClaimStatus =
  | "claimed"
  | "replay"
  | "review_token_already_used"
  | "idempotency_conflict"
  | "in_progress";

export interface InquiryDeliveryClaim {
  status: InquiryDeliveryClaimStatus;
  storage: "supabase" | "memory";
}

interface DeliveryIdentity {
  reviewFingerprint: string;
  requestId: string;
  requestFingerprint: string;
}

interface MemoryDeliveryEntry extends DeliveryIdentity {
  state: "pending" | "sent";
  expiresAt: number;
}

const memoryDeliveries = new Map<string, MemoryDeliveryEntry>();
const SHA256_FORMAT = /^[a-f0-9]{64}$/u;
const MAX_MEMORY_DELIVERIES = 1_000;

export class InquiryIdempotencyUnavailableError extends Error {
  constructor() {
    super("inquiry_idempotency_unavailable");
    this.name = "InquiryIdempotencyUnavailableError";
  }
}

function validateIdentity(identity: DeliveryIdentity): void {
  if (
    !SHA256_FORMAT.test(identity.reviewFingerprint) ||
    !SHA256_FORMAT.test(identity.requestFingerprint) ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu.test(
      identity.requestId,
    )
  ) {
    throw new TypeError("Invalid inquiry delivery identity");
  }
}

function validateTtl(ttlSeconds: number, minimum: number): void {
  if (
    !Number.isSafeInteger(ttlSeconds) ||
    ttlSeconds < minimum ||
    ttlSeconds > 7 * 24 * 60 * 60
  ) {
    throw new TypeError("Invalid inquiry delivery TTL");
  }
}

function claimMemory(
  identity: DeliveryIdentity,
  pendingTtlSeconds: number,
): InquiryDeliveryClaim {
  const now = Date.now();
  for (const [key, value] of memoryDeliveries) {
    if (value.expiresAt <= now) memoryDeliveries.delete(key);
  }

  const existing = memoryDeliveries.get(identity.reviewFingerprint);
  if (!existing) {
    if (memoryDeliveries.size >= MAX_MEMORY_DELIVERIES) {
      throw new InquiryIdempotencyUnavailableError();
    }
    memoryDeliveries.set(identity.reviewFingerprint, {
      ...identity,
      state: "pending",
      expiresAt: now + pendingTtlSeconds * 1_000,
    });
    return { status: "claimed", storage: "memory" };
  }
  if (existing.requestId !== identity.requestId) {
    return { status: "review_token_already_used", storage: "memory" };
  }
  if (existing.requestFingerprint !== identity.requestFingerprint) {
    return { status: "idempotency_conflict", storage: "memory" };
  }
  return {
    status: existing.state === "sent" ? "replay" : "in_progress",
    storage: "memory",
  };
}

async function claimSupabase(
  supabase: SupabaseClient,
  identity: DeliveryIdentity,
  pendingTtlSeconds: number,
): Promise<InquiryDeliveryClaim> {
  const { data, error } = await supabase.rpc("claim_inquiry_delivery", {
    p_review_fingerprint: identity.reviewFingerprint,
    p_request_id: identity.requestId,
    p_request_fingerprint: identity.requestFingerprint,
    p_pending_ttl_seconds: pendingTtlSeconds,
  });
  if (error) throw error;
  if (
    data !== "claimed" &&
    data !== "replay" &&
    data !== "review_token_already_used" &&
    data !== "idempotency_conflict" &&
    data !== "in_progress"
  ) {
    throw new TypeError("Invalid inquiry claim response");
  }
  return { status: data, storage: "supabase" };
}

export async function claimInquiryDelivery(
  identity: DeliveryIdentity,
  pendingTtlSeconds: number,
): Promise<InquiryDeliveryClaim> {
  validateIdentity(identity);
  validateTtl(pendingTtlSeconds, 30);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      return await claimSupabase(supabase, identity, pendingTtlSeconds);
    } catch (error) {
      console.error("[inquiry-idempotency] claim store failure", {
        ...safeErrorMetadata(error),
      });
    }
  }

  if (process.env.NODE_ENV === "development") {
    return claimMemory(identity, pendingTtlSeconds);
  }
  throw new InquiryIdempotencyUnavailableError();
}

export async function markInquiryDeliverySent(
  claim: InquiryDeliveryClaim,
  identity: DeliveryIdentity,
  sentTtlSeconds: number,
): Promise<void> {
  if (claim.status !== "claimed") {
    throw new TypeError("Inquiry delivery was not claimed");
  }
  validateIdentity(identity);
  validateTtl(sentTtlSeconds, 60);

  if (claim.storage === "memory") {
    const existing = memoryDeliveries.get(identity.reviewFingerprint);
    if (
      !existing ||
      existing.requestId !== identity.requestId ||
      existing.requestFingerprint !== identity.requestFingerprint
    ) {
      throw new InquiryIdempotencyUnavailableError();
    }
    existing.state = "sent";
    existing.expiresAt = Date.now() + sentTtlSeconds * 1_000;
    return;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) throw new InquiryIdempotencyUnavailableError();
  try {
    const { data, error } = await supabase.rpc(
      "mark_inquiry_delivery_sent",
      {
        p_review_fingerprint: identity.reviewFingerprint,
        p_request_id: identity.requestId,
        p_request_fingerprint: identity.requestFingerprint,
        p_sent_ttl_seconds: sentTtlSeconds,
      },
    );
    if (error) throw error;
    if (data !== true) throw new TypeError("Inquiry delivery claim was lost");
  } catch (error) {
    console.error("[inquiry-idempotency] mark store failure", {
      ...safeErrorMetadata(error),
    });
    throw new InquiryIdempotencyUnavailableError();
  }
}

export async function releaseInquiryDelivery(
  claim: InquiryDeliveryClaim,
  identity: DeliveryIdentity,
): Promise<void> {
  if (claim.status !== "claimed") return;
  validateIdentity(identity);

  if (claim.storage === "memory") {
    const existing = memoryDeliveries.get(identity.reviewFingerprint);
    if (
      existing?.state === "pending" &&
      existing.requestId === identity.requestId &&
      existing.requestFingerprint === identity.requestFingerprint
    ) {
      memoryDeliveries.delete(identity.reviewFingerprint);
    }
    return;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  try {
    const { error } = await supabase.rpc("release_inquiry_delivery", {
      p_review_fingerprint: identity.reviewFingerprint,
      p_request_id: identity.requestId,
      p_request_fingerprint: identity.requestFingerprint,
    });
    if (error) throw error;
  } catch (error) {
    // 발송 실패 후 claim은 TTL이 지나면 자동 재시도 가능해진다.
    console.error("[inquiry-idempotency] release store failure", {
      ...safeErrorMetadata(error),
    });
  }
}

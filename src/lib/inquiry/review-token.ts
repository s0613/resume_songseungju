import "server-only";

import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import {
  normalizeInquiryDraft,
  type InquiryDraft,
  type InquiryMessage,
} from "@/lib/inquiry/schema";

const TOKEN_VERSION = "v1";
const KEY_DERIVATION_DOMAIN =
  "songseungju.dev/inquiry-review-token/key/v1";
const TOKEN_MAC_DOMAIN =
  "songseungju.dev/inquiry-review-token/mac/v1";
const REVIEW_FINGERPRINT_DOMAIN =
  "songseungju.dev/inquiry-review-token/content-fingerprint/v1";
const DELIVERY_FINGERPRINT_DOMAIN =
  "songseungju.dev/inquiry-delivery/request-fingerprint/v1";
const TOKEN_TTL_MS = 30 * 60 * 1_000;
const MAX_FUTURE_SKEW_MS = 60 * 1_000;
const HEX_SHA256_PATTERN = /^[a-f0-9]{64}$/u;
const BASE64URL_SHA256_PATTERN = /^[A-Za-z0-9_-]{43}$/u;
const developmentReviewSecret = randomBytes(32);

export class InquiryReviewTokenConfigurationError extends Error {
  constructor() {
    super("review_token_not_configured");
    this.name = "InquiryReviewTokenConfigurationError";
  }
}

function reviewTokenKey(): Buffer {
  const configured = process.env.INQUIRY_REVIEW_SECRET?.trim();
  const secret =
    configured && Buffer.byteLength(configured, "utf8") >= 32
      ? configured
      : process.env.NODE_ENV === "development"
        ? developmentReviewSecret
        : null;
  if (!secret) throw new InquiryReviewTokenConfigurationError();

  return createHash("sha256")
    .update(KEY_DERIVATION_DOMAIN, "utf8")
    .update("\0", "utf8")
    .update(secret)
    .digest();
}

function canonicalInquiryState(
  draft: InquiryDraft,
  messages: InquiryMessage[],
): string {
  const normalizedDraft = normalizeInquiryDraft(draft);
  return JSON.stringify({
    draft: {
      category: normalizedDraft.category,
      senderName: normalizedDraft.senderName,
      replyEmail: normalizedDraft.replyEmail,
      organization: normalizedDraft.organization,
      request: normalizedDraft.request,
      background: normalizedDraft.background,
      desiredOutcome: normalizedDraft.desiredOutcome,
      timeline: normalizedDraft.timeline,
      budget: normalizedDraft.budget,
      constraints: normalizedDraft.constraints,
    },
    messages: messages.map(({ role, content }) => ({ role, content })),
  });
}

export function inquiryReviewFingerprint(
  draft: InquiryDraft,
  messages: InquiryMessage[],
): string {
  return createHmac("sha256", reviewTokenKey())
    .update(REVIEW_FINGERPRINT_DOMAIN, "utf8")
    .update("\0", "utf8")
    .update(canonicalInquiryState(draft, messages), "utf8")
    .digest("hex");
}

/** DB에는 문의 원문의 평문 SHA 대신 비밀키 기반 지문만 저장한다. */
export function inquiryDeliveryRequestFingerprint(payload: unknown): string {
  const serialized = JSON.stringify(payload);
  if (serialized === undefined) {
    throw new TypeError("Inquiry delivery payload is not serializable");
  }
  return createHmac("sha256", reviewTokenKey())
    .update(DELIVERY_FINGERPRINT_DOMAIN, "utf8")
    .update("\0", "utf8")
    .update(serialized, "utf8")
    .digest("hex");
}

function tokenPayload(issuedAt: number, fingerprint: string): string {
  return `${TOKEN_VERSION}.${issuedAt}.${fingerprint}`;
}

function tokenMac(payload: string, key: Buffer): string {
  return createHmac("sha256", key)
    .update(TOKEN_MAC_DOMAIN, "utf8")
    .update("\0", "utf8")
    .update(payload, "utf8")
    .digest("base64url");
}

export function createInquiryReviewToken(
  draft: InquiryDraft,
  messages: InquiryMessage[],
  now = Date.now(),
): string {
  const fingerprint = inquiryReviewFingerprint(draft, messages);
  const payload = tokenPayload(now, fingerprint);
  return `${payload}.${tokenMac(payload, reviewTokenKey())}`;
}

export function verifyInquiryReviewToken(
  token: string,
  draft: InquiryDraft,
  messages: InquiryMessage[],
  now = Date.now(),
): boolean {
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [version, issuedAtText, suppliedFingerprint, suppliedMac] = parts;
  if (
    version !== TOKEN_VERSION ||
    !/^\d{13}$/u.test(issuedAtText) ||
    !HEX_SHA256_PATTERN.test(suppliedFingerprint) ||
    !BASE64URL_SHA256_PATTERN.test(suppliedMac)
  ) {
    return false;
  }

  const issuedAt = Number(issuedAtText);
  if (
    !Number.isSafeInteger(issuedAt) ||
    issuedAt > now + MAX_FUTURE_SKEW_MS ||
    now - issuedAt > TOKEN_TTL_MS
  ) {
    return false;
  }

  const expectedFingerprint = inquiryReviewFingerprint(draft, messages);
  const suppliedFingerprintBytes = Buffer.from(suppliedFingerprint, "hex");
  const expectedFingerprintBytes = Buffer.from(expectedFingerprint, "hex");
  if (
    suppliedFingerprintBytes.length !== expectedFingerprintBytes.length ||
    !timingSafeEqual(suppliedFingerprintBytes, expectedFingerprintBytes)
  ) {
    return false;
  }

  const key = reviewTokenKey();
  const payload = tokenPayload(issuedAt, suppliedFingerprint);
  const expectedMac = Buffer.from(tokenMac(payload, key), "base64url");
  const suppliedMacBytes = Buffer.from(suppliedMac, "base64url");
  return (
    suppliedMacBytes.length === expectedMac.length &&
    timingSafeEqual(suppliedMacBytes, expectedMac)
  );
}

import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import {
  assertConversationLength,
  assertJsonContentType,
  assertTrustedOrigin,
  assertTrustedPageUrl,
  getClientIp,
  InquiryHttpError,
  readJsonBody,
} from "@/lib/inquiry/http";
import {
  InquirySmtpConfigurationError,
  sendInquiryEmail,
} from "@/lib/inquiry/mailer";
import {
  computeReadyForReview,
  sendInquiryRequestSchema,
  type SendInquiryRequest,
} from "@/lib/inquiry/schema";
import {
  inquiryReviewFingerprint,
  verifyInquiryReviewToken,
} from "@/lib/inquiry/review-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_BODY_BYTES = 64 * 1024;
const SEND_RATE_LIMIT = 3;
const SEND_RATE_WINDOW_MS = 60 * 60 * 1_000;
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1_000;
const PENDING_TTL_MS = 5 * 60 * 1_000;

interface SendRateEntry {
  count: number;
  windowStartedAt: number;
}

interface IdempotencyEntry {
  requestId: string;
  fingerprint: string;
  state: "pending" | "sent";
  createdAt: number;
}

const sendRateEntries = new Map<string, SendRateEntry>();
const idempotencyEntries = new Map<string, IdempotencyEntry>();

function pruneState(now: number): void {
  for (const [ip, entry] of sendRateEntries) {
    if (now - entry.windowStartedAt >= SEND_RATE_WINDOW_MS) {
      sendRateEntries.delete(ip);
    }
  }
  for (const [key, entry] of idempotencyEntries) {
    const ttl = entry.state === "pending" ? PENDING_TTL_MS : IDEMPOTENCY_TTL_MS;
    if (now - entry.createdAt >= ttl) idempotencyEntries.delete(key);
  }
}

function consumeSendRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  pruneState(now);
  const existing = sendRateEntries.get(ip);
  if (!existing || now - existing.windowStartedAt >= SEND_RATE_WINDOW_MS) {
    sendRateEntries.set(ip, { count: 1, windowStartedAt: now });
    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(SEND_RATE_WINDOW_MS / 1_000),
    };
  }
  if (existing.count >= SEND_RATE_LIMIT) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil(
          (SEND_RATE_WINDOW_MS - (now - existing.windowStartedAt)) / 1_000,
        ),
      ),
    };
  }
  existing.count += 1;
  return {
    allowed: true,
    retryAfterSeconds: Math.max(
      1,
      Math.ceil(
        (SEND_RATE_WINDOW_MS - (now - existing.windowStartedAt)) / 1_000,
      ),
    ),
  };
}

function requestFingerprint(payload: SendInquiryRequest): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function safeDeliveryErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return undefined;
  }
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" && /^[A-Z0-9_]{1,40}$/u.test(code)
    ? code
    : undefined;
}

function jsonError(
  error: string,
  status: number,
  headers?: Record<string, string>,
): NextResponse {
  return NextResponse.json(
    { error },
    {
      status,
      headers: { "Cache-Control": "no-store", ...headers },
    },
  );
}

export async function POST(request: Request) {
  let pendingRequest:
    | { key: string; requestId: string; fingerprint: string }
    | undefined;

  try {
    assertTrustedOrigin(request);
    assertJsonContentType(request);
    const payload = await readJsonBody(request, MAX_BODY_BYTES);
    const parsed = sendInquiryRequestSchema.safeParse(payload);
    if (!parsed.success) return jsonError("invalid_request", 400);

    const submission = parsed.data;
    assertConversationLength(submission.messages);
    assertTrustedPageUrl(request, submission.pageUrl);
    if (!computeReadyForReview(submission.draft)) {
      return jsonError("inquiry_not_ready", 400);
    }

    // 숨김 필드가 채워진 요청은 발송하지 않는다. SMTP 성공 전에는 2xx를 주지 않는다.
    if (submission.website.trim().length > 0) {
      return jsonError("invalid_request", 400);
    }
    if (
      !verifyInquiryReviewToken(
        submission.reviewToken,
        submission.draft,
        submission.messages,
      )
    ) {
      return jsonError("invalid_review_token", 400);
    }

    const fingerprint = requestFingerprint(submission);
    // 같은 검토 내용을 다시 collect해 새 토큰을 받아도 한 건으로 취급한다.
    const idempotencyKey = inquiryReviewFingerprint(
      submission.draft,
      submission.messages,
    );
    pruneState(Date.now());
    const existing = idempotencyEntries.get(idempotencyKey);
    if (existing) {
      if (existing.requestId !== submission.requestId) {
        return jsonError("review_token_already_used", 409);
      }
      if (existing.fingerprint !== fingerprint) {
        return jsonError("idempotency_conflict", 409);
      }
      if (existing.state === "sent") {
        return NextResponse.json(
          {
            ok: true,
            requestId: submission.requestId,
            replayed: true,
          },
          { status: 200, headers: { "Cache-Control": "no-store" } },
        );
      }
      return jsonError("request_in_progress", 409, { "Retry-After": "5" });
    }

    const rate = consumeSendRateLimit(getClientIp(request));
    if (!rate.allowed) {
      return jsonError("rate_limited", 429, {
        "Retry-After": String(rate.retryAfterSeconds),
      });
    }

    idempotencyEntries.set(idempotencyKey, {
      requestId: submission.requestId,
      fingerprint,
      state: "pending",
      createdAt: Date.now(),
    });
    pendingRequest = {
      key: idempotencyKey,
      requestId: submission.requestId,
      fingerprint,
    };

    try {
      await sendInquiryEmail(submission);
    } catch (error) {
      const current = idempotencyEntries.get(idempotencyKey);
      if (
        current?.state === "pending" &&
        current.requestId === submission.requestId &&
        current.fingerprint === fingerprint
      ) {
        idempotencyEntries.delete(idempotencyKey);
      }
      pendingRequest = undefined;

      if (error instanceof InquirySmtpConfigurationError) {
        console.error(
          "[agent:inquiry:send] SMTP is not configured for this runtime",
        );
        return jsonError("delivery_unavailable", 503);
      }

      console.error("[agent:inquiry:send] SMTP delivery failed", {
        errorName: error instanceof Error ? error.name : "UnknownError",
        errorCode: safeDeliveryErrorCode(error),
      });
      return jsonError("delivery_failed", 502);
    }

    idempotencyEntries.set(idempotencyKey, {
      requestId: submission.requestId,
      fingerprint,
      state: "sent",
      createdAt: Date.now(),
    });
    pendingRequest = undefined;

    return NextResponse.json(
      { ok: true, requestId: submission.requestId, replayed: false },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (pendingRequest) {
      const current = idempotencyEntries.get(pendingRequest.key);
      if (
        current?.state === "pending" &&
        current.requestId === pendingRequest.requestId &&
        current.fingerprint === pendingRequest.fingerprint
      ) {
        idempotencyEntries.delete(pendingRequest.key);
      }
    }
    if (error instanceof InquiryHttpError) {
      return jsonError(error.code, error.status);
    }
    console.error("[agent:inquiry:send] unexpected failure", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return jsonError("internal_error", 500);
  }
}

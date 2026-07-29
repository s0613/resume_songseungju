import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  RateLimitUnavailableError,
} from "@/lib/api-rate-limit";
import { safeErrorMetadata } from "@/lib/api-security";
import {
  assertConversationLength,
  assertJsonContentType,
  assertTrustedOrigin,
  assertTrustedPageUrl,
  InquiryHttpError,
  readJsonBody,
} from "@/lib/inquiry/http";
import {
  claimInquiryDelivery,
  type InquiryDeliveryClaim,
  InquiryIdempotencyUnavailableError,
  markInquiryDeliverySent,
  releaseInquiryDelivery,
} from "@/lib/inquiry/idempotency";
import {
  InquirySmtpConfigurationError,
  isDefinitiveInquiryDeliveryFailure,
  sendInquiryEmail,
} from "@/lib/inquiry/mailer";
import {
  computeReadyForReview,
  sendInquiryRequestSchema,
} from "@/lib/inquiry/schema";
import {
  inquiryDeliveryRequestFingerprint,
  inquiryReviewFingerprint,
  InquiryReviewTokenConfigurationError,
  verifyInquiryReviewToken,
} from "@/lib/inquiry/review-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_BODY_BYTES = 64 * 1024;
const SEND_RATE_LIMIT = 3;
const SEND_RATE_WINDOW_SECONDS = 60 * 60;
const IDEMPOTENCY_TTL_SECONDS = 24 * 60 * 60;
// SMTP가 수락한 직후 상태 기록에 실패하면 발송 여부가 불확실하다. 이 경우
// sent 보존 기간과 동일하게 잠가 자동 재시도로 인한 중복 메일을 막는다.
const PENDING_TTL_SECONDS = IDEMPOTENCY_TTL_SECONDS;

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
    | {
        claim: InquiryDeliveryClaim;
        identity: {
          reviewFingerprint: string;
          requestId: string;
          requestFingerprint: string;
        };
      }
    | undefined;
  let deliveryAccepted = false;

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

    const requestHash = inquiryDeliveryRequestFingerprint(submission);
    // 같은 검토 내용을 다시 collect해 새 토큰을 받아도 한 건으로 취급한다.
    const identity = {
      reviewFingerprint: inquiryReviewFingerprint(
        submission.draft,
        submission.messages,
      ),
      requestId: submission.requestId,
      requestFingerprint: requestHash,
    };

    const rate = await consumeRateLimit({
      request,
      scope: "inquiry_send",
      limit: SEND_RATE_LIMIT,
      windowSeconds: SEND_RATE_WINDOW_SECONDS,
    });
    if (!rate.allowed) {
      return jsonError("rate_limited", 429, {
        "Retry-After": String(rate.retryAfterSeconds),
      });
    }

    const claim = await claimInquiryDelivery(identity, PENDING_TTL_SECONDS);
    if (claim.status === "review_token_already_used") {
      return jsonError("review_token_already_used", 409);
    }
    if (claim.status === "idempotency_conflict") {
      return jsonError("idempotency_conflict", 409);
    }
    if (claim.status === "replay") {
      return NextResponse.json(
        {
          ok: true,
          requestId: submission.requestId,
          replayed: true,
        },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }
    if (claim.status === "in_progress") {
      return jsonError("request_in_progress", 409, {
        "Retry-After": String(PENDING_TTL_SECONDS),
      });
    }
    pendingRequest = { claim, identity };

    try {
      await sendInquiryEmail(submission);
    } catch (error) {
      const definitivelyRejected =
        isDefinitiveInquiryDeliveryFailure(error);
      if (definitivelyRejected) {
        await releaseInquiryDelivery(claim, identity);
      }
      // 불확실한 SMTP 오류는 DATA 수락 뒤 최종 응답만 유실된 경우일 수 있다.
      // claim을 24시간 유지해 자동 재시도로 인한 중복 메일을 막는다.
      pendingRequest = undefined;

      if (error instanceof InquirySmtpConfigurationError) {
        console.error(
          "[agent:inquiry:send] SMTP is not configured for this runtime",
        );
        return jsonError("delivery_unavailable", 503);
      }

      console.error("[agent:inquiry:send] SMTP delivery failed", {
        ...safeErrorMetadata(error),
        errorCode: safeDeliveryErrorCode(error),
        outcome:
          definitivelyRejected ? "rejected" : "unknown",
      });
      if (!definitivelyRejected) {
        return jsonError("delivery_state_unknown", 503, {
          "Retry-After": String(PENDING_TTL_SECONDS),
        });
      }
      return jsonError("delivery_failed", 502);
    }

    deliveryAccepted = true;
    await markInquiryDeliverySent(
      claim,
      identity,
      IDEMPOTENCY_TTL_SECONDS,
    );
    pendingRequest = undefined;

    return NextResponse.json(
      { ok: true, requestId: submission.requestId, replayed: false },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (pendingRequest && !deliveryAccepted) {
      await releaseInquiryDelivery(
        pendingRequest.claim,
        pendingRequest.identity,
      );
    }
    if (error instanceof InquiryHttpError) {
      return jsonError(error.code, error.status);
    }
    if (
      error instanceof RateLimitUnavailableError ||
      error instanceof InquiryIdempotencyUnavailableError ||
      error instanceof InquiryReviewTokenConfigurationError
    ) {
      return jsonError(
        deliveryAccepted
          ? "delivery_state_unavailable"
          : "security_service_unavailable",
        503,
      );
    }
    console.error("[agent:inquiry:send] unexpected failure", {
      ...safeErrorMetadata(error),
    });
    return jsonError("internal_error", 500);
  }
}

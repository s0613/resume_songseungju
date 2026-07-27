import { z } from "zod";

export const inquiryCategories = [
  "project",
  "collaboration",
  "hiring",
  "advisory",
  "other",
] as const;

export const inquiryCategorySchema = z.enum(inquiryCategories);
export type InquiryCategory = z.infer<typeof inquiryCategorySchema>;

export const categoryLabels: Record<InquiryCategory, string> = {
  project: "프로젝트 의뢰",
  collaboration: "협업 제안",
  hiring: "채용 제안",
  advisory: "자문 요청",
  other: "기타 문의",
};

const nullableText = (max: number, description: string) =>
  z.string().max(max).nullable().describe(description);

/**
 * 문의 수집 중 사용하는 초안 계약입니다.
 *
 * 빈 값은 모두 null이며, 수집 단계에서는 이메일이나 최소 글자 수가 아직
 * 완성되지 않았을 수 있으므로 최종 제출 규칙을 강제하지 않습니다.
 */
export const inquiryDraftSchema = z
  .object({
    category: inquiryCategorySchema
      .nullable()
      .describe("사용자가 명시한 문의 유형. 알 수 없으면 null"),
    senderName: nullableText(80, "문의자 이름. 알 수 없으면 null"),
    replyEmail: nullableText(254, "회신받을 이메일. 알 수 없으면 null"),
    organization: nullableText(120, "회사 또는 조직. 알 수 없으면 null"),
    request: nullableText(2_000, "사용자의 핵심 요청 원문. 알 수 없으면 null"),
    background: nullableText(2_000, "요청 배경. 알 수 없으면 null"),
    desiredOutcome: nullableText(
      1_000,
      "사용자가 원하는 결과. 알 수 없으면 null",
    ),
    timeline: nullableText(120, "희망 일정 또는 답변 시기. 알 수 없으면 null"),
    budget: nullableText(120, "예산. 알 수 없으면 null"),
    constraints: nullableText(1_500, "제약 조건. 알 수 없으면 null"),
  })
  .strict();

export type InquiryDraft = z.infer<typeof inquiryDraftSchema>;

export const emptyInquiryDraft: InquiryDraft = {
  category: null,
  senderName: null,
  replyEmail: null,
  organization: null,
  request: null,
  background: null,
  desiredOutcome: null,
  timeline: null,
  budget: null,
  constraints: null,
};

export const inquiryMessageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z
      .string()
      .max(2_000)
      .refine((value) => value.trim().length > 0, "메시지는 비어 있을 수 없습니다."),
  })
  .strict();

export type InquiryMessage = z.infer<typeof inquiryMessageSchema>;

export const inquiryConversationSchema = z
  .array(inquiryMessageSchema)
  .min(1)
  .max(24);

export const collectInquiryRequestSchema = z
  .object({
    messages: inquiryConversationSchema,
  })
  .strict();

export const collectInquiryResponseSchema = z
  .object({
    draft: inquiryDraftSchema,
    assistantMessage: z.string().min(1).max(500),
    quickReplies: z.array(z.string().min(1).max(80)).max(5),
    readyForReview: z.boolean(),
    reviewToken: z.string().max(200).nullable(),
  })
  .strict();

export const clearableInquiryFields = [
  "senderName",
  "replyEmail",
  "organization",
  "request",
  "background",
  "desiredOutcome",
  "timeline",
  "budget",
  "constraints",
] as const;

export const clearableInquiryFieldSchema = z.enum(clearableInquiryFields);
export type ClearableInquiryField = z.infer<
  typeof clearableInquiryFieldSchema
>;

export const inquiryExtractionSchema = z
  .object({
    draft: inquiryDraftSchema.describe(
      "사용자가 대화에서 직접 밝힌 문의 정보만 담은 초안",
    ),
    clearedFields: z
      .array(clearableInquiryFieldSchema)
      .max(clearableInquiryFields.length)
      .describe(
        "사용자가 명시적으로 삭제, 제외 또는 취소해 달라고 정정한 필드",
      ),
  })
  .strict();

const validReplyEmailSchema = z
  .string()
  .trim()
  .min(1)
  .max(254)
  .email()
  .refine((value) => !/[\r\n]/.test(value), "이메일에 개행을 포함할 수 없습니다.");

export function isValidReplyEmail(value: string | null): value is string {
  return Boolean(value && validReplyEmailSchema.safeParse(value).success);
}

export function isValidSenderName(value: string | null): value is string {
  return Boolean(value?.trim() && !/[\r\n]/.test(value));
}

function normalized(value: string | null): string | null {
  if (value === null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeInquiryDraft(draft: InquiryDraft): InquiryDraft {
  return {
    category: draft.category,
    senderName: normalized(draft.senderName),
    replyEmail: normalized(draft.replyEmail),
    organization: normalized(draft.organization),
    request: normalized(draft.request),
    background: normalized(draft.background),
    desiredOutcome: normalized(draft.desiredOutcome),
    timeline: normalized(draft.timeline),
    budget: normalized(draft.budget),
    constraints: normalized(draft.constraints),
  };
}

export type RequiredInquiryField =
  | "category"
  | "senderName"
  | "replyEmail"
  | "request"
  | "desiredOutcome"
  | "timeline";

export function getNextMissingRequiredField(
  rawDraft: InquiryDraft,
): RequiredInquiryField | null {
  const draft = normalizeInquiryDraft(rawDraft);
  if (!draft.category) return "category";
  if (!draft.request || draft.request.length < 10) return "request";
  if (!draft.desiredOutcome || draft.desiredOutcome.length < 5) {
    return "desiredOutcome";
  }
  if (!draft.timeline) return "timeline";
  if (!isValidSenderName(draft.senderName)) return "senderName";
  if (!isValidReplyEmail(draft.replyEmail)) {
    return "replyEmail";
  }
  return null;
}

export function computeReadyForReview(draft: InquiryDraft): boolean {
  return getNextMissingRequiredField(draft) === null;
}

export const submittedInquiryDraftSchema = inquiryDraftSchema.superRefine(
  (rawDraft, context) => {
    const draft = normalizeInquiryDraft(rawDraft);
    const nextMissing = getNextMissingRequiredField(draft);
    if (nextMissing) {
      context.addIssue({
        code: "custom",
        path: [nextMissing],
        message: "필수 문의 정보가 완성되지 않았습니다.",
      });
    }
    if (draft.senderName && !isValidSenderName(draft.senderName)) {
      context.addIssue({
        code: "custom",
        path: ["senderName"],
        message: "이름에 개행을 포함할 수 없습니다.",
      });
    }
    if (
      draft.replyEmail &&
      !isValidReplyEmail(draft.replyEmail)
    ) {
      context.addIssue({
        code: "custom",
        path: ["replyEmail"],
        message: "유효한 회신 이메일이 필요합니다.",
      });
    }
  },
);

export const inquiryPageUrlSchema = z
  .string()
  .trim()
  .max(500)
  .url()
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "HTTP(S) URL만 허용됩니다.");

export const inquiryReviewTokenSchema = z
  .string()
  .max(200)
  .regex(/^v1\.\d{13}\.[a-f0-9]{64}\.[A-Za-z0-9_-]{43}$/u);

export const sendInquiryRequestSchema = z
  .object({
    requestId: z.string().uuid(),
    confirmed: z.literal(true),
    privacyConsent: z.literal(true),
    reviewToken: inquiryReviewTokenSchema,
    website: z.string().max(200),
    draft: submittedInquiryDraftSchema,
    messages: inquiryConversationSchema,
    pageUrl: inquiryPageUrlSchema,
  })
  .strict();

export type CollectInquiryRequest = z.infer<
  typeof collectInquiryRequestSchema
>;
export type CollectInquiryResponse = z.infer<
  typeof collectInquiryResponseSchema
>;
export type SendInquiryRequest = z.infer<typeof sendInquiryRequestSchema>;

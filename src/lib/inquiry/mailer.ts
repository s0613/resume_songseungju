import "server-only";

import nodemailer from "nodemailer";
import {
  categoryLabels,
  normalizeInquiryDraft,
  type InquiryMessage,
  type SendInquiryRequest,
} from "@/lib/inquiry/schema";

const INQUIRY_RECIPIENT = "totaro@totaro.co.kr";

export class InquirySmtpConfigurationError extends Error {
  constructor() {
    super("smtp_not_configured");
    this.name = "InquirySmtpConfigurationError";
  }
}

export class InquiryRecipientRejectedError extends Error {
  constructor() {
    super("smtp_recipient_rejected");
    this.name = "InquiryRecipientRejectedError";
  }
}

/**
 * 서버가 메일을 수락하지 않았음이 확정된 오류만 true다. 연결 종료·timeout
 * 오류는 DATA 수락 뒤 최종 응답이 유실된 경우와 구분할 수 없으므로 false다.
 */
export function isDefinitiveInquiryDeliveryFailure(
  error: unknown,
): boolean {
  if (
    error instanceof InquirySmtpConfigurationError ||
    error instanceof InquiryRecipientRejectedError
  ) {
    return true;
  }
  if (!error || typeof error !== "object") return false;

  const smtpError = error as {
    code?: unknown;
    responseCode?: unknown;
  };
  if (
    typeof smtpError.responseCode === "number" &&
    Number.isInteger(smtpError.responseCode) &&
    smtpError.responseCode >= 400 &&
    smtpError.responseCode <= 599
  ) {
    return true;
  }
  return (
    typeof smtpError.code === "string" &&
    new Set(["EAUTH", "EDNS", "ETLS", "EENVELOPE", "EMESSAGE"]).has(
      smtpError.code,
    )
  );
}

function singleLine(value: string, max: number): string {
  const normalized = value.replace(/[\r\n]+/gu, " ").replace(/\s+/gu, " ").trim();
  return normalized.length > max
    ? `${normalized.slice(0, Math.max(0, max - 1))}…`
    : normalized;
}

function bodyText(value: string): string {
  return value
    .replace(/\r\n/gu, "\n")
    .replace(/\r/gu, "\n")
    .replace(/\u0000/gu, "");
}

function requiredSmtpCredentials(): { user: string; pass: string } {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (
    !user ||
    !pass ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(user) ||
    /[\r\n]/u.test(user) ||
    /[\r\n]/u.test(pass)
  ) {
    throw new InquirySmtpConfigurationError();
  }
  return { user, pass };
}

function formatConversation(messages: InquiryMessage[]): string {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages
    .map(
      (message, index) =>
        `[사용자 ${index + 1}]\n${bodyText(message.content).trim()}`,
    )
    .join("\n\n");
}

function formatInquiryEmail(
  payload: SendInquiryRequest,
  receivedAt: string,
): { subject: string; text: string } {
  const draft = normalizeInquiryDraft(payload.draft);
  const category = draft.category ? categoryLabels[draft.category] : "기타 문의";
  const senderName = singleLine(draft.senderName ?? "이름 미상", 80);
  const organization = singleLine(draft.organization ?? "", 120);
  const subject = `[songseungju.dev 문의][${category}] ${
    organization || senderName
  }`;

  const text = [
    "songseungju.dev 문의 챗봇에서 새 문의가 접수되었습니다.",
    "사용자가 아래 요약과 사용자 원문·페이지 주소를 검토하고 이메일 전송에 동의한 뒤 직접 전송했습니다.",
    "",
    "=== 접수 정보 ===",
    `요청 ID: ${payload.requestId}`,
    `접수 시각: ${receivedAt}`,
    `접속 페이지: ${payload.pageUrl}`,
    "",
    "=== 문의자 ===",
    `이름: ${bodyText(draft.senderName ?? "")}`,
    `회신 이메일: ${bodyText(draft.replyEmail ?? "")}`,
    `회사/조직: ${bodyText(draft.organization ?? "") || "미입력"}`,
    "",
    "=== 구조화된 문의 요약 ===",
    `문의 유형: ${category}`,
    `핵심 요청: ${bodyText(draft.request ?? "")}`,
    `요청 배경: ${bodyText(draft.background ?? "") || "미입력"}`,
    `원하는 결과: ${bodyText(draft.desiredOutcome ?? "")}`,
    `희망 일정: ${bodyText(draft.timeline ?? "")}`,
    `예산: ${bodyText(draft.budget ?? "") || "미입력"}`,
    `제약 조건: ${bodyText(draft.constraints ?? "") || "미입력"}`,
    "",
    "=== 사용자 원문 ===",
    formatConversation(payload.messages),
  ].join("\n");

  return { subject, text };
}

/**
 * SMTP 서버가 고정 수신자를 받아들인 뒤에만 resolve합니다.
 */
export async function sendInquiryEmail(
  payload: SendInquiryRequest,
): Promise<void> {
  const credentials = requiredSmtpCredentials();
  const draft = normalizeInquiryDraft(payload.draft);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 18_000,
    auth: credentials,
  });
  const { subject, text } = formatInquiryEmail(
    payload,
    new Date().toISOString(),
  );

  const result = await transporter.sendMail({
    from: {
      name: "songseungju.dev 문의",
      address: credentials.user,
    },
    to: INQUIRY_RECIPIENT,
    replyTo: draft.replyEmail!,
    subject,
    text,
  });

  if (
    (Array.isArray(result.rejected) && result.rejected.length > 0) ||
    (Array.isArray(result.accepted) && result.accepted.length === 0)
  ) {
    throw new InquiryRecipientRejectedError();
  }
}

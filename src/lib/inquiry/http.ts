import "server-only";

import type { InquiryMessage } from "@/lib/inquiry/schema";

const JSON_CONTENT_TYPE = "application/json";

export class InquiryHttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
    this.name = "InquiryHttpError";
  }
}

function parseOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function trustedRequestOrigins(request: Request): Set<string> {
  const origins = new Set<string>([
    "https://www.songseungju.dev",
    "https://songseungju.dev",
  ]);

  const configuredOrigin = parseOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredOrigin) origins.add(configuredOrigin);

  const vercelHost = process.env.VERCEL_URL;
  if (
    vercelHost &&
    /^[a-z0-9.-]+$/iu.test(vercelHost) &&
    !vercelHost.includes("..")
  ) {
    const vercelOrigin = parseOrigin(`https://${vercelHost}`);
    if (vercelOrigin) origins.add(vercelOrigin);
  }

  // 로컬 개발에서만 현재 요청의 origin을 허용한다. 운영에서는 Host 헤더를
  // 신뢰 목록으로 승격하지 않아 Host-header 기반 Origin 우회를 막는다.
  if (process.env.NODE_ENV !== "production") {
    const requestOrigin = parseOrigin(request.url);
    if (requestOrigin) origins.add(requestOrigin);
  }
  return origins;
}

export function assertTrustedOrigin(request: Request): void {
  const origin = parseOrigin(request.headers.get("origin"));
  if (!origin || !trustedRequestOrigins(request).has(origin)) {
    throw new InquiryHttpError(403, "invalid_origin");
  }
}

export function assertTrustedPageUrl(
  request: Request,
  pageUrl: string,
): void {
  const pageOrigin = parseOrigin(pageUrl);
  if (!pageOrigin || !trustedRequestOrigins(request).has(pageOrigin)) {
    throw new InquiryHttpError(400, "invalid_page_url");
  }
}

export function assertJsonContentType(request: Request): void {
  const contentType = request.headers.get("content-type");
  if (
    !contentType ||
    contentType.split(";", 1)[0]?.trim().toLowerCase() !== JSON_CONTENT_TYPE
  ) {
    throw new InquiryHttpError(415, "unsupported_media_type");
  }
}

/**
 * Content-Length가 빠진 chunked 요청도 실제 읽은 바이트 수로 중단합니다.
 */
export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<unknown> {
  const rawLength = request.headers.get("content-length");
  if (rawLength) {
    const contentLength = Number(rawLength);
    if (
      !Number.isSafeInteger(contentLength) ||
      contentLength < 0 ||
      contentLength > maxBytes
    ) {
      throw new InquiryHttpError(413, "payload_too_large");
    }
  }

  if (!request.body) throw new InquiryHttpError(400, "invalid_json");

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let byteLength = 0;
  let text = "";

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > maxBytes) {
        await reader.cancel();
        throw new InquiryHttpError(413, "payload_too_large");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof InquiryHttpError) throw error;
    throw new InquiryHttpError(400, "invalid_json");
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new InquiryHttpError(400, "invalid_json");
  }
}

export function assertConversationLength(
  messages: InquiryMessage[],
  maxCharacters = 20_000,
): void {
  const length = messages.reduce(
    (total, message) => total + message.content.length,
    0,
  );
  if (length > maxCharacters) {
    throw new InquiryHttpError(413, "conversation_too_large");
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  // 현재 EC2 Nginx가 x-real-ip를 신뢰 가능한 원격 주소로 덮어쓴다.
  // 클라이언트가 앞쪽 값을 주입할 수 있는 x-forwarded-for보다 우선한다.
  const candidate = realIp || forwarded || "unknown";
  return candidate.length <= 100 && !/[\r\n]/.test(candidate)
    ? candidate
    : "unknown";
}

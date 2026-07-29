import "server-only";

import { isIP } from "node:net";
import { NextResponse } from "next/server";

const JSON_CONTENT_TYPE = "application/json";
const DEFAULT_ALLOWED_ORIGINS = [
  "https://www.songseungju.dev",
  "https://songseungju.dev",
] as const;

export class ApiHttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
    this.name = "ApiHttpError";
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
  const origins = new Set<string>(DEFAULT_ALLOWED_ORIGINS);

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

  // 개발 서버의 임의 포트만 허용한다. 운영에서는 Host/request URL을
  // 신뢰 목록으로 승격하지 않아 Host-header 기반 Origin 우회를 막는다.
  if (process.env.NODE_ENV === "development") {
    const requestOrigin = parseOrigin(request.url);
    if (requestOrigin) origins.add(requestOrigin);
  }
  return origins;
}

export function assertTrustedOrigin(request: Request): void {
  const origin = parseOrigin(request.headers.get("origin"));
  if (!origin || !trustedRequestOrigins(request).has(origin)) {
    throw new ApiHttpError(403, "invalid_origin");
  }
}

export function assertTrustedPageUrl(
  request: Request,
  pageUrl: string,
): void {
  const pageOrigin = parseOrigin(pageUrl);
  if (!pageOrigin || !trustedRequestOrigins(request).has(pageOrigin)) {
    throw new ApiHttpError(400, "invalid_page_url");
  }
}

export function assertJsonContentType(request: Request): void {
  const contentType = request.headers.get("content-type");
  if (
    !contentType ||
    contentType.split(";", 1)[0]?.trim().toLowerCase() !== JSON_CONTENT_TYPE
  ) {
    throw new ApiHttpError(415, "unsupported_media_type");
  }
}

/**
 * Content-Length를 신뢰하지 않고 스트림에서 실제로 읽은 바이트를 센다.
 * 선언된 길이가 작아도 실제 본문이 상한을 넘는 즉시 읽기를 취소한다.
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
      throw new ApiHttpError(413, "payload_too_large");
    }
  }

  if (!request.body) throw new ApiHttpError(400, "invalid_json");

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
        throw new ApiHttpError(413, "payload_too_large");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof ApiHttpError) throw error;
    throw new ApiHttpError(400, "invalid_json");
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiHttpError(400, "invalid_json");
  }
}

export async function readTrustedJsonBody(
  request: Request,
  maxBytes: number,
): Promise<unknown> {
  assertTrustedOrigin(request);
  assertJsonContentType(request);
  return readJsonBody(request, maxBytes);
}

function validIp(value: string | null | undefined): string | null {
  const candidate = value?.trim();
  if (!candidate || candidate.length > 64 || isIP(candidate) === 0) return null;
  return candidate.toLowerCase();
}

function lastForwardedIp(value: string | null): string | null {
  if (!value) return null;
  const values = value.split(",");
  return validIp(values.at(-1));
}

/**
 * Vercel은 전용 헤더를 덮어쓰며, self-hosted Nginx는 X-Real-IP를
 * $remote_addr로 덮어쓴다. 클라이언트가 앞에 값을 추가할 수 있는 XFF의
 * 첫 항목은 절대 사용하지 않으며, 최후 fallback도 마지막 hop만 사용한다.
 */
export function getClientIp(request: Request): string {
  if (process.env.VERCEL === "1") {
    const vercelIp = lastForwardedIp(
      request.headers.get("x-vercel-forwarded-for"),
    );
    if (vercelIp) return vercelIp;
  }

  const realIp = validIp(request.headers.get("x-real-ip"));
  if (realIp) return realIp;

  return lastForwardedIp(request.headers.get("x-forwarded-for")) ?? "unknown";
}

export function noStoreJson(
  body: unknown,
  init: ResponseInit = {},
): NextResponse {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export function withNoStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function safeErrorMetadata(error: unknown): {
  errorName: string;
  errorCode?: string;
} {
  const errorName =
    error instanceof Error && /^[A-Za-z0-9_.-]{1,80}$/u.test(error.name)
      ? error.name
      : "UnknownError";

  if (!error || typeof error !== "object" || !("code" in error)) {
    return { errorName };
  }
  const code = (error as { code?: unknown }).code;
  const errorCode =
    typeof code === "string" && /^[A-Z0-9_]{1,40}$/u.test(code)
      ? code
      : undefined;
  return errorCode ? { errorName, errorCode } : { errorName };
}

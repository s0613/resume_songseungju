import "server-only";

import { ApiHttpError } from "@/lib/api-security";
import type { InquiryMessage } from "@/lib/inquiry/schema";
export {
  ApiHttpError as InquiryHttpError,
  assertJsonContentType,
  assertTrustedOrigin,
  assertTrustedPageUrl,
  getClientIp,
  readJsonBody,
  trustedRequestOrigins,
} from "@/lib/api-security";

export function assertConversationLength(
  messages: InquiryMessage[],
  maxCharacters = 20_000,
): void {
  const length = messages.reduce(
    (total, message) => total + message.content.length,
    0,
  );
  if (length > maxCharacters) {
    throw new ApiHttpError(413, "conversation_too_large");
  }
}

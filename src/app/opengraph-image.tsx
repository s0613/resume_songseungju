import { ImageResponse } from "next/og";

export const alt = "송승주 — AI 에이전트 빌더";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "rgb(212, 168, 50)";
const GOLD_DIM = "rgba(212, 168, 50, 0.6)";
const CREAM = "#f0e6cc";
const BG = "#1a1008";

// Google Fonts CSS API에서 TTF를 fetch해 ArrayBuffer로 로드하는 검증된 패턴.
// 실패하면 null을 반환하고, 렌더 시 영문 전용 문구로 폴백한다.
async function loadGoogleFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(
      text
    )}`;
    const cssResponse = await fetch(cssUrl);
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const fontUrlMatch = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
    if (!fontUrlMatch) return null;

    const fontResponse = await fetch(fontUrlMatch[1]);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const titleKo = "송승주 — AI 에이전트 빌더";
  const subtitleKo = "S-Skills · 풀스택 개발자";
  const titleEn = "SONG SEUNGJU — AI Agent Builder";
  const subtitleEn = "S-Skills · Fullstack Developer";

  const fontData = await loadGoogleFont(titleKo + subtitleKo);
  const title = fontData ? titleKo : titleEn;
  const subtitle = fontData ? subtitleKo : subtitleEn;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: BG,
          backgroundImage: `radial-gradient(circle at 85% 20%, ${GOLD_DIM} 0%, transparent 45%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            color: GOLD,
            marginBottom: 28,
          }}
        >
          AI AGENT BUILDER · SEOUL, KOREA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: GOLD,
            marginTop: 32,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Noto Sans KR", data: fontData, style: "normal", weight: 700 }]
        : undefined,
    }
  );
}

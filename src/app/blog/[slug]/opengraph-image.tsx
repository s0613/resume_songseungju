import { ImageResponse } from "next/og";
import { getPost } from "@/data/blog";

export const alt = "승주의 AI 블로그";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "rgb(212, 168, 50)";
const GOLD_DIM = "rgba(212, 168, 50, 0.6)";
const CREAM = "#f0e6cc";
const BG = "#1a1008";

// 루트 opengraph-image.tsx와 동일한 검증된 패턴: Google Fonts CSS API에서
// TTF를 fetch해 ArrayBuffer로 로드한다. 실패하면 null → 영문 폴백.
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

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const titleKo = post ? post.title : "승주의 AI 블로그";
  const subtitleKo = "송승주 · AI 에이전트 빌더";
  const titleEn = "SONG SEUNGJU'S AI BLOG";
  const subtitleEn = "AI Agent Builder";

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
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.3,
            maxWidth: 1000,
          }}
        >
          {title}
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

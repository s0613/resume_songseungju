import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { posts } from "@/data/blog";
import { articles } from "@/data/insights";

const baseUrl = "https://www.songseungju.dev";

// 날짜를 파싱할 수 없을 때 쓰는 고정 폴백 — 빌드 시각을 lastModified로 흘려보내지 않기 위함.
const FALLBACK_DATE = new Date("2026-07-27T00:00:00+09:00");

const MONTH_NAMES: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

// 블로그 date 형식: "2026. 7. 15."
function parseDotDate(value: string): Date | null {
  const match = value.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\./);
  if (!match) return null;
  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// 인사이트 date 형식: "2026 · July" (일자 정보 없음 → 해당 월 1일로 근사)
function parseYearMonthDate(value: string): Date | null {
  const match = value.match(/(\d{4})\s*·\s*([A-Za-z]+)/);
  if (!match) return null;
  const [, year, monthName] = match;
  const month = MONTH_NAMES[monthName.toLowerCase()];
  if (month === undefined) return null;
  const parsed = new Date(Number(year), month, 1);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// 포트폴리오 date 형식: "2025.12 ~ 현재" / "2025.03 ~ 2025.10" — 종료월이 있으면 그 값을, 없으면 시작월을 사용.
function parsePortfolioDate(value: string): Date | null {
  const [startRaw, endRaw] = value.split("~").map((part) => part.trim());
  const endMatch = endRaw?.match(/^(\d{4})\.(\d{1,2})/);
  if (endMatch) {
    const [, year, month] = endMatch;
    return new Date(Number(year), Number(month) - 1, 1);
  }
  const startMatch = startRaw?.match(/^(\d{4})\.(\d{1,2})/);
  if (startMatch) {
    const [, year, month] = startMatch;
    return new Date(Number(year), Number(month) - 1, 1);
  }
  return null;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioEntries: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: parsePortfolioDate(project.date) ?? FALLBACK_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parseDotDate(post.date) ?? FALLBACK_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const insightEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/s-skills/insights/${article.slug}`,
    lastModified: parseYearMonthDate(article.date) ?? FALLBACK_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 정적 페이지는 실제 변경 이력을 알 수 없으므로 lastModified를 생략한다(허위 신호 방지).
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/s-skills`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/open-trader`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: `${baseUrl}/s-skills/insights`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...insightEntries,
    ...portfolioEntries,
  ];
}

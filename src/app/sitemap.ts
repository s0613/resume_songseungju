import type { MetadataRoute } from "next";

const portfolioSlugs = [
  "curlcode",
  "indexkit",
  "totaroweb",
  "totarocos",
  "upflowax",
  "s-skills",
  "mone",
  "trynic",
  "cogmo",
  "totaload",
  "runningtoyou",
  "medivu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.songseungju.dev";

  const portfolioEntries: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/s-skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/s-skills/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...portfolioEntries,
  ];
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 구 인사이트 URL은 블로그로 이관됨 — 색인 보전을 위해 301로 넘긴다.
  async redirects() {
    return [
      {
        source: "/s-skills/insights",
        destination: "/blog?category=s-skills",
        permanent: true,
      },
      {
        source: "/s-skills/insights/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import React from "react";
import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageMain from "@/components/common/PageMain";
import AgentWidget from "@/components/agent/AgentWidget";
// SEED 디자인 시스템 토큰·레시피 (블로그가 소비하는 단일 토큰 소스).
// `.seed-*` 클래스와 `--seed-*` 변수만 정의하므로 기존 페이지 스타일과 충돌하지 않는다.
import '@seed-design/css/all.css';
import './styles/globals.css';

const SITE_TITLE = "송승주 — AI 에이전트 빌더 · 풀스택 개발자";
const SITE_DESCRIPTION =
  "AI 에이전트가 함께 일하는 시스템을 설계하는 AI 에이전트 빌더 송승주입니다. Claude Code 멀티 에이전트 하네스 S-Skills를 오픈소스로 만들고, Next.js·React·TypeScript·Spring Boot 기반 풀스택 개발로 포트폴리오와 블로그를 포함해 기획부터 배포까지 수행합니다.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | 송승주",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.songseungju.dev"),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.songseungju.dev",
    siteName: "송승주 — AI 에이전트 빌더",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "송승주",
  alternateName: "Song Seungju",
  url: "https://www.songseungju.dev",
  sameAs: [
    "https://github.com/s0613",
    "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%86%A1-73b41a2a8/",
  ],
  jobTitle: "AI Agent Builder / Fullstack Developer",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "송승주 — AI 에이전트 빌더",
  url: "https://www.songseungju.dev",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // 사이트 전체가 라이트 고정이므로 SEED도 light-only로 잠근다 (다크 자동 전환 없음).
    <html lang="ko" data-seed data-seed-color-mode="light-only">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <PageMain>{children}</PageMain>
        <Footer />
        <AgentWidget />
      </body>
    </html>
  );
};

export default Layout;

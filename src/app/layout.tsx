import React from "react";
import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import './styles/globals.css';

export const metadata: Metadata = {
  title: "송승주 포트폴리오 | 풀스택 개발자",
  description: "풀스택 개발자 송승주의 포트폴리오입니다. Next.js, React, TypeScript 기반 프로젝트와 AI 에이전트 개발 경험을 소개합니다.",
  metadataBase: new URL("https://www.songseungju.dev"),
  alternates: {
    canonical: "https://www.songseungju.dev",
  },
  openGraph: {
    title: "송승주 포트폴리오 | 풀스택 개발자",
    description: "풀스택 개발자 송승주의 포트폴리오입니다. Next.js, React, TypeScript 기반 프로젝트와 AI 에이전트 개발 경험을 소개합니다.",
    url: "https://www.songseungju.dev",
    siteName: "송승주 포트폴리오",
    locale: "ko_KR",
    type: "website",
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
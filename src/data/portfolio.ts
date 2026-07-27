// 포트폴리오 12개 프로젝트 단일 데이터 소스
// 메인 페이지 Project Archive, /portfolio/* 메타데이터, sitemap.ts가 모두 이 파일을 참조합니다.

import type { Metadata } from "next"

export interface PortfolioProject {
    slug: string
    name: string
    title: string
    description: string
    date: string
    tags: string[]
}

// 에이전트·AI 관련 프로젝트를 앞에 배치 (메인 Archive 정렬 순서와 동일)
export const portfolioProjects: PortfolioProject[] = [
    {
        slug: "s-skills",
        name: "S-Skills",
        title: "S-Skills | Portfolio",
        description: "혼자 일하는 개발자의 팀 — Claude Code 역할 기반 AI 개발 오케스트레이터 오픈소스",
        date: "2025.12 ~ 현재",
        tags: ["Claude Code", "TypeScript", "Multi-Agent", "Open Source"],
    },
    {
        slug: "totaroweb",
        name: "Totaro Web",
        title: "Totaro Web | Portfolio",
        description: "AI 기반 K-Food 글로벌 B2B 소싱 플랫폼 — 바이어와 공급업체를 연결하는 마켓플레이스",
        date: "2025.10 ~ 진행중",
        tags: ["Next.js 16", "TypeScript", "Supabase", "Google Gemini", "next-intl", "Playwright"],
    },
    {
        slug: "totarocos",
        name: "Totaro Cos",
        title: "Totaro Cos | Portfolio",
        description: "해외 바이어와 한국 화장품 공급사를 연결하는 K-Beauty B2B 소싱 플랫폼",
        date: "2025.11 ~ 진행중",
        tags: ["Next.js 16", "Supabase", "Google Gemini", "MFDS 데이터", "Playwright"],
    },
    {
        slug: "cogmo",
        name: "Cogmo 안녕",
        title: "Cogmo 안녕 | Portfolio",
        description: "고령자를 위한 AI 기반 인지건강 측정 및 관리 플랫폼 — 모바일 앱·보호자 대시보드 풀스택",
        date: "2025.11 ~ 2026.01",
        tags: ["Flutter", "Spring Boot", "Next.js", "Gemini AI", "AWS", "WebSocket"],
    },
    {
        slug: "trynic",
        name: "Trynic",
        title: "Trynic | Portfolio",
        description: "레퍼런스 기반 AI 생성 이미지·영상 웹 — 기획부터 개발·배포 전 과정 수행",
        date: "2025.01 ~ 현재",
        tags: ["Next.js", "Tailwind CSS", "Spring Boot", "AWS S3", "CloudFront", "fal API"],
    },
    {
        slug: "totaload",
        name: "Totaload",
        title: "Totaload | Portfolio",
        description: "중고차 수출 디지털 인증서 자동 발급 SaaS — AI 판독과 규정 매핑 원스톱 솔루션",
        date: "2025.07 ~ 현재",
        tags: ["Spring Boot", "Python AI", "AWS", "OCR", "PDF", "전자서명"],
    },
    {
        slug: "medivu",
        name: "MediVu",
        title: "MediVu | Portfolio",
        description: "PACS 연동 문제를 해결하는 AI 기반 의료영상 판독문 자동 생성 솔루션",
        date: "2025.03 ~ 2025.10",
        tags: ["Next.js", "TypeScript", "MCP", "PDF De-identification"],
    },
    {
        slug: "mone",
        name: "MONE",
        title: "MONE | Portfolio",
        description: "선상 면세점 풀스택 통합 관리 시스템 — 예약·주문·정산·인사급여 등 13개 도메인",
        date: "2026.01 ~ 현재",
        tags: ["Django", "Python", "DRF", "Next.js", "TypeScript", "PostgreSQL"],
    },
    {
        slug: "indexkit",
        name: "IndexKit",
        title: "IndexKit | Portfolio",
        description: "네이버 블로그 포스트를 Google 검색에 자동 노출시키는 SaaS — 색인 요청 자동화",
        date: "2026.03 ~ 현재",
        tags: ["Next.js", "Supabase", "TypeScript", "Vercel", "Google Search Console API", "PortOne"],
    },
    {
        slug: "upflowax",
        name: "Upflow AX",
        title: "Upflow AX | Portfolio",
        description: "SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지, DDD 도메인 캔버스·RTM·손익 통합",
        date: "2025.12 ~ 진행중",
        tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Tiptap"],
    },
    {
        slug: "curlcode",
        name: "Curl CODE",
        title: "Curl CODE | Portfolio",
        description: "곱슬머리 유형 진단부터 맞춤 관리 루틴까지 제공하는 AI 헤어케어 컨설팅 웹앱",
        date: "2025.10 ~ 2026.02",
        tags: ["Next.js", "TypeScript", "Supabase", "Recharts", "Playwright"],
    },
    {
        slug: "runningtoyou",
        name: "RunningToYou",
        title: "RunningToYou | Portfolio",
        description: "러닝을 기반으로 한 자연스러운 만남을 연결하는 데이팅 MVP 서비스",
        date: "2024.04 ~ 2024.11",
        tags: ["Next.js", "TypeScript", "Spring Boot", "MariaDB"],
    },
]

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
    return portfolioProjects.find((p) => p.slug === slug)
}

// /portfolio/{slug} 페이지의 title·description·openGraph·canonical을 단일 소스에서 생성.
// 각 상세 페이지가 홈의 og:title을 상속받지 않고 자체 값을 갖도록 한다.
export function buildPortfolioMetadata(slug: string): Metadata {
    const project = getPortfolioProject(slug)
    if (!project) {
        throw new Error(`Unknown portfolio slug: ${slug}`)
    }

    const url = `/portfolio/${slug}`

    return {
        title: project.title,
        description: project.description,
        alternates: { canonical: url },
        openGraph: {
            title: project.title,
            description: project.description,
            url,
            type: "website",
        },
    }
}

"use client"

import type React from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-start gap-4 mb-10">
        <span className="text-8xl font-extralight leading-none text-gray-200 select-none mt-1 hidden sm:block">{num}</span>
        <div className="pt-1 sm:pt-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
            <div className="h-0.5 bg-gray-900 mt-2.5 w-10" />
        </div>
    </div>
)

const IndexKitPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            <section className="relative h-[72vh] w-full">
                <Image src="/IndexKit/indexkitHero.webp" alt="IndexKit 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        SaaS · SEO · 색인 자동화
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        IndexKit
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        네이버 블로그 포스트를 Google 검색에 자동으로 노출시켜주는 SaaS
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["Next.js", "Supabase", "TypeScript", "Vercel", "Google Search Console API", "PortOne"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                    <a
                        href="https://indexkit.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit"
                    >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm font-mono">indexkit.kr</span>
                    </a>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        IndexKit은 네이버 블로그 운영자가 작성한 포스트를 Google 검색에 빠르게 노출시킬 수 있도록
                        자동화 파이프라인을 제공하는 SaaS입니다. 블로그 ID 한 번 등록으로 신규 글을 자동 수집하고,
                        Google Search Console Indexing API를 통해 직접 색인 요청을 제출합니다.
                        평균 24시간 내 색인, 99% 성공률을 목표로 합니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            랜딩 페이지, 대시보드, 색인 현황 모니터링, 요금제 관리까지 풀스택으로 직접 개발한 서비스입니다.
                            Supabase로 사용자 인증과 구독 플랜을 관리하고, PortOne 결제 연동으로 유료 플랜 온보딩을 구현했습니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/IndexKit/indexkitOverview.webp" alt="IndexKit 개요" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            네이버 블로그는 Google 크롤러가 자주 방문하지 않아 새 글이 검색에 노출되기까지 수 주가 걸리는 경우가 많습니다.
                            Google Search Console Indexing API를 직접 활용하면 24시간 내 색인이 가능하지만,
                            API 연동·자동화 파이프라인 구축은 일반 블로거에게 진입 장벽이 높습니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/IndexKit/indexkitSolution.webp" alt="IndexKit 솔루션" fill className="object-cover object-top" />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            블로그 ID 등록 한 번으로 신규 글 자동 감지 및 색인 요청까지 완전 자동화합니다.
                            누락된 과거 글은 부스터 팩(100 / 500 / 1,000 URL)으로 일괄 복구할 수 있고,
                            대시보드에서 색인 성공·진행·실패 현황을 실시간으로 추적합니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ul className="space-y-4">
                            {[
                                "블로그 ID 등록 → 신규 글 자동 수집 → Google 색인 요청 자동화",
                                "부스터 팩으로 누락 글 일괄 복구 (100 / 500 / 1,000 URL)",
                                "색인 현황 실시간 대시보드 (완료 / 진행중 / 실패 / Googlebot IP)",
                                "Supabase 기반 사용자 인증 및 구독 플랜 관리",
                                "PortOne 결제 연동 (Free / Light ₩39k / Pro ₩99k / Business ₩299k)",
                                "타사 대비 24시간 빠른 색인, 99% 성공률 목표",
                            ].map((f, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/IndexKit/indexkitFeatures.webp" alt="IndexKit 주요 기능" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { title: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Shadcn/UI"] },
                            { title: "Backend & Data", items: ["Supabase (Auth + DB)", "Google Search Console Indexing API", "Naver Blog RSS 파싱", "PortOne 결제 연동"] },
                            { title: "Infra & DevOps", items: ["Vercel (배포)", "Supabase Edge Functions", "Vitest (단위 테스트)", "Playwright (E2E)"] },
                        ].map((group) => (
                            <div key={group.title}>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{group.title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span key={item} className="px-3 py-1.5 bg-white text-gray-800 text-sm font-mono border border-gray-200 rounded">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="06" title="Architecture" />
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                        <Image src="/IndexKit/indexkitArchitecture.webp" alt="IndexKit 아키텍처" fill className="object-contain bg-gray-50" />
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "서비스 기획 · PRD · 정보 아키텍처 단독 작성",
                            "Next.js 풀스택 개발 (랜딩, 대시보드, 색인 현황)",
                            "Google Search Console Indexing API 파이프라인 설계 및 구현",
                            "Supabase 인증 + 구독 플랜 DB 설계",
                            "PortOne 결제 연동 온보딩 플로우 구현",
                            "Vercel 배포 및 운영 (indexkit.kr)",
                        ].map((role, i) => (
                            <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                                <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-gray-800">{role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <SectionHeader num="08" title="Progress & What's Next" />
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                        {[
                            { title: "서비스 런칭 및 실 사용자 유입 중" },
                            { title: "Free / 유료 플랜 결제 파이프라인 완성" },
                            { title: "색인 성공률 99% 목표 운영 중" },
                            { title: "블로그 외 플랫폼(티스토리 등) 확장 예정" },
                            { title: "구글 서치콘솔 인증 자동화 개선 예정" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 px-6 py-4 bg-white/60">
                                <span className="font-mono text-xs text-gray-400 w-8 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                <p className="text-gray-800">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default IndexKitPage

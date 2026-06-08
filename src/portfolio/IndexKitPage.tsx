"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink } from "lucide-react"

const IndexKitPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative h-[500px] w-full">
                <Image src="/IndexKit/indexkitHero.webp" alt="IndexKit 히어로" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">IndexKit</h1>
                    </div>
                    <p className="text-lg text-white max-w-3xl">네이버 블로그 포스트를 Google 검색에 자동으로 노출시켜주는 SaaS</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {["Next.js", "Supabase", "TypeScript", "Vercel", "Google Search Console API", "PortOne"].map((t) => (
                            <Badge key={t} className="bg-white/20 text-white hover:bg-white/30">{t}</Badge>
                        ))}
                    </div>
                    <a
                        href="https://indexkit.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">indexkit.kr</span>
                    </a>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            IndexKit은 네이버 블로그 운영자가 작성한 포스트를 Google 검색에 빠르게 노출시킬 수 있도록
                            자동화 파이프라인을 제공하는 SaaS입니다. 블로그 ID 한 번 등록으로 신규 글을 자동 수집하고,
                            Google Search Console Indexing API를 통해 직접 색인 요청을 제출합니다.
                            평균 24시간 내 색인, 99% 성공률을 목표로 합니다.
                        </p>
                    </div>
                </section>

                <Separator className="my-12" />

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Overview</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                랜딩 페이지, 대시보드, 색인 현황 모니터링, 요금제 관리까지 풀스택으로 직접 개발한 서비스입니다.
                                Supabase로 사용자 인증과 구독 플랜을 관리하고, PortOne 결제 연동으로 유료 플랜 온보딩을 구현했습니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image src="/IndexKit/indexkitOverview.webp" alt="IndexKit 개요" fill className="object-cover" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        네이버 블로그는 Google 크롤러가 자주 방문하지 않아 새 글이 검색에 노출되기까지 수 주가 걸리는 경우가 많습니다.
                        Google Search Console Indexing API를 직접 활용하면 24시간 내 색인이 가능하지만,
                        API 연동·자동화 파이프라인 구축은 일반 블로거에게 진입 장벽이 높습니다.
                    </p>
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/IndexKit/indexkitSolution.webp" alt="IndexKit 솔루션" fill className="object-cover" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                블로그 ID 등록 한 번으로 신규 글 자동 감지 및 색인 요청까지 완전 자동화합니다.
                                누락된 과거 글은 부스터 팩(100 / 500 / 1,000 URL)으로 일괄 복구할 수 있고,
                                대시보드에서 색인 성공·진행·실패 현황을 실시간으로 추적합니다.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Main Features</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        <div className="lg:col-span-2 space-y-6">
                            <ul className="space-y-4">
                                {[
                                    "블로그 ID 등록 → 신규 글 자동 수집 → Google 색인 요청 자동화",
                                    "부스터 팩으로 누락 글 일괄 복구 (100 / 500 / 1,000 URL)",
                                    "색인 현황 실시간 대시보드 (완료 / 진행중 / 실패 / Googlebot IP)",
                                    "Supabase 기반 사용자 인증 및 구독 플랜 관리",
                                    "PortOne 결제 연동 (Free / Light ₩39k / Pro ₩99k / Business ₩299k)",
                                    "타사 대비 24시간 빠른 색인, 99% 성공률 목표",
                                ].map((f, i) => (
                                    <li key={i} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-3 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/IndexKit/indexkitFeatures.webp" alt="IndexKit 주요 기능" fill className="object-cover" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Tech Stack</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Frontend",
                                items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
                            },
                            {
                                title: "Backend & Data",
                                items: ["Supabase (Auth + DB)", "Google Search Console Indexing API", "Naver Blog RSS 파싱", "PortOne 결제 연동"],
                            },
                            {
                                title: "Infra & DevOps",
                                items: ["Vercel (배포)", "Supabase Edge Functions", "Vitest (단위 테스트)", "Playwright (E2E)"],
                            },
                        ].map((group) => (
                            <div key={group.title}>
                                <h3 className="text-xl font-semibold mb-4 text-gray-700">{group.title}</h3>
                                <ul className="space-y-2">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-gray-700 mr-3" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Architecture</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <Image src="/IndexKit/indexkitArchitecture.webp" alt="IndexKit 아키텍처" fill className="object-cover" />
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">My Role & Contributions</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "서비스 기획 · PRD · 정보 아키텍처 단독 작성",
                            "Next.js 풀스택 개발 (랜딩, 대시보드, 색인 현황)",
                            "Google Search Console Indexing API 파이프라인 설계 및 구현",
                            "Supabase 인증 + 구독 플랜 DB 설계",
                            "PortOne 결제 연동 온보딩 플로우 구현",
                            "Vercel 배포 및 운영 (indexkit.kr)",
                        ].map((role, i) => (
                            <div key={i} className="flex items-start">
                                <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-lg">{role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Progress & What&apos;s Next</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "서비스 런칭 및 실 사용자 유입 중", icon: "🚀" },
                            { title: "Free / 유료 플랜 결제 파이프라인 완성", icon: "✅" },
                            { title: "색인 성공률 99% 목표 운영 중", icon: "📈" },
                            { title: "블로그 외 플랫폼(티스토리 등) 확장 예정", icon: "🔗" },
                            { title: "구글 서치콘솔 인증 자동화 개선 예정", icon: "⚙️" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <p className="text-gray-700">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default IndexKitPage

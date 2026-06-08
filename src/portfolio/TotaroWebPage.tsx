"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const TotaroWebPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative h-[500px] w-full">
                <Image src="/TotaroWeb/totaroweb_hero.webp" alt="Totaro Web 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Totaro Web</h1>
                    <p className="text-lg text-white max-w-3xl">AI 기반 K-Food 글로벌 B2B 소싱 플랫폼 — 바이어와 공급업체를 연결하는 마켓플레이스</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {["Next.js", "TypeScript", "Supabase", "Google Gemini", "TanStack Query", "Playwright"].map((t) => (
                            <Badge key={t} className="bg-white/20 text-white hover:bg-white/30">{t}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Totaro Web은 한국 식품 공급업체와 글로벌 바이어를 연결하는 AI 기반 B2B 소싱 플랫폼입니다.
                            AI 상품 검색·자동 견적 요청·실시간 채팅을 통해 국제 식품 거래의 언어 장벽과 정보 비대칭을 해소합니다.
                            Next.js App Router 기반으로 바이어용·공급업체용·관리자용 3가지 인터페이스를 한 코드베이스에서 운영합니다.
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
                                랜딩 페이지, 공급업체 디렉토리, 카테고리 브라우징, AI 채팅 견적 시스템,
                                공급업체 대시보드, 재고·주문·정산 관리까지 풀스택으로 구현했습니다.
                                한국어·영어·일본어 다국어(next-intl)를 지원합니다.
                            </p>
                        </div>
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image src="/TotaroWeb/totaroweb_categories.webp" alt="Totaro Web 카테고리" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        글로벌 바이어가 한국 식품 공급업체를 탐색할 때 언어 장벽, 카탈로그 파편화,
                        느린 견적 프로세스(이메일·팩스)가 거래 성사를 막습니다.
                        공급업체는 해외 마케팅 비용과 인프라 없이는 글로벌 바이어에 도달하기 어렵습니다.
                    </p>
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/TotaroWeb/totaroweb_suppliers.webp" alt="Totaro Web 공급업체" fill className="object-cover object-top" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Gemini AI 기반 자연어 상품 검색과 자동 견적 채팅으로 기존 이메일·팩스 프로세스를 대체합니다.
                                공급업체는 대시보드에서 재고·주문·정산을 일괄 관리하고,
                                바이어는 다국어로 실시간 견적을 받을 수 있습니다.
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
                        <div className="lg:col-span-2 space-y-4">
                            <ul className="space-y-4">
                                {[
                                    "Gemini AI 자연어 상품 검색 및 자동 견적 채팅",
                                    "바이어·공급업체·관리자 역할 분리 대시보드",
                                    "공급업체 재고·주문·정산 통합 관리",
                                    "한국어·영어·일본어 다국어(next-intl) 지원",
                                    "TanStack Query 서버 상태 관리 + 낙관적 업데이트",
                                    "Supabase RLS 기반 역할 접근 제어",
                                    "Vitest 단위 + Playwright E2E 테스트",
                                ].map((f, i) => (
                                    <li key={i} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-3 relative h-[420px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/TotaroWeb/totaroweb_insights.webp" alt="Totaro Web 인사이트" fill className="object-cover object-top" />
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
                                items: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS + shadcn/ui", "TanStack React Query", "next-intl (i18n)"],
                            },
                            {
                                title: "Backend & AI",
                                items: ["Supabase (Auth + DB + RLS)", "Google Gemini (AI 검색·채팅)", "Vercel AI SDK", "Next.js API Routes"],
                            },
                            {
                                title: "Testing & Infra",
                                items: ["Vitest (단위 테스트)", "Playwright (E2E)", "Vercel 배포", "Supabase Edge Functions"],
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
                        <span className="mr-2">Platform Preview</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <Image src="/TotaroWeb/totaroweb_features.webp" alt="Totaro Web 기능" fill className="object-cover object-top" />
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">My Role & Contributions</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "서비스 기획 · PRD · IA 단독 설계",
                            "Next.js 풀스택 개발 (랜딩, 마켓, 대시보드, AI 채팅)",
                            "Gemini AI 상품 검색·자동 견적 파이프라인 구현",
                            "Supabase RLS 기반 바이어·공급업체·관리자 권한 설계",
                            "next-intl 다국어(한·영·일) 적용",
                            "Vitest + Playwright 테스트 파이프라인 구축",
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
                            { title: "바이어·공급업체 풀스택 플로우 완성", icon: "✅" },
                            { title: "Gemini AI 검색·견적 파이프라인 완성", icon: "🤖" },
                            { title: "한국어·영어·일본어 다국어 적용", icon: "🌐" },
                            { title: "실제 식품 공급업체 파일럿 온보딩 검토", icon: "🏭" },
                            { title: "결제 연동 및 에스크로 기능 예정", icon: "💳" },
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

export default TotaroWebPage

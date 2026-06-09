"use client"

import type React from "react"
import Image from "next/image"

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-start gap-4 mb-10">
        <span className="text-8xl font-extralight leading-none text-gray-200 select-none mt-1 hidden sm:block">{num}</span>
        <div className="pt-1 sm:pt-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
            <div className="h-0.5 bg-gray-900 mt-2.5 w-10" />
        </div>
    </div>
)

const TotaroWebPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            <section className="relative h-[72vh] w-full">
                <Image src="/TotaroWeb/totaroweb_hero.webp" alt="Totaro Web 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        B2B Marketplace · K-Food · AI
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        Totaro Web
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        AI 기반 K-Food 글로벌 B2B 소싱 플랫폼 — 바이어와 공급업체를 연결하는 마켓플레이스
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js", "TypeScript", "Supabase", "Google Gemini", "TanStack Query", "Playwright"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Totaro Web은 한국 식품 공급업체와 글로벌 바이어를 연결하는 AI 기반 B2B 소싱 플랫폼입니다.
                        AI 상품 검색·자동 견적 요청·실시간 채팅을 통해 국제 식품 거래의 언어 장벽과 정보 비대칭을 해소합니다.
                        Next.js App Router 기반으로 바이어용·공급업체용·관리자용 3가지 인터페이스를 한 코드베이스에서 운영합니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            랜딩 페이지, 공급업체 디렉토리, 카테고리 브라우징, AI 채팅 견적 시스템,
                            공급업체 대시보드, 재고·주문·정산 관리까지 풀스택으로 구현했습니다.
                            한국어·영어·일본어 다국어(next-intl)를 지원합니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroWeb/totaroweb_categories.webp" alt="Totaro Web 카테고리" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            글로벌 바이어가 한국 식품 공급업체를 탐색할 때 언어 장벽, 카탈로그 파편화,
                            느린 견적 프로세스(이메일·팩스)가 거래 성사를 막습니다.
                            공급업체는 해외 마케팅 비용과 인프라 없이는 글로벌 바이어에 도달하기 어렵습니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroWeb/totaroweb_suppliers.webp" alt="Totaro Web 공급업체" fill className="object-cover object-top" />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Gemini AI 기반 자연어 상품 검색과 자동 견적 채팅으로 기존 이메일·팩스 프로세스를 대체합니다.
                            공급업체는 대시보드에서 재고·주문·정산을 일괄 관리하고,
                            바이어는 다국어로 실시간 견적을 받을 수 있습니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroWeb/totaroweb_insights.webp" alt="Totaro Web 인사이트" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
                    <SectionHeader num="06" title="Platform Preview" />
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                        <Image src="/TotaroWeb/totaroweb_features.webp" alt="Totaro Web 기능" fill className="object-contain bg-gray-50" />
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "서비스 기획 · PRD · IA 단독 설계",
                            "Next.js 풀스택 개발 (랜딩, 마켓, 대시보드, AI 채팅)",
                            "Gemini AI 상품 검색·자동 견적 파이프라인 구현",
                            "Supabase RLS 기반 바이어·공급업체·관리자 권한 설계",
                            "next-intl 다국어(한·영·일) 적용",
                            "Vitest + Playwright 테스트 파이프라인 구축",
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
                            { title: "바이어·공급업체 풀스택 플로우 완성" },
                            { title: "Gemini AI 검색·견적 파이프라인 완성" },
                            { title: "한국어·영어·일본어 다국어 적용" },
                            { title: "실제 식품 공급업체 파일럿 온보딩 검토" },
                            { title: "결제 연동 및 에스크로 기능 예정" },
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

export default TotaroWebPage

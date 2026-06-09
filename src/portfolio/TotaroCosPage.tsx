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

const TotaroCosPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* Hero */}
            <section className="relative h-[72vh] w-full">
                <Image src="/TotaroCos/totarocos_hero.webp" alt="Totaro Cos 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        K-Beauty B2B · Platform
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        Totaro Cos
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        해외 바이어와 한국 화장품 공급사를 연결하는 K-Beauty B2B 소싱 플랫폼
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js", "Supabase", "Google Gemini", "Tailwind CSS", "MFDS 데이터", "Playwright"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">

                {/* Intro */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Totaro Cos는 글로벌 K-Beauty 바이어와 한국 화장품·뷰티 공급업체를 연결하는 B2B 소싱 플랫폼입니다.
                        식약처(MFDS)·네이버 데이터 파이프라인으로 상품 DB를 구축하고,
                        AI 채팅 기반 상담·견적부터 주문·정산까지 하나의 플랫폼에서 처리합니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                {/* 01 Overview */}
                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            바이어용 마켓플레이스(상품 검색·AI 채팅·견적 요청)와
                            공급업체용 대시보드(상품 등록·주문·정산 관리)를 한 코드베이스에서 운영합니다.
                            MFDS 공공 데이터와 네이버 쇼핑 크롤링으로 상품 마스터를 자동 구축합니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroCos/totarocos_market.webp" alt="Totaro Cos 마켓" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                {/* 02 Problem */}
                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            K-Beauty 글로벌 인기에도 해외 바이어는 신뢰할 수 있는 한국 화장품 공급사를 찾기 어렵습니다.
                            공급사는 해외 유통 채널이 없어 OEM·ODM 수출 기회를 놓치고,
                            성분 규제·인증 정보를 다국어로 제공하는 B2B 채널도 부재합니다.
                        </p>
                    </div>
                </section>

                {/* 03 Solution */}
                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroCos/totarocos_supplier.webp" alt="Totaro Cos 공급업체" fill className="object-cover object-top" />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            MFDS 공공 데이터 파이프라인으로 성분·인증 정보를 자동화하고,
                            Gemini AI 채팅으로 성분 설명·규제 안내·견적을 다국어 실시간 제공합니다.
                            공급업체는 별도 해외 마케팅 없이 글로벌 바이어에게 노출됩니다.
                        </p>
                    </div>
                </section>

                {/* 04 Main Features */}
                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ul className="space-y-4">
                            {[
                                "MFDS→Naver→DB 화장품 데이터 파이프라인",
                                "Gemini AI 기반 성분 설명·견적 채팅",
                                "바이어·공급업체 역할 분리 대시보드",
                                "OEM/ODM 상담 및 샘플 요청 플로우",
                                "상품 등록·재고·주문·정산 통합 관리",
                                "Supabase RLS 기반 역할별 데이터 접근 제어",
                                "Vitest 단위 + Playwright E2E 테스트",
                            ].map((f, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/TotaroCos/totarocos_features.webp" alt="Totaro Cos 기능" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                {/* 05 Tech Stack */}
                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Frontend",
                                items: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS + shadcn/ui", "TanStack React Query"],
                            },
                            {
                                title: "Backend & AI",
                                items: ["Supabase (Auth + DB + RLS)", "Google Gemini (AI 채팅·성분 설명)", "MFDS 공공 데이터 파이프라인", "Naver 쇼핑 데이터 수집"],
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

                {/* 06 Platform Preview */}
                <section className="mb-24">
                    <SectionHeader num="06" title="Platform Preview" />
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                        <Image src="/TotaroCos/totarocos_overview.webp" alt="Totaro Cos 전체" fill className="object-contain bg-gray-50" />
                    </div>
                </section>

                {/* 07 My Role */}
                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "서비스 기획 · PRD · IA 단독 설계",
                            "MFDS→Naver 데이터 파이프라인 설계 및 구현",
                            "Next.js 풀스택 개발 (바이어 마켓, 공급업체 대시보드)",
                            "Gemini AI 성분 설명·OEM/ODM 견적 채팅 구현",
                            "Supabase RLS 기반 역할별 권한 시스템 설계",
                            "Vitest + Playwright 테스트 파이프라인 구축",
                        ].map((role, i) => (
                            <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                                <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-gray-800">{role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 08 Progress & What's Next */}
                <section>
                    <SectionHeader num="08" title="Progress & What's Next" />
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                        {[
                            { title: "바이어·공급업체 풀스택 플로우 완성" },
                            { title: "MFDS 데이터 파이프라인 자동화 완성" },
                            { title: "Gemini AI 성분·견적 채팅 완성" },
                            { title: "실제 K-Beauty 공급사 파일럿 온보딩 검토" },
                            { title: "성분 다국어 번역·규제 가이드 확장 예정" },
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

export default TotaroCosPage

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

const UpflowAxPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* HERO */}
            <section className="relative h-[72vh] w-full">
                <Image src="/UpflowAx/upflow_dashboard.webp" alt="Upflow AX 대시보드" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        SI 사업관리 · Fullstack · 2025
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        Upflow AX
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지 하나의 워크스페이스
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Tiptap"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">

                {/* INTRO */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Upflow AX는 SI(시스템통합) 사업의 수주·기획·개발·정산까지 전 과정을 한 플랫폼에서 관리하는 사업관리 툴입니다.
                        제안서·WBS·요구사항 등 6종 SI 산출 문서를 AI 보조로 작성하고,
                        DDD 도메인 캔버스·RTM·자원 배정·손익·SLA 모니터링을 통합 제공합니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                {/* 01 OVERVIEW */}
                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            프로젝트 대시보드, 문서 편집기(Tiptap), 도메인 맵(DDD 캔버스),
                            요구사항 추적 매트릭스(RTM), 자원·일정 관리, 손익 분석, SLA 대시보드를
                            React 19와 Next.js 16 App Router 기반으로 구현했습니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/UpflowAx/upflow_features.webp" alt="Upflow AX 기능" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                {/* 02 PROBLEM */}
                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            SI 기업은 제안서·착수 보고·WBS·요구사항·결과 보고 등 수십 종의 문서를 각기 다른 툴(Word·Excel·PPT)로 관리합니다.
                            프로젝트 진행 중 문서·이슈·자원·손익이 파편화되어 PM은 통합 현황 파악에 많은 시간을 씁니다.
                        </p>
                    </div>
                </section>

                {/* 03 SOLUTION */}
                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/UpflowAx/upflow_dashboard.webp" alt="Upflow AX 대시보드" fill className="object-cover object-top" />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            SI 문서 6종(작업개요·제안서·요구사항·WBS·데모·결과보고서)을 AI 보조로 작성하고
                            프로젝트 대시보드에서 진행률·자원·손익을 실시간 모니터링합니다.
                            DDD 도메인 캔버스와 RTM으로 개발-비즈니스 요구사항 정렬도 추적합니다.
                        </p>
                    </div>
                </section>

                {/* 04 MAIN FEATURES */}
                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ul className="space-y-4">
                            {[
                                "SI 산출 문서 6종 AI 보조 편집기 (Tiptap 기반)",
                                "DDD 도메인 캔버스 — 바운디드 컨텍스트 시각화",
                                "RTM(요구사항 추적 매트릭스) 자동 생성·관리",
                                "프로젝트별 자원 배정·일정·마일스톤 관리",
                                "손익 분석 및 SLA 모니터링 대시보드",
                                "TanStack Query + Supabase RLS 실시간 상태 동기화",
                                "Tailwind v4 + shadcn/ui 기반 통합 UI 시스템",
                            ].map((f, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/UpflowAx/upflow_overview.webp" alt="Upflow AX 오버뷰" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                {/* 05 TECH STACK */}
                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Frontend",
                                items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4 + shadcn/ui", "Tiptap (리치 텍스트 편집기)"],
                            },
                            {
                                title: "Backend & Data",
                                items: ["Supabase (Auth + PostgreSQL + RLS)", "TanStack React Query v5", "Next.js API Routes", "Supabase Realtime"],
                            },
                            {
                                title: "Tooling & Infra",
                                items: ["TypeScript strict mode", "ESLint + Prettier", "Vercel 배포", "Supabase Edge Functions"],
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

                {/* 06 ARCHITECTURE HIGHLIGHTS */}
                <section className="mb-24">
                    <SectionHeader num="06" title="Architecture Highlights" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "문서 편집기",
                                desc: "Tiptap 기반 리치 텍스트 편집기에 SI 문서 템플릿(작업개요·제안서 등)을 연결. AI 보조 작성 기능 탑재.",
                            },
                            {
                                title: "DDD 도메인 캔버스",
                                desc: "바운디드 컨텍스트·애그리게이트·이벤트 스토밍을 시각적 캔버스로 관리. 개발-비즈니스 정렬 추적.",
                            },
                            {
                                title: "RTM + 손익",
                                desc: "요구사항과 개발 태스크를 매핑하는 RTM 자동 생성. 자원 배정 기반 손익 계산 및 SLA 모니터링.",
                            },
                        ].map((arch, i) => (
                            <div key={i} className="p-6 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">{arch.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{arch.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 07 MY ROLE */}
                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "서비스 기획 · PRD · SI 문서 체계 단독 설계",
                            "Next.js 16 + React 19 풀스택 아키텍처 구성",
                            "Tiptap 기반 AI 보조 문서 편집기 구현",
                            "DDD 도메인 캔버스 시각화 컴포넌트 개발",
                            "RTM·자원·손익·SLA 모듈 설계 및 구현",
                            "Supabase RLS + TanStack Query 실시간 상태 관리",
                        ].map((role, i) => (
                            <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                                <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                <span className="text-gray-800">{role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 08 PROGRESS & WHAT'S NEXT */}
                <section>
                    <SectionHeader num="08" title="Progress & What's Next" />
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                        {[
                            { title: "프로젝트 대시보드 및 핵심 기능 완성" },
                            { title: "SI 문서 6종 편집기 완성 (Tiptap)" },
                            { title: "DDD 캔버스 + RTM 모듈 완성" },
                            { title: "Claude AI 에이전트 기반 문서 자동 생성 고도화 예정" },
                            { title: "실제 SI 기업 파일럿 도입 협의 중" },
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

export default UpflowAxPage

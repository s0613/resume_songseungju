"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const UpflowAxPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative h-[500px] w-full">
                <Image src="/UpflowAx/upflow_dashboard.png" alt="Upflow AX 대시보드" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Upflow AX</h1>
                    <p className="text-lg text-white max-w-3xl">SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지 하나의 워크스페이스</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Tiptap"].map((t) => (
                            <Badge key={t} className="bg-white/20 text-white hover:bg-white/30">{t}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Upflow AX는 SI(시스템통합) 사업의 수주·기획·개발·정산까지 전 과정을 한 플랫폼에서 관리하는 사업관리 툴입니다.
                            제안서·WBS·요구사항 등 6종 SI 산출 문서를 AI 보조로 작성하고,
                            DDD 도메인 캔버스·RTM·자원 배정·손익·SLA 모니터링을 통합 제공합니다.
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
                                프로젝트 대시보드, 문서 편집기(Tiptap), 도메인 맵(DDD 캔버스),
                                요구사항 추적 매트릭스(RTM), 자원·일정 관리, 손익 분석, SLA 대시보드를
                                React 19와 Next.js 16 App Router 기반으로 구현했습니다.
                            </p>
                        </div>
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image src="/UpflowAx/upflow_features.png" alt="Upflow AX 기능" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        SI 기업은 제안서·착수 보고·WBS·요구사항·결과 보고 등 수십 종의 문서를 각기 다른 툴(Word·Excel·PPT)로 관리합니다.
                        프로젝트 진행 중 문서·이슈·자원·손익이 파편화되어 PM은 통합 현황 파악에 많은 시간을 씁니다.
                    </p>
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/UpflowAx/upflow_dashboard.png" alt="Upflow AX 대시보드" fill className="object-cover object-top" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                SI 문서 6종(작업개요·제안서·요구사항·WBS·데모·결과보고서)을 AI 보조로 작성하고
                                프로젝트 대시보드에서 진행률·자원·손익을 실시간 모니터링합니다.
                                DDD 도메인 캔버스와 RTM으로 개발-비즈니스 요구사항 정렬도 추적합니다.
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
                                    "SI 산출 문서 6종 AI 보조 편집기 (Tiptap 기반)",
                                    "DDD 도메인 캔버스 — 바운디드 컨텍스트 시각화",
                                    "RTM(요구사항 추적 매트릭스) 자동 생성·관리",
                                    "프로젝트별 자원 배정·일정·마일스톤 관리",
                                    "손익 분석 및 SLA 모니터링 대시보드",
                                    "TanStack Query + Supabase RLS 실시간 상태 동기화",
                                    "Tailwind v4 + shadcn/ui 기반 통합 UI 시스템",
                                ].map((f, i) => (
                                    <li key={i} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-3 relative h-[420px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/UpflowAx/upflow_overview.png" alt="Upflow AX 오버뷰" fill className="object-cover object-top" />
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
                        <span className="mr-2">Architecture Highlights</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
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
                        ].map((arch) => (
                            <div key={arch.title} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">{arch.title}</h3>
                                <p className="text-gray-600">{arch.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">My Role & Contributions</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "서비스 기획 · PRD · SI 문서 체계 단독 설계",
                            "Next.js 16 + React 19 풀스택 아키텍처 구성",
                            "Tiptap 기반 AI 보조 문서 편집기 구현",
                            "DDD 도메인 캔버스 시각화 컴포넌트 개발",
                            "RTM·자원·손익·SLA 모듈 설계 및 구현",
                            "Supabase RLS + TanStack Query 실시간 상태 관리",
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
                            { title: "프로젝트 대시보드 및 핵심 기능 완성", icon: "✅" },
                            { title: "SI 문서 6종 편집기 완성 (Tiptap)", icon: "📄" },
                            { title: "DDD 캔버스 + RTM 모듈 완성", icon: "🗺️" },
                            { title: "Claude AI 에이전트 기반 문서 자동 생성 고도화 예정", icon: "🤖" },
                            { title: "실제 SI 기업 파일럿 도입 협의 중", icon: "🏢" },
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

export default UpflowAxPage

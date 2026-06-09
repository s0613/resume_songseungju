"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const TotaroCosPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative h-[500px] w-full">
                <Image src="/TotaroCos/totarocos_hero.webp" alt="Totaro Cos 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Totaro Cos</h1>
                    <p className="text-lg text-white max-w-3xl">해외 바이어와 한국 화장품 공급사를 연결하는 K-Beauty B2B 소싱 플랫폼</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {["Next.js", "Supabase", "Google Gemini", "Tailwind CSS", "MFDS 데이터", "Playwright"].map((t) => (
                            <Badge key={t} className="bg-white/20 text-white hover:bg-white/30">{t}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Totaro Cos는 글로벌 K-Beauty 바이어와 한국 화장품·뷰티 공급업체를 연결하는 B2B 소싱 플랫폼입니다.
                            식약처(MFDS)·네이버 데이터 파이프라인으로 상품 DB를 구축하고,
                            AI 채팅 기반 상담·견적부터 주문·정산까지 하나의 플랫폼에서 처리합니다.
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
                                바이어용 마켓플레이스(상품 검색·AI 채팅·견적 요청)와
                                공급업체용 대시보드(상품 등록·주문·정산 관리)를 한 코드베이스에서 운영합니다.
                                MFDS 공공 데이터와 네이버 쇼핑 크롤링으로 상품 마스터를 자동 구축합니다.
                            </p>
                        </div>
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image src="/TotaroCos/totarocos_market.webp" alt="Totaro Cos 마켓" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        K-Beauty 글로벌 인기에도 해외 바이어는 신뢰할 수 있는 한국 화장품 공급사를 찾기 어렵습니다.
                        공급사는 해외 유통 채널이 없어 OEM·ODM 수출 기회를 놓치고,
                        성분 규제·인증 정보를 다국어로 제공하는 B2B 채널도 부재합니다.
                    </p>
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/TotaroCos/totarocos_supplier.webp" alt="Totaro Cos 공급업체" fill className="object-cover object-top" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                MFDS 공공 데이터 파이프라인으로 성분·인증 정보를 자동화하고,
                                Gemini AI 채팅으로 성분 설명·규제 안내·견적을 다국어 실시간 제공합니다.
                                공급업체는 별도 해외 마케팅 없이 글로벌 바이어에게 노출됩니다.
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
                                    "MFDS→Naver→DB 화장품 데이터 파이프라인",
                                    "Gemini AI 기반 성분 설명·견적 채팅",
                                    "바이어·공급업체 역할 분리 대시보드",
                                    "OEM/ODM 상담 및 샘플 요청 플로우",
                                    "상품 등록·재고·주문·정산 통합 관리",
                                    "Supabase RLS 기반 역할별 데이터 접근 제어",
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
                            <Image src="/TotaroCos/totarocos_features.webp" alt="Totaro Cos 기능" fill className="object-cover object-top" />
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
                        <Image src="/TotaroCos/totarocos_overview.webp" alt="Totaro Cos 전체" fill className="object-cover object-top" />
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
                            "MFDS→Naver 데이터 파이프라인 설계 및 구현",
                            "Next.js 풀스택 개발 (바이어 마켓, 공급업체 대시보드)",
                            "Gemini AI 성분 설명·OEM/ODM 견적 채팅 구현",
                            "Supabase RLS 기반 역할별 권한 시스템 설계",
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
                            { title: "MFDS 데이터 파이프라인 자동화 완성", icon: "🏭" },
                            { title: "Gemini AI 성분·견적 채팅 완성", icon: "🤖" },
                            { title: "실제 K-Beauty 공급사 파일럿 온보딩 검토", icon: "💄" },
                            { title: "성분 다국어 번역·규제 가이드 확장 예정", icon: "🌏" },
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

export default TotaroCosPage

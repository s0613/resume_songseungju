"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const CurlCodePage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <section className="relative h-[500px] w-full">
                <Image src="/CurlCode/curlcodeOverview.png" alt="Curl CODE 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Curl CODE</h1>
                    <p className="text-lg text-white max-w-3xl">곱슬머리 유형 진단부터 맞춤 관리 루틴까지 제공하는 AI 헤어케어 컨설팅 웹앱</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {["Next.js", "TypeScript", "Supabase", "Recharts", "Playwright"].map((t) => (
                            <Badge key={t} className="bg-white/20 text-white hover:bg-white/30">{t}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Curl CODE는 곱슬머리 고객의 헤어 특성을 진단하고 맞춤형 관리 루틴을 제안하는 컨설팅 웹앱입니다.
                            고객용·디자이너용 설문을 분리해 두 관점의 데이터를 수집하고, Density·Porosity·Elasticity 등
                            5가지 지표로 개인 Curl CODE를 산출합니다. 결과 리포트는 Recharts 레이더 차트로 시각화하고
                            공유·편집 기능을 제공합니다.
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
                                언어 선택 → 온보딩 정보 입력 → 고객/디자이너 설문 → AI 분석 → 결과 리포트 순서로
                                완전한 온보딩 플로우를 설계했습니다. Supabase로 사용자 인증과 결과 저장을 처리하며,
                                한국어·영어 다국어를 지원합니다.
                            </p>
                        </div>
                        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image src="/CurlCode/curlcodeHero.png" alt="Curl CODE 언어 선택" fill className="object-contain bg-[#f5ede8]" />
                        </div>
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        곱슬머리 관리는 모발의 밀도·탄력·다공성 등 개인마다 다른 특성에 맞춰야 효과적입니다.
                        하지만 기존 헤어 상담은 디자이너의 주관적 판단에 의존하고, 고객은 자신의 모발 특성을 체계적으로
                        파악할 방법이 없었습니다. 진단 결과를 기록하고 다음 방문까지 루틴으로 이어줄 수단도 부재했습니다.
                    </p>
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/CurlCode/curlcodeSolution.png" alt="Curl CODE 설문" fill className="object-contain bg-[#f5ede8]" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4" />
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                고객용·디자이너용 설문을 분리하여 각 관점의 데이터를 수집합니다.
                                수집된 데이터를 5가지 지표(Density, Porosity, Elasticity, Volume, Frizz)로 환산해
                                개인 Curl CODE를 산출하고, 레이더 차트로 한눈에 시각화합니다.
                                결과는 저장·공유·편집이 가능해 다음 방문 시 연속성 있는 케어가 가능합니다.
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
                                    "고객용·디자이너용 설문 분리 수집",
                                    "5가지 지표 기반 개인 Curl CODE 산출",
                                    "Recharts 레이더 차트 결과 시각화",
                                    "결과 리포트 공유·편집 기능",
                                    "한국어·영어 다국어(i18n) 지원",
                                    "Supabase 인증 및 결과 저장",
                                    "Playwright E2E 테스트",
                                ].map((f, i) => (
                                    <li key={i} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-3 relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                            <Image src="/CurlCode/curlcodeFeatures.png" alt="Curl CODE 기능" fill className="object-contain bg-[#f5ede8]" />
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
                                items: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "Recharts"],
                            },
                            {
                                title: "Backend & Data",
                                items: ["Supabase (Auth + DB)", "Google Apps Script (초기 데이터)", "다국어 i18n"],
                            },
                            {
                                title: "Testing & DevOps",
                                items: ["Playwright E2E", "Vercel 배포", "Supabase SSR"],
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
                        <span className="mr-2">Result Preview</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <Image src="/CurlCode/curlcodeArchitecture.png" alt="Curl CODE 결과 리포트" fill className="object-contain bg-[#cd7f5e]" />
                    </div>
                </section>

                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">My Role & Contributions</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "서비스 기획 및 온보딩 플로우 전체 설계",
                            "Next.js 풀스택 개발 (설문, 온보딩, 결과 리포트)",
                            "Curl CODE 지표 알고리즘 설계 및 구현",
                            "Recharts 레이더 차트 시각화 구현",
                            "Supabase 인증 및 결과 저장 구조 설계",
                            "Playwright E2E 테스트로 핵심 플로우 검증",
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
                            { title: "고객·디자이너 설문 플로우 완성", icon: "✅" },
                            { title: "Curl CODE 지표 산출 및 시각화 완성", icon: "📊" },
                            { title: "결과 리포트 공유·편집 기능 구현", icon: "🔗" },
                            { title: "실제 헤어살롱 파일럿 적용 검토 중", icon: "💇" },
                            { title: "디자이너용 고객 관리 대시보드 예정", icon: "🗂️" },
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

export default CurlCodePage

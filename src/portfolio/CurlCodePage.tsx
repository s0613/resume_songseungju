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

const CurlCodePage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            <section className="relative h-[72vh] w-full">
                <Image src="/CurlCode/curlcodeOverview.webp" alt="Curl CODE 히어로" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        Hair Care · AI · Web App
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        Curl CODE
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        곱슬머리 유형 진단부터 맞춤 관리 루틴까지 제공하는 AI 헤어케어 컨설팅 웹앱
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js", "TypeScript", "Supabase", "Recharts", "Playwright"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Curl CODE는 곱슬머리 고객의 헤어 특성을 진단하고 맞춤형 관리 루틴을 제안하는 컨설팅 웹앱입니다.
                        고객용·디자이너용 설문을 분리해 두 관점의 데이터를 수집하고, Density·Porosity·Elasticity 등
                        5가지 지표로 개인 Curl CODE를 산출합니다. 결과 리포트는 Recharts 레이더 차트로 시각화하고
                        공유·편집 기능을 제공합니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            언어 선택 → 온보딩 정보 입력 → 고객/디자이너 설문 → AI 분석 → 결과 리포트 순서로
                            완전한 온보딩 플로우를 설계했습니다. Supabase로 사용자 인증과 결과 저장을 처리하며,
                            한국어·영어 다국어를 지원합니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/CurlCode/curlcodeHero.webp" alt="Curl CODE 언어 선택" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            곱슬머리 관리는 모발의 밀도·탄력·다공성 등 개인마다 다른 특성에 맞춰야 효과적입니다.
                            하지만 기존 헤어 상담은 디자이너의 주관적 판단에 의존하고, 고객은 자신의 모발 특성을 체계적으로
                            파악할 방법이 없었습니다. 진단 결과를 기록하고 다음 방문까지 루틴으로 이어줄 수단도 부재했습니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/CurlCode/curlcodeSolution.webp" alt="Curl CODE 설문" fill className="object-cover object-top" />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            고객용·디자이너용 설문을 분리하여 각 관점의 데이터를 수집합니다.
                            수집된 데이터를 5가지 지표(Density, Porosity, Elasticity, Volume, Frizz)로 환산해
                            개인 Curl CODE를 산출하고, 레이더 차트로 한눈에 시각화합니다.
                            결과는 저장·공유·편집이 가능해 다음 방문 시 연속성 있는 케어가 가능합니다.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/CurlCode/curlcodeFeatures.webp" alt="Curl CODE 기능" fill className="object-cover object-top" />
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
                    <SectionHeader num="06" title="Result Preview" />
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                        <Image src="/CurlCode/curlcodeArchitecture.webp" alt="Curl CODE 결과 리포트" fill className="object-contain bg-[#cd7f5e]" />
                    </div>
                </section>

                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "서비스 기획 및 온보딩 플로우 전체 설계",
                            "Next.js 풀스택 개발 (설문, 온보딩, 결과 리포트)",
                            "Curl CODE 지표 알고리즘 설계 및 구현",
                            "Recharts 레이더 차트 시각화 구현",
                            "Supabase 인증 및 결과 저장 구조 설계",
                            "Playwright E2E 테스트로 핵심 플로우 검증",
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
                            { title: "고객·디자이너 설문 플로우 완성" },
                            { title: "Curl CODE 지표 산출 및 시각화 완성" },
                            { title: "결과 리포트 공유·편집 기능 구현" },
                            { title: "실제 헤어살롱 파일럿 적용 검토 중" },
                            { title: "디자이너용 고객 관리 대시보드 예정" },
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

export default CurlCodePage

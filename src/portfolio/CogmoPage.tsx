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

const CogmoPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[72vh] w-full">
                <Image src="/Cogmo/cogmoHero.webp" alt="Cogmo 히어로 이미지" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        Healthcare · AI · Mobile
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        Cogmo 안녕
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        고령자를 위한 AI 기반 인지건강 측정 및 관리 플랫폼
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Flutter", "Spring Boot", "AWS", "Gemini AI", "PostgreSQL", "WebSocket"].map(t => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Wrapper */}
            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">

                {/* Intro Paragraph */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Cogmo 안녕은 고령자의 인지건강을 평가하고 모니터링하는 종합 헬스케어 플랫폼입니다.
                        15문항 인지기능 테스트를 통해 주의력, 기억력, 판단력, 시공간능력, 언어능력, 실행기능 등
                        6개 영역을 측정하고, AI가 맞춤형 피드백과 PDF 리포트를 생성합니다.
                        보호자는 대시보드를 통해 실시간으로 가족의 인지건강 상태를 모니터링할 수 있습니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                {/* 01 Overview */}
                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Cogmo 안녕은 모바일 앱, 보호자 대시보드, 백엔드 서버로 구성된 풀스택 헬스케어 플랫폼입니다.
                            사용자는 Flutter 앱을 통해 간편하게 인지기능 테스트를 수행하고,
                            Gemini AI가 분석한 맞춤형 피드백을 받을 수 있습니다.
                            보호자는 Next.js 대시보드에서 실시간으로 가족의 검사 결과를 확인할 수 있습니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Cogmo/cogmoOverview.webp"
                                alt="Cogmo 서비스 개요"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                    </div>
                </section>

                {/* 02 Problem */}
                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
                    <div className="pl-8 border-l-2 border-gray-900">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            고령화 사회에서 치매 및 인지기능 저하는 중요한 사회적 문제입니다.
                            기존의 인지기능 검사는 병원 방문이 필요하고, 결과를 가족과 공유하기 어려우며,
                            정기적인 추적 관리가 불편합니다. 특히 바쁜 자녀들이 부모의 인지건강 상태를
                            파악하기 어려운 상황입니다.
                        </p>
                    </div>
                </section>

                {/* 03 Solution */}
                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Cogmo/cogmoSolution.webp"
                                alt="Cogmo 솔루션"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Cogmo 안녕은 모바일 앱을 통해 언제 어디서나 간편하게 인지기능 테스트를 수행할 수 있습니다.
                            AI가 테스트 결과를 분석하여 맞춤형 피드백을 제공하고, 보호자 대시보드를 통해
                            가족 구성원이 실시간으로 부모의 인지건강 상태를 확인할 수 있습니다.
                            정기적인 리마인드 알림으로 지속적인 인지건강 관리를 돕습니다.
                        </p>
                    </div>
                </section>

                {/* 04 Main Features */}
                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ul className="space-y-4">
                            {[
                                "6개 영역 인지기능 테스트 (주의력, 기억력, 판단력, 시공간능력, 언어능력, 실행기능)",
                                "Gemini AI 기반 맞춤형 피드백 및 조언 제공",
                                "테스트 결과 PDF 리포트 자동 생성",
                                "WebSocket 기반 실시간 보호자 대시보드",
                                "Google, Kakao, Apple 소셜 로그인 지원",
                                "정기 검사 리마인드 푸시 알림",
                            ].map((f, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Cogmo/cogmoFeatures.webp"
                                alt="Cogmo 주요 기능"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                    </div>
                </section>

                {/* 05 Tech Stack */}
                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Mobile App",
                                items: ["Flutter 3.9.2", "Dart", "Google Sign-In", "Kakao Sign-In", "Apple Sign-In"],
                            },
                            {
                                title: "Guardian Dashboard",
                                items: ["Next.js 15", "React 19", "Recharts", "Shadcn/UI", "Tailwind CSS", "Capacitor"],
                            },
                            {
                                title: "Backend & Cloud",
                                items: ["Java 21", "Spring Boot 3.1", "PostgreSQL", "Redis", "WebSocket", "AWS EC2", "AWS S3", "AWS SNS", "AWS SES", "Gemini AI", "iText PDF"],
                            },
                        ].map(group => (
                            <div key={group.title}>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{group.title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map(item => (
                                        <span key={item} className="px-3 py-1.5 bg-white text-gray-800 text-sm font-mono border border-gray-200 rounded">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 06 System Architecture */}
                <section className="mb-24">
                    <SectionHeader num="06" title="System Architecture" />
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src="/Cogmo/cogmoArchitecture.webp"
                            alt="Cogmo 시스템 아키텍처"
                            fill
                            className="object-contain bg-gray-50"
                        />
                    </div>
                </section>

                {/* 07 My Role */}
                <section className="mb-24">
                    <SectionHeader num="07" title="My Role & Contributions" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "전체 시스템 아키텍처 설계 및 API 명세서 작성",
                            "Spring Boot 백엔드 개발 (인증, 테스트, AI 연동, PDF 생성)",
                            "Flutter 모바일 앱 UX 개선",
                            "Next.js 보호자 대시보드 개발 (실시간 모니터링)",
                            "AWS 인프라 구축 및 배포 자동화",
                            "Gemini AI 프롬프트 엔지니어링",
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
                            { title: "MVP 개발 완료 및 내부 테스트 진행" },
                            { title: "AWS 인프라 구축 및 CI/CD 파이프라인 구성" },
                            { title: "API 명세서 및 기술 문서화 완료" },
                            { title: "베타 테스트 및 사용자 피드백 수집 예정" },
                            { title: "인지훈련 게임 모듈 추가 개발 예정" },
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

export default CogmoPage

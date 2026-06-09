"use client"

import type React from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-start gap-4 mb-10">
        <span className="text-8xl font-extralight leading-none text-gray-200 select-none mt-1 hidden sm:block">{num}</span>
        <div className="pt-1 sm:pt-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
            <div className="h-0.5 bg-gray-900 mt-2.5 w-10" />
        </div>
    </div>
)

const TrynicPage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[72vh] w-full">
                <Image src="/Trynic/trynicHero.webp" alt="Trynic 히어로 이미지" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        Fashion · AI · Video Generation
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-none">Trynic</h1>
                        <a
                            href="https://trynicai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-white transition-colors"
                            aria-label="Trynic 웹사이트 방문"
                        >
                            <ExternalLink className="h-7 w-7 md:h-9 md:w-9" />
                        </a>
                    </div>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        패션 중소기업을 위한 AI 영상 생성 플랫폼
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js", "Spring Boot", "AWS", "Image-to-Video", "Prompt Tuning"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
                {/* Intro */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        Trynic은 패션 중소기업을 위한 AI 영상 생성 플랫폼으로, 누구나 모델을 선택하고 자사 의류 이미지를 입힌 후,
                        레퍼런스 영상을 기반으로 자신만의 패션 영상을 만들 수 있는 서비스입니다. 기존의 영상 제작 비용과 시간이
                        부담되던 소규모 브랜드들도 이 플랫폼을 통해 손쉽게 마케팅 콘텐츠를 제작할 수 있도록 돕습니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                {/* 01 Overview */}
                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Trynic은 AI 영상 기술을 활용하여 실제 모델에 옷을 입히고, 기존 영상 스타일을 레퍼런스로 활용해
                            새로운 콘텐츠를 만들 수 있도록 지원합니다. 이를 통해 사용자는 비용과 시간의 부담 없이 마케팅 콘텐츠를
                            꾸준히 제작할 수 있습니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Trynic/trynicdetail.webp"
                                alt="Trynic 서비스 상세"
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
                            패션 중소기업들은 제품을 홍보하기 위한 고퀄리티 영상 콘텐츠를 제작하기 위해 높은 비용과 시간이 소요되는
                            문제를 겪고 있습니다. 특히 모델 섭외, 촬영, 편집 등은 물리적인 제약이 많아 지속적인 콘텐츠 생산이
                            어려웠습니다.
                        </p>
                    </div>
                </section>

                {/* 03 Solution */}
                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Trynic/fash_change.webp"
                                alt="Trynic 패션 변환 예시"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Trynic은 모델 이미지와 의류 이미지, 영상 스타일을 결합하여 마케팅에 활용할 수 있는 콘텐츠를 제작할 수 있게 도와줍니다.
                            복잡한 촬영 과정을 단순화하고, 브랜드가 원하는 스타일로 손쉽게 영상 콘텐츠를 구성할 수 있도록 설계되었습니다.
                        </p>
                    </div>
                </section>

                {/* 04 Main Features */}
                <section className="mb-24">
                    <SectionHeader num="04" title="Main Features" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ul className="space-y-4">
                            {[
                                "모델 선택 및 AI 의상 입히기 기능",
                                "레퍼런스 영상을 기반으로 한 스타일 선택",
                                "프롬프트 및 의류 이미지 입력을 통한 영상 제작",
                                "완성된 영상 다운로드 및 소셜 미디어 공유",
                            ].map((f, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                    <span className="leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/Trynic/trynicgeneration.webp"
                                alt="Trynic AI 영상 생성 프로세스"
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
                            { title: "Frontend", items: ["Next.js", "Tailwind CSS", "Shadcn/UI"] },
                            { title: "Backend & AI", items: ["Spring Boot", "JPA", "Fal.ai image-to-video API"] },
                            { title: "Infra", items: ["AWS EC2", "S3", "CloudFront", "Nginx"] },
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

                {/* 06 Traction & Field Activities */}
                <section className="mb-24">
                    <SectionHeader num="06" title="Traction & Field Activities" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "서비스 테스트와 검증을 위해 예비창업패키지에 신청하여 선정되었습니다.",
                                "SURF 창업 박람회에 참가하여 실제 고객과 투자자를 만나 적극적으로 활동했습니다.",
                            ].map((role, i) => (
                                <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                                    <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-gray-800">{role}</span>
                                </div>
                            ))}
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image src="/Trynic/surf.webp" alt="SURF 창업 박람회 현장" fill className="object-cover object-center rotate-90" />
                        </div>
                    </div>
                </section>

                {/* 07 Progress & What's Next */}
                <section>
                    <SectionHeader num="07" title="Progress & What's Next" />
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                        {[
                            { title: "Launch Pad 창업경진대회 최우수상, 기업가 정신 재단상 수상" },
                            { title: "중소벤처기업부 예비창업패키지 선정 (서비스 테스트 및 검증)" },
                            { title: "SURF 창업 박람회 참가, 고객·투자자 미팅 및 피드백 수집" },
                            { title: "AI 영상 퀄리티 향상 및 사용자 프롬프트 커스터마이징 기능 개발 예정" },
                            { title: "실제 패션 중소기업 대상 베타 테스트 준비 중" },
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

export default TrynicPage

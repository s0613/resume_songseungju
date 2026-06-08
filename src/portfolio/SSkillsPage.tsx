"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const SSkillsPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative h-[500px] w-full">
                <Image src="/s-skills-hero.png" alt="S-skills 히어로 이미지" fill className="object-cover object-center" priority />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">S-skills</h1>
                    <p className="text-lg text-white max-w-3xl">혼자 일하는 개발자의 팀 — Claude Code 역할 기반 AI 개발 오케스트레이터</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Claude Code</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">TypeScript</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Multi-Agent</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Open Source</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">MIT</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Introduction */}
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            S-skills는 Claude Code 플러그인 형태로 배포되는 <strong>역할 기반 AI 개발 오케스트레이터</strong>입니다.
                            기획자, 디자이너, 개발자, QA, 보안 전문가가 Claude Code 안에 에이전트로 존재하며,
                            태스크를 말로 설명하면 필요한 전문가가 자동으로 투입됩니다.
                            요구사항 분석부터 설계, 구현, 리뷰, 배포까지 — 혼자서도 팀처럼 일할 수 있는 개발 환경을 제공합니다.
                        </p>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Overview */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Overview</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/sj-company 로그인 기능 만들어줘</code> 한 줄이면
                                PM이 요구사항을 분석하고, Tech Lead가 필요한 전문가를 병렬로 디스패치합니다.
                                Database → Backend + Security 병렬 → Frontend 순으로 자동 조율되며,
                                각 에이전트는 팀 채널을 통해 직접 소통합니다.
                            </p>
                            <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono">
                                <p className="text-green-400">$ /sj-company 로그인 기능 만들어줘</p>
                                <p className="text-gray-300 mt-2">[Medium] "로그인 기능 만들어줘"</p>
                                <p className="text-gray-300">필요한 역할: database, backend, security, frontend</p>
                                <p className="text-gray-300">디스패치 순서: 1) database</p>
                                <p className="text-gray-300">{"                  2) backend + security 병렬"}</p>
                                <p className="text-gray-300">{"                  3) frontend"}</p>
                            </div>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/s-skills-hero.png"
                                alt="S-skills 개요"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Problem */}
                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "혼자서 모든 역할",
                                description: "1인 개발자나 소규모 팀은 기획, 설계, 개발, QA, 보안을 혼자 담당해야 해 각 분야의 전문성이 부족해지기 쉽습니다.",
                            },
                            {
                                title: "AI 도구의 일관성 부재",
                                description: "Claude에게 매번 역할을 지정하고 맥락을 설명해야 하며, 전문가 수준의 협업 프로토콜이 없어 결과물의 품질이 일정하지 않습니다.",
                            },
                            {
                                title: "디자인 방향 누적 불가",
                                description: "거부한 디자인 방향이 기억되지 않아 같은 실수가 반복되고, 브랜드 정체성이 세션마다 흐려집니다.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Solution */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Solution</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-6">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Claude Code의 Skills 시스템을 활용해 PM, Design, Tech Lead, Frontend, Backend, Security, QA
                                7개 전문가 역할을 에이전트로 구현했습니다. 각 역할은 독립적인 스킬 파일로 정의되며,
                                sj-company가 태스크 복잡도를 분석해 적절한 전문가를 자동 라우팅합니다.
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    "팀 채널 기반 에이전트 간 직접 조율 — Tech Lead 없이도 소통",
                                    "거부 프로토콜로 디자인 방향 누적 — DESIGN.md에 브랜드 정체성 축적",
                                    "QA 독립성 보장 — 구현자 산출물 참조 없이 PM 브리프 기반 독립 검증",
                                    "OWASP + STRIDE 보안 감사 자동화 (/cso)",
                                    "테스트 → 커버리지 → PR 원스톱 릴리즈 자동화 (/ship)",
                                    "막혔을 때 PII 마스킹 맥락 리포트 + 메일 초안 자동 작성 (/outsource)",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">주요 커맨드</h3>
                            <div className="space-y-3">
                                {[
                                    { cmd: "/sj-company", desc: "모든 것의 시작점 — 자동 라우팅" },
                                    { cmd: "/spec", desc: "모호한 의도 → 5단계 정밀 명세" },
                                    { cmd: "/design", desc: "레퍼런스 브랜드 DNA 기반 UI 설계" },
                                    { cmd: "/investigate", desc: "가설 수립 → 검증 강제 디버깅" },
                                    { cmd: "/cso", desc: "OWASP + STRIDE 보안 감사" },
                                    { cmd: "/ship", desc: "테스트 → 커버리지 → PR 자동화" },
                                    { cmd: "/outsource", desc: "막혔을 때 전문가 위임" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                                        <code className="text-sm font-mono text-gray-900 font-semibold w-36 shrink-0">{item.cmd}</code>
                                        <span className="text-sm text-gray-600">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Key Features</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "전문가 수준의 협업 프로토콜",
                                description: "서브에이전트들은 Tech Lead를 거치지 않고 팀 채널에서 직접 조율합니다. Database가 \"nullable 컬럼 주의\"를 게시하면 Backend가 직접 읽고 처리합니다.",
                            },
                            {
                                title: "취향이 쌓이는 디자인 시스템",
                                description: "거부한 방향은 봉인되고, 승인한 방향은 누적됩니다. 시간이 지날수록 브랜드 정체성이 선명해지며 레퍼런스 DNA를 추출해 그 브랜드처럼 보이는 디자인을 만듭니다.",
                            },
                            {
                                title: "QA 독립성 보장",
                                description: "QA는 구현자가 작성한 요약 문서를 읽지 않습니다. PM 브리프와 실제 파일을 직접 탐색해 편향 없이 검증합니다.",
                            },
                            {
                                title: "claude plugin install 한 줄 설치",
                                description: "claude plugin install s0613/S-skills 한 줄로 설치 완료. 설치 후 어느 프로젝트에서나 /sj-company로 바로 시작할 수 있습니다.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Core Roles */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Core Roles</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { role: "PM", desc: "요구사항 분석, 리스크 검토, 우선순위 정의" },
                            { role: "Design", desc: "레퍼런스 DNA 기반 UI 설계, AI 티 제거 검수" },
                            { role: "Tech Lead", desc: "전문 서브에이전트 병렬 디스패치 + 결과 통합" },
                            { role: "Frontend", desc: "UI·컴포넌트·접근성·반응형 구현" },
                            { role: "Backend", desc: "API·서버·도메인 로직 구현" },
                            { role: "Security", desc: "OWASP Top 10 + STRIDE 구현 + cross-cutting 리뷰" },
                            { role: "QA", desc: "독립 검증 — 구현자 산출물 참조 없이 직접 탐색" },
                            { role: "Secretary", desc: "일정·문서·커뮤니케이션 자동화" },
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-1">{item.role}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="my-12" />

                {/* My Role */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">My Role</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "스킬 시스템 설계 및 구현",
                                items: [
                                    "Claude Code Skills 기반 역할 정의 아키텍처 설계",
                                    "sj-company 자동 라우팅 로직 구현",
                                    "팀 채널 기반 에이전트 간 직접 조율 프로토콜 설계",
                                    "v1.0 → v3.1.0 지속적 업그레이드 및 유지보수",
                                    "claude plugin install 배포 파이프라인 구축",
                                ],
                            },
                            {
                                title: "전문 에이전트 프롬프트 엔지니어링",
                                items: [
                                    "PM·Design·Tech Lead·QA 에이전트 역할 명세 작성",
                                    "거부 프로토콜 및 디자인 DNA 누적 메커니즘 구현",
                                    "QA 독립성 보장 프로토콜 설계",
                                    "OWASP + STRIDE 보안 감사 자동화 스킬 구현",
                                    "/outsource PII 마스킹 + 맥락 리포트 자동화",
                                ],
                            },
                        ].map((role, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{role.title}</h3>
                                <ul className="space-y-2">
                                    {role.items.map((item, i) => (
                                        <li key={i} className="flex items-start text-gray-700">
                                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SSkillsPage

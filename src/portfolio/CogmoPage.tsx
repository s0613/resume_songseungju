"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink } from "lucide-react"

const CogmoPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero section with overlay text */}
            <section className="relative h-[500px] w-full">
                <Image src="/Cogmo/cogmoHero.png" alt="Cogmo 히어로 이미지" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Cogmo 안녕</h1>
                    </div>
                    <p className="text-lg text-white max-w-3xl">고령자를 위한 AI 기반 인지건강 측정 및 관리 플랫폼</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Flutter</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Spring Boot</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">AWS</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Gemini AI</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">PostgreSQL</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">WebSocket</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Introduction */}
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Cogmo 안녕은 고령자의 인지건강을 평가하고 모니터링하는 종합 헬스케어 플랫폼입니다.
                            15문항 인지기능 테스트를 통해 주의력, 기억력, 판단력, 시공간능력, 언어능력, 실행기능 등
                            6개 영역을 측정하고, AI가 맞춤형 피드백과 PDF 리포트를 생성합니다.
                            보호자는 대시보드를 통해 실시간으로 가족의 인지건강 상태를 모니터링할 수 있습니다.
                        </p>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Overview Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Overview</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Cogmo 안녕은 모바일 앱, 보호자 대시보드, 백엔드 서버로 구성된 풀스택 헬스케어 플랫폼입니다.
                                사용자는 Flutter 앱을 통해 간편하게 인지기능 테스트를 수행하고,
                                Gemini AI가 분석한 맞춤형 피드백을 받을 수 있습니다.
                                보호자는 Next.js 대시보드에서 실시간으로 가족의 검사 결과를 확인할 수 있습니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/Cogmo/cogmoOverview.png"
                                alt="Cogmo 서비스 개요"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            고령화 사회에서 치매 및 인지기능 저하는 중요한 사회적 문제입니다.
                            기존의 인지기능 검사는 병원 방문이 필요하고, 결과를 가족과 공유하기 어려우며,
                            정기적인 추적 관리가 불편합니다. 특히 바쁜 자녀들이 부모의 인지건강 상태를
                            파악하기 어려운 상황입니다.
                        </p>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/Cogmo/cogmoSolution.png"
                                alt="Cogmo 솔루션"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Cogmo 안녕은 모바일 앱을 통해 언제 어디서나 간편하게 인지기능 테스트를 수행할 수 있습니다.
                                AI가 테스트 결과를 분석하여 맞춤형 피드백을 제공하고, 보호자 대시보드를 통해
                                가족 구성원이 실시간으로 부모의 인지건강 상태를 확인할 수 있습니다.
                                정기적인 리마인드 알림으로 지속적인 인지건강 관리를 돕습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Features Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Main Features</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        <div className="lg:col-span-2 space-y-6">
                            <ul className="space-y-4">
                                {[
                                    "6개 영역 인지기능 테스트 (주의력, 기억력, 판단력, 시공간능력, 언어능력, 실행기능)",
                                    "Gemini AI 기반 맞춤형 피드백 및 조언 제공",
                                    "테스트 결과 PDF 리포트 자동 생성",
                                    "WebSocket 기반 실시간 보호자 대시보드",
                                    "Google, Kakao, Apple 소셜 로그인 지원",
                                    "정기 검사 리마인드 푸시 알림",
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-3 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/Cogmo/cogmoFeatures.png"
                                alt="Cogmo 주요 기능"
                                fill
                                className="object-contain bg-gray-50"
                            />
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">Tech Stack & Architecture</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Mobile App (Flutter)</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Flutter 3.9.2, Dart</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Google, Kakao, Apple Sign-In</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>iOS / Android 크로스플랫폼</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Guardian Dashboard</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Next.js 15, React 19</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Recharts, Shadcn/UI</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Tailwind CSS, Capacitor</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Backend & Cloud</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Java 21, Spring Boot 3.1</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>PostgreSQL, Redis, WebSocket</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>AWS (EC2, S3, SNS, SES)</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Gemini AI, iText PDF</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Architecture Diagram Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">System Architecture</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/Cogmo/cogmoArchitecture.png"
                            alt="Cogmo 시스템 아키텍처"
                            fill
                            className="object-contain bg-gray-50"
                        />
                    </div>
                </section>

                {/* My Role Section */}
                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-2">My Role & Contributions</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "전체 시스템 아키텍처 설계 및 API 명세서 작성",
                            "Spring Boot 백엔드 개발 (인증, 테스트, AI 연동, PDF 생성)",
                            "Flutter 모바일 앱 UX 개선",
                            "Next.js 보호자 대시보드 개발 (실시간 모니터링)",
                            "AWS 인프라 구축 및 배포 자동화",
                            "Gemini AI 프롬프트 엔지니어링",
                        ].map((role, index) => (
                            <div key={index} className="flex items-start">
                                <ArrowRight className="h-5 w-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-lg">{role}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Progress Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Progress & What&apos;s Next</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "MVP 개발 완료 및 내부 테스트 진행",
                                icon: "✅",
                            },
                            {
                                title: "AWS 인프라 구축 및 CI/CD 파이프라인 구성",
                                icon: "☁️",
                            },
                            {
                                title: "API 명세서 및 기술 문서화 완료",
                                icon: "📄",
                            },
                            {
                                title: "베타 테스트 및 사용자 피드백 수집 예정",
                                icon: "🔍",
                            },
                            {
                                title: "인지훈련 게임 모듈 추가 개발 예정",
                                icon: "🎮",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
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

export default CogmoPage

"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"

const RunningToYouPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero section with overlay text */}
            <section className="relative h-[500px] w-full">
                <Image src="/runningtoyou/hero.png" alt="RunningToYou 히어로 이미지" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RunningToYou</h1>
                    <p className="text-lg text-white max-w-2xl">러닝을 통해 자연스럽게 사람을 연결하는 데이팅 MVP 서비스</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Next.js</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">TypeScript</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Spring Boot</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">MariaDB</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">AWS EC2</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Overview Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Overview</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                RunningToYou는 운동이라는 공통된 행위를 통해 자연스럽게 서로를 알아가는 새로운 형태의 만남 서비스를
                                제안합니다. 기존 데이팅 앱의 과몰입 구조나 불편한 채팅 중심의 상호작용을 배제하고, &apos;함께 뛴다&apos;는 경험을
                                중심으로 관계를 쌓도록 설계했습니다.
                            </p>
                        </div>
                        <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center p-6">
                            <div className="relative w-[200px] h-[200px]">
                                <Image
                                    src="/runningtoyou/runningtoyouLogo.png"
                                    alt="RunningToYou 로고"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Problem & Solution Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Problem Card */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="mr-2">Problem</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                현재 대부분의 데이팅 앱은 사진 기반의 일방적인 판단, 과도한 채팅 중심 구조 등으로 인해 진정성 있는 관계
                                형성이 어렵고, 사용자 피로도가 높다는 문제가 있습니다. 특히 실외 활동 기반의 자연스러운 만남을 원하는
                                사용자층은 소외되고 있습니다.
                            </p>
                        </div>

                        {/* Solution Card */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="mr-2">Solution</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                RunningToYou는 러닝이라는 가벼운 활동을 기반으로, 비슷한 속도와 관심사를 가진 사람들을 매칭합니다.
                                정해진 러닝 시간 동안 함께 뛰고, 이후 선택적으로 관심 표현을 할 수 있어 부담 없이 자연스럽게 관계를
                                이어갈 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Image Section */}
                <section className="mb-20 bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">서비스 소개</h2>
                    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
                        <Image src="/runningtoyou/CTA.png" alt="RunningToYou 서비스 소개" fill className="object-contain" />
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Tech Stack & Architecture</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-6 text-gray-700">개발 스택</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">프론트엔드: Next.js + TypeScript</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">백엔드: Spring Boot + JPA</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">데이터베이스: MariaDB</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-6 text-gray-700">인프라 & 운영</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">배포: AWS EC2 + Nginx + HTTPS</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">운영: 수동 매칭 운영으로 초기 피드백 실험</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">CI/CD: GitHub Actions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Execution & Feedback Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <div className="text-6xl mb-4">🏃‍♂️ 🏃‍♀️</div>
                                    <p className="text-xl font-medium text-gray-700">함께 달리며 만나는 새로운 경험</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 order-1 md:order-2">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                <span className="mr-2">Execution & Feedback</span>
                                <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        총 4인의 팀 프로젝트로, 기획·백엔드 개발·배포·마케팅을 주도적으로 담당
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Everytime 게시판을 활용해 타겟 유저 대상 MVP 소개 및 유입 유도</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">매칭은 수동으로 운영하며 사용자의 자연스러운 반응 관찰 및 개선</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* What's Next Section */}
                <section className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">What&apos;s Next</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "알고리즘 기반 자동 매칭 기능 설계",
                                icon: "🤝",
                                description: "사용자의 러닝 속도, 선호 시간대, 관심사를 기반으로 한 자동 매칭 시스템 구현",
                            },
                            {
                                title: "커뮤니티 기능 도입",
                                icon: "📱",
                                description: "러닝 기록 공유 및 인증을 통한 커뮤니티 형성으로 서비스 지속성 강화",
                            },
                            {
                                title: "소규모 그룹 러닝 매칭 기능",
                                icon: "👥",
                                description: "1:1 매칭 외에도 소규모 그룹 러닝을 통한 다양한 만남 형태 제공",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                                <p className="text-gray-700 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default RunningToYouPage

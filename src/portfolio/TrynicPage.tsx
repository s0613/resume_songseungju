"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const TrynicPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero section with overlay text */}
            <section className="relative h-[500px] w-full">
                <Image src="/Trynic/trynicHero.png" alt="Trynic 히어로 이미지" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Trynic</h1>
                    <p className="text-lg text-white max-w-3xl">패션 중소기업을 위한 AI 영상 생성 플랫폼</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Next.js</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Spring Boot</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">AWS</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Image-to-Video</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Prompt Tuning</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Introduction */}
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Trynic는 패션 중소기업을 위한 AI 영상 생성 플랫폼으로, 누구나 모델을 선택하고 자사 의류 이미지를 입힌 후,
                            레퍼런스 영상을 기반으로 자신만의 패션 영상을 만들 수 있는 서비스입니다. 기존의 영상 제작 비용과 시간이
                            부담되던 소규모 브랜드들도 이 플랫폼을 통해 손쉽게 마케팅 콘텐츠를 제작할 수 있도록 돕습니다.
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
                                Trynic는 AI 영상 기술을 활용하여 실제 모델에 옷을 입히고, 기존 영상 스타일을 레퍼런스로 활용해
                                새로운 콘텐츠를 만들 수 있도록 지원합니다. 이를 통해 사용자는 비용과 시간의 부담 없이 마케팅 콘텐츠를
                                꾸준히 제작할 수 있습니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/Trynic/trynicdetail.png"
                                alt="Trynic 서비스 상세"
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
                            패션 중소기업들은 제품을 홍보하기 위한 고퀄리티 영상 콘텐츠를 제작하기 위해 높은 비용과 시간이 소요되는
                            문제를 겪고 있습니다. 특히 모델 섭외, 촬영, 편집 등은 물리적인 제약이 많아 지속적인 콘텐츠 생산이
                            어려웠습니다.
                        </p>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/Trynic/fash_change.png"
                                alt="Trynic 패션 변환 예시"
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
                                Trynic는 모델 이미지와 의류 이미지, 영상 스타일을 결합하여 마케팅에 활용할 수 있는 콘텐츠를 제작할 수 있게 도와줍니다.
                                복잡한 촬영 과정을 단순화하고, 브랜드가 원하는 스타일로 손쉽게 영상 콘텐츠를 구성할 수 있도록 설계되었습니다.
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
                                    "모델 선택 및 AI 의상 입히기 기능",
                                    "레퍼런스 영상을 기반으로 한 스타일 선택",
                                    "프롬프트 및 의류 이미지 입력을 통한 영상 제작",
                                    "완성된 영상 다운로드 및 소셜 미디어 공유",
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
                                src="/Trynic/trynicgeneration.png"
                                alt="Trynic AI 영상 생성 프로세스"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Frontend</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Next.js</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Tailwind CSS</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Shadcn/UI</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Backend & Infrastructure</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Spring Boot, JPA</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Fal.ai image-to-video API</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>AWS EC2, S3, CloudFront, Nginx</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Progress Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Progress & What's Next</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Launch Pad 창업경진대회 최우수상 수상",
                                icon: "🏆",
                            },
                            {
                                title: "AI 영상 퀄리티 향상 및 사용자 프롬프트 커스터마이징 기능 개발 예정",
                                icon: "🚀",
                            },
                            {
                                title: "실제 패션 중소기업 대상 베타 테스트 준비 중",
                                icon: "🔍",
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

export default TrynicPage

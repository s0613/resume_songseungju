"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const TotaloadPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero section with overlay text */}
            <section className="relative h-[500px] w-full">
                <Image src="/usedCar/usedcar_loginpage.webp" alt="Totaload 히어로 이미지" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Totaload</h1>
                    <p className="text-lg text-white max-w-3xl">중고차 수출 과정의 디지털 인증서 자동 발급 SaaS</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Spring Boot</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Python</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">AWS</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">OCR</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">PDF</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Introduction */}
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Totaload은 중고차 수출 과정의 불일치·재작업·신뢰 문제를 줄이기 위해 차량 사진·정보를 AI로 판독하고,
                            수입국 규정에 맞춘 디지털 인증서를 자동 발급·검증하는 SaaS입니다. 기존의 수기 프로세스로 인한
                            오류와 재작업을 최소화하고, 바이어와의 신뢰 관계를 구축할 수 있도록 돕습니다.
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
                                촬영 가이드 → AI 판독 → 규정 매핑 → 디지털 인증서(PDF+QR/전자서명) → 바이어 검증을 
                                단일 흐름으로 통합하여 중고차 수출 과정의 효율성을 극대화합니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/usedCar/usedCar_main.webp"
                                alt="Totaload 서비스 상세"
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
                        <ul className="space-y-3 text-lg text-gray-700 leading-relaxed">
                            <li>• 서류 표준 부재로 바이어 신뢰 저하 및 통관 단계 추가 확인 빈발</li>
                            <li>• 국가별 상이·변경되는 요구사항으로 재작성/반송 리스크</li>
                            <li>• 수기 프로세스로 인한 사진 누락·각도 불일치, 체크리스트 미기입, 오타</li>
                            <li>• 원본 링크/서명/이력 부재로 위변조·불일치 여부의 즉시 검증 곤란</li>
                        </ul>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/usedCar/certification.webp"
                                alt="Totaload 디지털 인증서 예시"
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
                                AI 판독 기술과 규정 매핑 시스템을 통해 차량 정보를 자동으로 분석하고,
                                수입국별 요구사항에 맞는 디지털 인증서를 자동 생성합니다.
                                이를 통해 재작업률을 크게 줄이고 바이어 신뢰도를 향상시킵니다.
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
                                    "차량번호/VIN 입력 시 기본정보 자동 프리필",
                                    "필수 샷 가이드로 누락·각도 오류 최소화",
                                    "OCR로 VIN/주행거리/번호판 판독 및 정합성 검증",
                                    "수입국별 요건 템플릿 자동 적용",
                                    "PDF+JSON 동시 출력, QR/전자서명 포함",
                                    "바이어 전용 읽기 링크 및 발급 이력 관리"
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
                                src="/usedCar/usedcar_loginpage.webp"
                                alt="Totaload 시스템 프로세스"
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
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Backend & AI</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Spring Boot, JPA</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Python OCR/손상 검출</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>PDF 생성 및 전자서명</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Infrastructure</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>AWS EC2, RDS, S3</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>Docker 컨테이너화</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-3"></div>
                                    <span>권한·로깅·백업 구성</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* My Role Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">My Role</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">요구사항 & 설계</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 현행 프로세스 인터뷰 및 체크리스트 표준화</li>
                                <li>• AI 판독 ↔ 규정엔진 ↔ 문서템플릿 데이터 흐름 설계</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">백엔드 & 문서</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Spring Boot 도메인·REST API 구현</li>
                                <li>• PDF+JSON 동시 출력, 국가별 템플릿 엔진 구성</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">AI 연동</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• OCR/손상 검출 결과를 정합성 규칙엔진과 연동</li>
                                <li>• 임계치/리턴코드 표준화 및 피드백 시스템</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">인프라 & 운영</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• AWS EC2/RDS/S3/Docker 배포</li>
                                <li>• 파일럿 운영 및 성능 지표 개선</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Progress Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Progress &amp; What&apos;s Next</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "한국 중고차 수출 협동 조합 해커톤 대상 수상",
                                icon: "🏆",
                            },
                            {
                                title: "정부지원사업 딥테크 분야 예비창업패키지 선정",
                                icon: "✅",
                            },
                            {
                                title: "현행 프로세스 분석 및 요구사항 정의 완료",
                                icon: "📋",
                            },
                            {
                                title: "AI 판독 및 규정 매핑 시스템 개발 완료",
                                icon: "🤖",
                            },
                            {
                                title: "디지털 인증서 자동 발급 시스템 구축",
                                icon: "📄",
                            },
                            {
                                title: "AWS 인프라 구축 및 배포 완료",
                                icon: "☁️",
                            },
                            {
                                title: "파일럿 운영 및 성능 지표 개선",
                                icon: "📊",
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

export default TotaloadPage

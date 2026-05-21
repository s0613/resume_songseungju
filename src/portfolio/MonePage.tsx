"use client"

import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

const MonePage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero section with overlay text */}
            <section className="relative h-[500px] w-full">
                <Image src="/mone/moneHero.png" alt="MONE 히어로 이미지" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20 lg:px-32">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">MONE</h1>
                    </div>
                    <p className="text-lg text-white max-w-3xl">선상 면세점을 위한 풀스택 통합 관리 시스템</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Django</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Python</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">Next.js</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">TypeScript</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">PostgreSQL</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">DRF</Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 sm:px-10 py-16 max-w-6xl">
                {/* Introduction */}
                <section className="mb-20">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            MONE는 선상 면세점 운영 전반을 디지털화한 통합 관리 시스템입니다.
                            예약·주문·결제부터 재고 관리, 경비·정산, 인사/급여, 경영 분석까지
                            면세점 업무의 전 도메인을 하나의 플랫폼에서 처리할 수 있도록 설계되었습니다.
                            Django REST Framework 기반 백엔드와 Next.js 승객 웹으로 구성된 풀스택 프로젝트입니다.
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
                                MONE는 두 개의 서브 프로젝트로 구성됩니다.
                                <strong> mone-core</strong>는 Django 기반 백엔드로 예약, 주문, 결제, 재고, 정산,
                                인사급여 등 모든 도메인의 API와 어드민 인터페이스를 제공합니다.
                                <strong> mone-customer</strong>는 승객이 직접 상품을 조회하고 예약·결제할 수 있는
                                Next.js 기반 승객 전용 웹 프론트엔드입니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/mone/moneHero.png"
                                alt="MONE 대시보드"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="mb-20 bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Problem</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "수기 기반 업무",
                                description:
                                    "선상 면세점의 재고·정산·경비 관리가 Excel이나 수기 장부에 의존해 오류와 지연이 빈번했습니다.",
                            },
                            {
                                title: "도메인 분절",
                                description:
                                    "예약, 주문, 결제, 재고, 정산이 각각 다른 시스템에 흩어져 있어 데이터 정합성 유지가 어려웠습니다.",
                            },
                            {
                                title: "승객 접점 부재",
                                description:
                                    "선상에서 승객이 직접 상품을 사전 예약하거나 결제할 수 있는 디지털 채널이 없었습니다.",
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

                {/* Solution Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Solution</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-6">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Django DRF 기반으로 13개 도메인(예약, 주문, 결제, 재고, 상품, 항차, 마감,
                                정산, 구매·발주, 인사·급여, 비용, 고객·회원, 프로모션)을 모놀리식 구조로 통합했습니다.
                                각 도메인은 독립적인 앱으로 분리되어 있으며, DRF ViewSet과 Serializer 기반으로
                                일관된 REST API를 제공합니다.
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    "예약 → 주문 → 결제 → 재고 차감의 완전한 트랜잭션 흐름 구현",
                                    "항차(Voyage)별 재고 독립 관리 및 면세한도 자동 검증",
                                    "고정비용·변동비용 분리 관리 및 월별 비용현황 Excel 내보내기",
                                    "월별마감보고 및 매출정산보고 자동 생성",
                                    "쿠폰·마일리지·프로모션 할인 계산 엔진 구현",
                                    "비밀번호 90일 만료, 로그인 5회 실패 잠금 등 보안 정책 내재화",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/mone/moneExpense.png"
                                alt="MONE 비용 관리 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Key Features Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Key Features</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/mone/moneSettlement.png"
                                alt="MONE 정산 관리 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">정산 & 경영 분석</h3>
                            <p className="text-gray-700 leading-relaxed">
                                월별마감보고, 매출정산보고, 부가세신고자료를 자동 생성합니다.
                                매출·매입·경비·손익 탭으로 분리된 월별 마감 보고서와
                                KRW·JPY·CNY 다중 통화 결제 현황을 한눈에 확인할 수 있습니다.
                                경영분석 화면에서 항차별·카테고리별 매출 추이를 대시보드로 조회할 수 있습니다.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 order-2 md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-800">승객 전용 예약 웹</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Next.js 기반 승객 전용 웹(mone-customer)에서 탑승 예정 승객이
                                상품을 사전 예약하고 Toss 결제 위젯으로 온라인 결제할 수 있습니다.
                                React Context API로 인증 상태와 글로벌 UI를 관리하고,
                                Axios 기반 공통 API Client로 백엔드와 통신합니다.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                            <Image
                                src="/mone/moneList.png"
                                alt="MONE 목록 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Tech Stack Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">Tech Stack</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Backend (mone-core)</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Python 3.12",
                                    "Django 6.0",
                                    "Django REST Framework",
                                    "PostgreSQL",
                                    "SQLite (개발)",
                                    "Swagger / drf-yasg",
                                    "ruff / black / isort",
                                    "Playwright (테스트)",
                                    "Docker",
                                ].map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Frontend (mone-customer)</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Next.js (App Router)",
                                    "TypeScript",
                                    "React Context API",
                                    "Axios",
                                    "Toss 결제 위젯",
                                    "Zod",
                                    "Tailwind CSS",
                                    "Orval (API codegen)",
                                ].map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="my-12" />

                {/* Role Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="mr-2">My Role</span>
                        <div className="h-px bg-gray-300 flex-grow ml-4"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "백엔드 풀스택 개발",
                                items: [
                                    "13개 도메인 모델 설계 및 DRF API 구현",
                                    "예약→주문→결제→재고 트랜잭션 흐름 설계",
                                    "경비·정산 자동화 및 Excel 내보내기 구현",
                                    "보안 정책(비밀번호 만료, 로그인 잠금) 내재화",
                                    "Playwright 기반 E2E 테스트 작성",
                                ],
                            },
                            {
                                title: "프론트엔드 개발",
                                items: [
                                    "Next.js App Router 기반 승객 웹 구조 설계",
                                    "Orval을 활용한 API 타입 자동 생성",
                                    "Toss 결제 위젯 연동 및 결제 플로우 구현",
                                    "React Context API로 인증·UI 전역 상태 관리",
                                    "어드민 인터페이스 Django Admin 커스터마이징",
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

export default MonePage

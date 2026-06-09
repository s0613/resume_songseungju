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

const MonePage: React.FC = () => {
    return (
        <div className="bg-[#F7F4EF] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[72vh] w-full">
                <Image src="/mone/moneHero.webp" alt="MONE 히어로 이미지" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
                    <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
                        Duty-Free · Fullstack · ERP
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                        MONE
                    </h1>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
                        선상 면세점을 위한 풀스택 통합 관리 시스템
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Django", "Python", "Next.js", "TypeScript", "PostgreSQL", "DRF"].map((t) => (
                            <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Wrapper */}
            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">

                {/* Intro */}
                <section className="mb-24">
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
                        MONE는 선상 면세점 운영 전반을 디지털화한 통합 관리 시스템입니다.
                        예약·주문·결제부터 재고 관리, 경비·정산, 인사/급여, 경영 분석까지
                        면세점 업무의 전 도메인을 하나의 플랫폼에서 처리할 수 있도록 설계되었습니다.
                        Django REST Framework 기반 백엔드와 Next.js 승객 웹으로 구성된 풀스택 프로젝트입니다.
                    </p>
                </section>

                <div className="h-px bg-gray-300 mb-24" />

                {/* 01 Overview */}
                <section className="mb-24">
                    <SectionHeader num="01" title="Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            MONE는 두 개의 서브 프로젝트로 구성됩니다.
                            <strong> mone-core</strong>는 Django 기반 백엔드로 예약, 주문, 결제, 재고, 정산,
                            인사급여 등 모든 도메인의 API와 어드민 인터페이스를 제공합니다.
                            <strong> mone-customer</strong>는 승객이 직접 상품을 조회하고 예약·결제할 수 있는
                            Next.js 기반 승객 전용 웹 프론트엔드입니다.
                        </p>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/mone/moneHero.webp"
                                alt="MONE 대시보드"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </section>

                {/* 02 Problem */}
                <section className="mb-24">
                    <SectionHeader num="02" title="Problem" />
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
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 03 Solution */}
                <section className="mb-24">
                    <SectionHeader num="03" title="Solution" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/mone/moneExpense.webp"
                                alt="MONE 비용 관리 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="space-y-6">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Django DRF 기반으로 13개 도메인(예약, 주문, 결제, 재고, 상품, 항차, 마감,
                                정산, 구매·발주, 인사·급여, 비용, 고객·회원, 프로모션)을 모놀리식 구조로 통합했습니다.
                                각 도메인은 독립적인 앱으로 분리되어 있으며, DRF ViewSet과 Serializer 기반으로
                                일관된 REST API를 제공합니다.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "예약 → 주문 → 결제 → 재고 차감의 완전한 트랜잭션 흐름 구현",
                                    "항차(Voyage)별 재고 독립 관리 및 면세한도 자동 검증",
                                    "고정비용·변동비용 분리 관리 및 월별 비용현황 Excel 내보내기",
                                    "월별마감보고 및 매출정산보고 자동 생성",
                                    "쿠폰·마일리지·프로모션 할인 계산 엔진 구현",
                                    "비밀번호 90일 만료, 로그인 5회 실패 잠금 등 보안 정책 내재화",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-700">
                                        <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 04 Key Features */}
                <section className="mb-24">
                    <SectionHeader num="04" title="Key Features" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">정산 &amp; 경영 분석</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                월별마감보고, 매출정산보고, 부가세신고자료를 자동 생성합니다.
                                매출·매입·경비·손익 탭으로 분리된 월별 마감 보고서와
                                KRW·JPY·CNY 다중 통화 결제 현황을 한눈에 확인할 수 있습니다.
                                경영분석 화면에서 항차별·카테고리별 매출 추이를 대시보드로 조회할 수 있습니다.
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/mone/moneSettlement.webp"
                                alt="MONE 정산 관리 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/mone/moneList.webp"
                                alt="MONE 목록 화면"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">승객 전용 예약 웹</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Next.js 기반 승객 전용 웹(mone-customer)에서 탑승 예정 승객이
                                상품을 사전 예약하고 Toss 결제 위젯으로 온라인 결제할 수 있습니다.
                                React Context API로 인증 상태와 글로벌 UI를 관리하고,
                                Axios 기반 공통 API Client로 백엔드와 통신합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 05 Tech Stack */}
                <section className="mb-24">
                    <SectionHeader num="05" title="Tech Stack" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Frontend",
                                items: ["Next.js (App Router)", "TypeScript", "React Context API", "Axios", "Toss 결제 위젯", "Zod", "Tailwind CSS", "Orval (API codegen)"],
                            },
                            {
                                title: "Backend",
                                items: ["Python 3.12", "Django 6.0", "Django REST Framework", "PostgreSQL", "SQLite (개발)", "Swagger / drf-yasg"],
                            },
                            {
                                title: "Infra & Tools",
                                items: ["Docker", "ruff / black / isort", "Playwright (테스트)"],
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

                {/* 06 My Role */}
                <section className="mb-24">
                    <SectionHeader num="06" title="My Role" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
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
                        ].map((role, roleIdx) => (
                            <div key={roleIdx} className="mb-8 md:mb-0">
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{role.title}</p>
                                <div className="flex flex-col">
                                    {role.items.map((item, i) => (
                                        <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                                            <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="text-gray-800 text-sm leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MonePage

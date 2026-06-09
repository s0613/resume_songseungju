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

const TotaloadPage: React.FC = () => {
  return (
    <div className="bg-[#F7F4EF] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[72vh] w-full">
        <Image
          src="/usedCar/usedcar_loginpage.webp"
          alt="Totaload 히어로 이미지"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
          <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
            Used Car Export · SaaS · AI
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
            Totaload
          </h1>
          <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
            중고차 수출 과정의 디지털 인증서 자동 발급 SaaS
          </p>
          <div className="flex flex-wrap gap-2">
            {["Spring Boot", "Python", "AWS", "OCR", "PDF"].map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
        {/* Intro */}
        <section className="mb-24">
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
            Totaload은 중고차 수출 과정의 불일치·재작업·신뢰 문제를 줄이기 위해 차량 사진·정보를 AI로 판독하고,
            수입국 규정에 맞춘 디지털 인증서를 자동 발급·검증하는 SaaS입니다. 기존의 수기 프로세스로 인한
            오류와 재작업을 최소화하고, 바이어와의 신뢰 관계를 구축할 수 있도록 돕습니다.
          </p>
        </section>

        <div className="h-px bg-gray-300 mb-24" />

        {/* 01 Overview */}
        <section className="mb-24">
          <SectionHeader num="01" title="Overview" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <p className="text-gray-700 text-lg leading-relaxed">
              촬영 가이드 → AI 판독 → 규정 매핑 → 디지털 인증서(PDF+QR/전자서명) → 바이어 검증을
              단일 흐름으로 통합하여 중고차 수출 과정의 효율성을 극대화합니다.
            </p>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/usedCar/usedCar_main.webp"
                alt="Totaload 서비스 상세"
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
            <ul className="space-y-4 text-lg text-gray-700 leading-relaxed">
              {[
                "서류 표준 부재로 바이어 신뢰 저하 및 통관 단계 추가 확인 빈발",
                "국가별 상이·변경되는 요구사항으로 재작성/반송 리스크",
                "수기 프로세스로 인한 사진 누락·각도 불일치, 체크리스트 미기입, 오타",
                "원본 링크/서명/이력 부재로 위변조·불일치 여부의 즉시 검증 곤란",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 Solution */}
        <section className="mb-24">
          <SectionHeader num="03" title="Solution" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/usedCar/certification.webp"
                alt="Totaload 디지털 인증서 예시"
                fill
                className="object-contain bg-gray-50"
              />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              AI 판독 기술과 규정 매핑 시스템을 통해 차량 정보를 자동으로 분석하고,
              수입국별 요구사항에 맞는 디지털 인증서를 자동 생성합니다.
              이를 통해 재작업률을 크게 줄이고 바이어 신뢰도를 향상시킵니다.
            </p>
          </div>
        </section>

        {/* 04 Main Features */}
        <section className="mb-24">
          <SectionHeader num="04" title="Main Features" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ul className="space-y-4">
              {[
                "차량번호/VIN 입력 시 기본정보 자동 프리필",
                "필수 샷 가이드로 누락·각도 오류 최소화",
                "OCR로 VIN/주행거리/번호판 판독 및 정합성 검증",
                "수입국별 요건 템플릿 자동 적용",
                "PDF+JSON 동시 출력, QR/전자서명 포함",
                "바이어 전용 읽기 링크 및 발급 이력 관리",
              ].map((f, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 font-mono mt-0.5 flex-shrink-0">—</span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/usedCar/usedcar_loginpage.webp"
                alt="Totaload 시스템 프로세스"
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
                title: "Backend & AI",
                items: ["Spring Boot", "JPA", "Python OCR", "손상 검출", "PDF 생성", "전자서명"],
              },
              {
                title: "Infrastructure",
                items: ["AWS EC2", "RDS", "S3", "Docker"],
              },
              {
                title: "Document",
                items: ["PDF+JSON", "QR 코드", "국가별 템플릿"],
              },
            ].map((group) => (
              <div key={group.title}>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-white text-gray-800 text-sm font-mono border border-gray-200 rounded"
                    >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "현행 프로세스 인터뷰 및 체크리스트 표준화",
              "AI 판독 ↔ 규정엔진 ↔ 문서템플릿 데이터 흐름 설계",
              "Spring Boot 도메인·REST API 구현",
              "PDF+JSON 동시 출력, 국가별 템플릿 엔진 구성",
              "OCR/손상 검출 결과를 정합성 규칙엔진과 연동",
              "임계치/리턴코드 표준화 및 피드백 시스템",
              "AWS EC2/RDS/S3/Docker 배포",
              "파일럿 운영 및 성능 지표 개선",
            ].map((role, i) => (
              <div key={i} className="flex gap-4 py-3 border-b border-gray-200">
                <span className="text-gray-400 font-mono text-sm w-6 flex-shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-800">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 07 Progress & What's Next */}
        <section>
          <SectionHeader num="07" title="Progress & What's Next" />
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
            {[
              { title: "한국 중고차 수출 협동 조합 해커톤 대상 수상" },
              { title: "정부지원사업 딥테크 분야 예비창업패키지 선정" },
              { title: "현행 프로세스 분석 및 요구사항 정의 완료" },
              { title: "AI 판독 및 규정 매핑 시스템 개발 완료" },
              { title: "디지털 인증서 자동 발급 시스템 구축" },
              { title: "AWS 인프라 구축 및 배포 완료" },
              { title: "파일럿 운영 및 성능 지표 개선" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 px-6 py-4 bg-white/60">
                <span className="font-mono text-xs text-gray-400 w-8 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-gray-800">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TotaloadPage

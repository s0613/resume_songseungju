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

const RunningToYouPage: React.FC = () => {
  return (
    <div className="bg-[#F7F4EF] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[72vh] w-full">
        <Image src="/runningtoyou/hero.webp" alt="RunningToYou 히어로 이미지" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
          <p className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase mb-3">
            Dating · Running · MVP
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
            RunningToYou
          </h1>
          <p className="text-base md:text-lg text-white/75 max-w-2xl mb-8">
            러닝을 통해 자연스럽게 사람을 연결하는 데이팅 MVP 서비스
          </p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "Spring Boot", "MariaDB", "AWS EC2"].map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full">
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
            기존 데이팅 앱의 과몰입 구조나 불편한 채팅 중심의 상호작용을 배제하고, &apos;함께 뛴다&apos;는 경험을 중심으로 관계를 쌓도록 설계했습니다.
          </p>
        </section>

        <div className="h-px bg-gray-300 mb-24" />

        {/* 01 Overview */}
        <section className="mb-24">
          <SectionHeader num="01" title="Overview" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <p className="text-gray-700 text-lg leading-relaxed">
              RunningToYou는 운동이라는 공통된 행위를 통해 자연스럽게 서로를 알아가는 새로운 형태의 만남 서비스를
              제안합니다. 기존 데이팅 앱의 과몰입 구조나 불편한 채팅 중심의 상호작용을 배제하고, &apos;함께 뛴다&apos;는 경험을
              중심으로 관계를 쌓도록 설계했습니다.
            </p>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src="/runningtoyou/runningtoyouLogo.webp"
                  alt="RunningToYou 로고"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 02 Problem */}
        <section className="mb-24">
          <SectionHeader num="02" title="Problem" />
          <div className="pl-8 border-l-2 border-gray-900">
            <p className="text-lg text-gray-700 leading-relaxed">
              현재 대부분의 데이팅 앱은 사진 기반의 일방적인 판단, 과도한 채팅 중심 구조 등으로 인해 진정성 있는 관계
              형성이 어렵고, 사용자 피로도가 높다는 문제가 있습니다. 특히 실외 활동 기반의 자연스러운 만남을 원하는
              사용자층은 소외되고 있습니다.
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section className="mb-24">
          <SectionHeader num="03" title="Solution" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
              <Image src="/runningtoyou/CTA.webp" alt="RunningToYou 서비스 소개" fill className="object-contain bg-gray-50" />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              RunningToYou는 러닝이라는 가벼운 활동을 기반으로, 비슷한 속도와 관심사를 가진 사람들을 매칭합니다.
              정해진 러닝 시간 동안 함께 뛰고, 이후 선택적으로 관심 표현을 할 수 있어 부담 없이 자연스럽게 관계를
              이어갈 수 있습니다.
            </p>
          </div>
        </section>

        {/* 04 Tech Stack */}
        <section className="mb-24">
          <SectionHeader num="04" title="Tech Stack" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Frontend", items: ["Next.js", "TypeScript"] },
              { title: "Backend", items: ["Spring Boot", "JPA", "MariaDB"] },
              { title: "Infra & Ops", items: ["AWS EC2", "Nginx", "HTTPS", "GitHub Actions"] },
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

        {/* 05 My Role */}
        <section className="mb-24">
          <SectionHeader num="05" title="My Role" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "총 4인의 팀 프로젝트로, 기획·백엔드 개발·배포·마케팅을 주도적으로 담당",
              "Everytime 게시판을 활용해 타겟 유저 대상 MVP 소개 및 유입 유도",
              "매칭은 수동으로 운영하며 사용자의 자연스러운 반응 관찰 및 개선",
              "운영: 수동 매칭 운영으로 초기 피드백 실험 진행",
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

        {/* 06 What's Next */}
        <section>
          <SectionHeader num="06" title="What's Next" />
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
            {[
              {
                title: "알고리즘 기반 자동 매칭 기능 설계 — 사용자의 러닝 속도, 선호 시간대, 관심사를 기반으로 한 자동 매칭 시스템 구현",
              },
              {
                title: "커뮤니티 기능 도입 — 러닝 기록 공유 및 인증을 통한 커뮤니티 형성으로 서비스 지속성 강화",
              },
              {
                title: "소규모 그룹 러닝 매칭 기능 — 1:1 매칭 외에도 소규모 그룹 러닝을 통한 다양한 만남 형태 제공",
              },
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

export default RunningToYouPage

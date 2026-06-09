"use client";

import React from "react";
import Image from "next/image";

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-start gap-4 mb-10">
    <span className="text-8xl font-extralight leading-none text-gray-200 select-none mt-1 hidden sm:block">{num}</span>
    <div className="pt-1 sm:pt-3">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">{title}</h2>
      <div className="h-0.5 bg-gray-900 mt-2.5 w-10" />
    </div>
  </div>
);

const MediVuPage: React.FC = () => {
  return (
    <div className="bg-[#F7F4EF] min-h-screen">
      {/* Hero Section — text hero (no hero image) */}
      <section className="h-[50vh] bg-gray-900 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-14">
        <p className="text-xs font-mono tracking-[0.2em] text-white/50 uppercase mb-3">
          Healthcare · AI · Prototype
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
          MediVu
        </h1>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mb-8">
          PACS 연동 문제를 해결하는 AI 기반 의료영상 판독 솔루션 (기획 및 프로토타입 단계)
        </p>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "TypeScript", "MCP", "PDF De-identification"].map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-3 py-1.5 border border-white/25 text-white/60 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-16 py-20">
        {/* Intro */}
        <section className="mb-24">
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-3xl">
            병원 현장에서 실질적인 활용이 어려운 기존 AI 판독 솔루션의 한계를 극복하기 위해
            기획된 서비스입니다. PACS 연동 문제, 표준화되지 않은 판독문 양식, 그리고 개인정보 보호
            이슈를 해결하고자 하는 목표로 시작되었습니다.
          </p>
        </section>

        <div className="h-px bg-gray-300 mb-24" />

        {/* 01 Overview */}
        <section className="mb-24">
          <SectionHeader num="01" title="Overview" />
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            MediVu는 병원 현장에서 실질적인 활용이 어려운 기존 AI 판독 솔루션의 한계를 극복하기 위해
            기획된 서비스입니다. PACS 연동 문제, 표준화되지 않은 판독문 양식, 그리고 개인정보 보호
            이슈를 해결하고자 하는 목표로 시작되었으며, 현재 초기 프로토타입을 제작 중입니다.
          </p>
        </section>

        {/* 02 Problem */}
        <section className="mb-24">
          <SectionHeader num="02" title="Problem" />
          <div className="pl-8 border-l-2 border-gray-900">
            <p className="text-lg text-gray-700 leading-relaxed">
              병원에 AI 판독 솔루션이 도입되었음에도 불구하고, PACS와의 기술적 연동 부재로 인해 실질적인 사용이 제한되고 있습니다.
              또한 의료 판독문은 병원과 전문의마다 형식과 용어가 달라 표준화가 어려우며, 환자 개인정보 보호 역시 AI 도입의 큰 장벽이 됩니다.
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section className="mb-24">
          <SectionHeader num="03" title="Solution" />
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            MediVu는 Model Context Protocol(MCP)을 활용한 구조를 기획하고 있습니다. 이를 통해 PACS에서 의료영상을 자동으로 받아오고,
            AI가 분석하여 표준화된 판독문을 생성하는 자동화 흐름을 설계 중입니다. 또한 PDF 판독문 내 환자 정보를 자동 가명화하는 기능을 포함해
            개인정보 보호 이슈도 함께 해결하고자 합니다.
          </p>
        </section>

        {/* 04 Tech Stack */}
        <section className="mb-24">
          <SectionHeader num="04" title="Tech Stack & Architecture" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                items: ["Next.js", "TypeScript"],
              },
              {
                title: "PDF 가명화",
                items: ["Python", "PDF 텍스트 추출", "식별정보 마스킹"],
              },
              {
                title: "AI 연동",
                items: ["MCP (Model Context Protocol)"],
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

        {/* 05 Current Progress */}
        <section className="mb-24">
          <SectionHeader num="05" title="Current Progress" />
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200 mb-12">
            {[
              "실험실 특화형 선도대학 창업지원 사업계획서 단독 작성 및 예창 합격",
              "Next.js 기반 랜딩페이지 프로토타입 개발 진행 중",
              "Python 기반 PDF 판독문 가명화 프로토타입 개발 중",
              "창업 관련 서류 업무 및 정부지원사업 신청 업무 수행",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 px-6 py-4 bg-white/60">
                <span className="font-mono text-xs text-gray-400 w-8 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>

          {/* 프로토타입 스크린샷 */}
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-6">
              프로토타입 스크린샷
            </p>
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/medivu/screenshot2.webp"
                alt="MediVu 프로토타입 스크린샷"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* 06 What's Next */}
        <section>
          <SectionHeader num="06" title="What's Next" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "MCP 연동 구조를 실제 영상 시스템과 연결 테스트 예정",
              "AI 모델 기반 판독문 생성 퀄리티 향상",
              "병원 기관 대상 베타테스트 준비 및 검토",
              "DICOM 기반 연동 및 가명화 범위 확장 계획",
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
      </div>
    </div>
  );
};

export default MediVuPage;

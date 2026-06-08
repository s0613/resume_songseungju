"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

const ExperienceAndProject: React.FC = () => {
  return (
    <section
      id="experienceAndProject"
      className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-gray-100 rounded-full opacity-20" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-100 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:space-x-12 space-y-8 md:space-y-0">
          <div className="md:w-1/4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
                EXPERIENCE
              </h1>
              <div className="h-1 w-16 bg-gray-800 mt-4 md:mx-0 mx-auto" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-3/4 space-y-8"
          >
            {/* Trynic */}
            <Link href="/portfolio/trynic" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Trynic
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.01 ~ 현재</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    레퍼런스 기반 AI 생성 이미지와 영상을 제공하는 웹사이트 – 기획부터 개발, 배포까지 전 과정 동시 수행
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js", "Tailwind CSS", "Spring Boot", "AWS S3", "CloudFront", "fal API"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "서비스 컨셉 정의부터 전체 기획, 디자인, 개발까지 수행",
                      "Next.js + Tailwind CSS 기반 UI 및 UX 구현",
                      "Spring Boot 기반 사용자 인증 및 보안 개선",
                      "AWS S3 및 CloudFront를 활용한 리소스 최적화",
                      "중소벤처기업부 예비창업패키지 선정",
                      "창업지원단 Launch Pad 최우수상 수상",
                      "기업가 정신 재단상 수상",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Cogmo */}
            <Link href="/portfolio/cogmo" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Cogmo 안녕
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.11 ~ 2026.01</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    고령자를 위한 AI 기반 인지건강 측정 및 관리 플랫폼 – 모바일 앱, 보호자 대시보드, 백엔드 풀스택 개발
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Flutter", "Spring Boot", "Next.js", "Gemini AI", "AWS", "WebSocket"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "Flutter 모바일 앱 UX 개선",
                      "Spring Boot 백엔드 및 JWT/OAuth2 인증 시스템 구축",
                      "Next.js 보호자 대시보드 개발 (WebSocket 실시간 모니터링)",
                      "Gemini AI 연동 맞춤형 피드백 및 PDF 리포트 자동 생성",
                      "AWS 인프라 구축 (EC2, S3, SNS, SES) 및 배포 자동화",
                      "6개 영역 인지기능 테스트 시스템 설계 및 구현",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Mone */}
            <Link href="/portfolio/mone" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        MONE
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2026.01 ~ 현재</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    선상 면세점을 위한 풀스택 통합 관리 시스템 – 예약·주문·정산·인사급여 등 13개 도메인 백엔드 및 승객 웹 개발
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Django", "Python", "DRF", "Next.js", "TypeScript", "PostgreSQL"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "Django DRF 기반 13개 도메인 REST API 설계 및 구현",
                      "예약→주문→결제→재고 전 과정 트랜잭션 흐름 설계",
                      "월별마감보고, 매출정산보고, 부가세신고자료 자동 생성",
                      "고정·변동비용 경비 관리 및 Excel 내보내기 구현",
                      "Next.js 승객 웹 및 Toss 결제 위젯 연동",
                      "Playwright E2E 테스트 및 보안 정책 내재화",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Totaload */}
            <Link href="/portfolio/totaload" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Totaload
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.07 ~ 현재</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    중고차 수출 과정의 디지털 인증서 자동 발급 SaaS – AI 판독과 규정 매핑을 통한 원스톱 솔루션
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Spring Boot", "Python AI", "AWS", "OCR", "PDF", "전자서명"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "한국 중고차 수출 협동 조합 해커톤 대상 수상",
                      "정부지원사업 딥테크 분야 예비창업패키지 선정",
                      "중고차 수출 과정의 불일치/재작업/신뢰 문제 해결을 위한 SaaS 개발",
                      "AI OCR을 활용한 차량 정보 자동 판독 및 정합성 검사 시스템 구축",
                      "수입국별 규정 매핑 및 디지털 인증서(PDF+QR/전자서명) 자동 발급",
                      "AWS 인프라 구축 및 파일럿 운영을 통한 실제 업계 플로우 검증",
                      "발급소요시간, 재작업률, 바이어 검증 성공률 3개 핵심지표 트래킹 체계 구축",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* MediVu */}
            <Link href="/portfolio/medivu" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        MediVu
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.03 ~ 2025.10</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    PACS 연동 문제를 해결하는 AI 기반 의료영상 판독문 자동 생성 솔루션
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js", "TypeScript", "MCP", "PDF De-identification"].map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "실험실 특화 창업지원 사업계획서 단독 작성 및 예창 합격",
                      "MCP(Model Context Protocol)를 활용한 구조 제안",
                      "서비스 흐름에 맞춘 랜딩페이지 디자인 및 개발 진행 중",
                      "PDF 판독문 내 개인정보 가명화 프로토타입 기능 개발 중",
                      "정부지원사업 선정으로 총 1억원 지원금 수령",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* S-skills */}
            <Link href="/portfolio/s-skills" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        S-skills
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.12 - 현재</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    혼자 일하는 개발자의 팀 — Claude Code 역할 기반 AI 개발 오케스트레이터 오픈소스
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Claude Code", "TypeScript", "Multi-Agent", "Open Source"].map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "PM, Design, Tech Lead, Frontend, Backend, Security, QA 7개 전문가 에이전트 설계 및 구현",
                      "claude plugin install 한 줄 설치, /sj-company로 자동 라우팅",
                      "v1.0 → v3.1.0 지속적 업그레이드, MIT 오픈소스 공개",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* IndexKit */}
            <Link href="/portfolio/indexkit" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        IndexKit
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2026.03 ~ 현재</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    네이버 블로그 포스트를 Google 검색에 자동으로 노출시켜주는 SaaS – 색인 요청 자동화 및 누락 글 일괄 복구
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js", "Supabase", "TypeScript", "Vercel", "Google Search Console API", "PortOne"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "네이버 블로그 신규 글을 Google Search Console에 자동 제출하는 파이프라인 설계 및 구현",
                      "부스터 팩(100 / 500 / 1,000 URL) 상품으로 누락 글 일괄 색인 복구 기능 개발",
                      "색인 현황 실시간 모니터링 대시보드 구축",
                      "Supabase 기반 사용자 인증 및 구독 플랜 관리 (Free / Light / Pro / Business)",
                      "PortOne 결제 연동으로 유료 플랜 온보딩 구현",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Curl CODE */}
            <Link href="/portfolio/curlcode" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Curl CODE
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.10 ~ 2026.02</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    곱슬머리 유형 진단부터 맞춤 관리 루틴까지 제공하는 AI 헤어케어 컨설팅 웹앱
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js", "TypeScript", "Supabase", "Recharts", "Playwright"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "곱슬 유형 단계별 설문 → AI 분석 → 맞춤 관리 루틴 추천 플로우 설계 및 구현",
                      "Supabase 기반 사용자 인증 및 진단 결과 저장·조회 시스템 구축",
                      "Recharts 기반 모발 상태 트래킹 대시보드 구현",
                      "한국어·영어 다국어(i18n) 지원",
                      "Playwright E2E 테스트로 핵심 온보딩 플로우 검증",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* RunningToYou */}
            <Link href="/portfolio/runningtoyou" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        RunningToYou
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2024.04 - 2024.11</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    러닝을 기반으로 한 자연스러운 만남을 연결하는 데이팅 MVP 서비스
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js", "TypeScript", "Spring Boot", "MariaDB"].map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "4인의 팀 프로젝트로 기획, 백엔드, 배포, 마케팅을 담당",
                      "매칭 로직은 수동 운영으로 피드백 기반 검증 진행",
                      "Everytime 등 커뮤니티를 활용한 타겟 마케팅 실험",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Totaro Web */}
            <Link href="/portfolio/totaroweb" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Totaro Web
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.10 ~ 진행중</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    AI 기반 K-Food 글로벌 B2B 소싱 플랫폼 — 바이어와 공급업체를 연결하는 마켓플레이스
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js 16", "TypeScript", "Supabase", "Google Gemini", "next-intl", "Playwright"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "Gemini AI 자연어 상품 검색·자동 견적 채팅 파이프라인 구현",
                      "바이어·공급업체·관리자 역할 분리 풀스택 플로우 설계",
                      "TanStack Query + Supabase RLS 기반 서버 상태 관리",
                      "next-intl 한국어·영어·일본어 다국어 지원",
                      "Vitest 단위 + Playwright E2E 테스트 파이프라인 구축",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Totaro Cos */}
            <Link href="/portfolio/totarocos" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Totaro Cos
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.11 ~ 진행중</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    해외 바이어와 한국 화장품 공급사를 연결하는 K-Beauty B2B 소싱 플랫폼
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js 16", "Supabase", "Google Gemini", "KFDA 데이터", "Tailwind CSS", "Playwright"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "KFDA→Naver 화장품 데이터 파이프라인 설계 및 상품 DB 자동 구축",
                      "Gemini AI 기반 성분 설명·OEM/ODM 견적 채팅 구현",
                      "바이어·공급업체 역할 분리 대시보드 풀스택 개발",
                      "Supabase RLS 기반 역할별 데이터 접근 제어",
                      "Vitest 단위 + Playwright E2E 테스트 파이프라인 구축",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Upflow AX */}
            <Link href="/portfolio/upflowax" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500
                  group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02]
                  group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50
                  group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
                      group-hover:via-gray-50/30 opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Upflow AX
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.12 ~ 진행중</span>
                    </div>
                  </div>

                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지, DDD 도메인 캔버스·RTM·손익 통합
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Tiptap"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <ul className="space-y-2 text-gray-700 mt-4">
                    {[
                      "SI 산출 문서 6종(제안서·WBS·요구사항 등) AI 보조 편집기 구현 (Tiptap)",
                      "DDD 도메인 캔버스 — 바운디드 컨텍스트·애그리게이트 시각화",
                      "RTM(요구사항 추적 매트릭스) 자동 생성·관리 모듈",
                      "자원 배정·손익 분석·SLA 모니터링 통합 대시보드",
                      "Supabase RLS + TanStack Query v5 실시간 상태 동기화",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 relative">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                      <span className="text-sm font-medium">상세히 보기</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceAndProject

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

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceAndProject

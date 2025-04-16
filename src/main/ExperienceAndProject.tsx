"use client"

import type React from "react"
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
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">EXPERIENCE</h1>
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
            {/* Crazy Space */}
            <Link href="/portfolio/crazyspace" className="block group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500 
                group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02] 
                group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 
                group-hover:border-opacity-80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent 
                    group-hover:from-transparent group-hover:via-gray-50/30 group-hover:to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        Crazy Space
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.01 ~ 현재</span>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      레퍼런스 기반 AI 생성 이미지와 영상을 제공하는 웹사이트 – 기획부터 개발, 배포까지 전 과정 단독
                      수행
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Tailwind CSS", "Spring Boot", "AWS S3", "CloudFront", "fal API"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <ul className="space-y-2 text-gray-700">
                      {[
                        "서비스 컨셉 정의부터 전체 기획, 디자인, 개발까지 1인 주도",
                        "Next.js + Tailwind CSS 기반 UI 및 UX 구현",
                        "Spring Boot 기반 사용자 인증 및 검색 기능 개발",
                        "AWS S3 및 CloudFront를 활용한 리소스 최적화",
                        "창업지원단 Launch Pad 최우수상 수상",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                          <span className="group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 relative">
                      <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                        <span className="text-sm font-medium">상세히 보기</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
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
                    group-hover:from-transparent group-hover:via-gray-50/30 group-hover:to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
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
                      <span className="text-sm">2025.03 ~ 현재</span>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      PACS 연동 문제를 해결하는 AI 기반 의료영상 판독문 자동 생성 솔루션
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "TypeScript", "Spring Boot", "MariaDB", "MCP"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <ul className="space-y-2 text-gray-700">
                      {[
                        "MCP(Multimodal Context Protocol)를 활용한 구조 제안",
                        "실험실 특화 창업지원 사업계획서 단독 작성",
                        "서비스 흐름에 맞춘 랜딩페이지 디자인 및 개발 진행 중",
                        "PDF 판독문 내 개인정보 가명화 프로토타입 기능 개발 중",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                          <span className="group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 relative">
                      <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                        <span className="text-sm font-medium">상세히 보기</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
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
                    group-hover:from-transparent group-hover:via-gray-50/30 group-hover:to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
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
                      <span className="text-sm">2023.03 - 2023.08</span>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      러닝을 기반으로 한 자연스러운 만남을 연결하는 데이팅 MVP 서비스
                    </p>

                    <div className="flex flex-wrap gap-2">
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

                    <ul className="space-y-2 text-gray-700">
                      {[
                        "아이디어 기획부터 UI/UX 설계, 개발까지 전 과정 단독 수행",
                        "매칭 로직은 수동 운영으로 피드백 기반 검증 진행",
                        "Everytime 등 커뮤니티를 활용한 타겟 마케팅 실험",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                          <span className="group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 relative">
                      <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                        <span className="text-sm font-medium">상세히 보기</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 최적 진입 시간 웹사이트 */}
            <div className="group">
              <Card
                className="bg-white shadow-sm border border-gray-100 transition-all duration-500 
                group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-[1.02] 
                group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 
                group-hover:border-opacity-80 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent 
                    group-hover:from-transparent group-hover:via-gray-50/30 group-hover:to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                  />

                  <div className="flex items-center justify-between mb-4 relative">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                        최적 진입 시간 웹사이트
                      </h3>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">2025.01 - 2025.02</span>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      Django와 Next.js를 활용한 사용자 방문 최적 시간 분석 외주 프로젝트
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {["Django", "Next.js", "REST API"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all duration-300 group-hover:bg-gray-200 group-hover:text-gray-800"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <ul className="space-y-2 text-gray-700">
                      {[
                        "Django 백엔드 + Next.js 프론트엔드 기획 및 구현",
                        "시간대별 유입 패턴 분석 및 UX 최적화 반영",
                        "전체 API 설계 및 데이터 통합 관리",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-500 group-hover:text-gray-700" />
                          <span className="group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 relative">
                      <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-2">
                        <span className="text-sm font-medium">상세히 보기</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceAndProject

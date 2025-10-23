"use client"

import type React from "react"
import { Code, Server, Rocket } from "lucide-react"
import { motion } from "framer-motion"

const Introduce: React.FC = () => {
  return (
    <section
      id="introduce"
      className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-gray-100 rounded-full opacity-20" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-100 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:space-x-12 space-y-8 md:space-y-0">
          {/* Title area with decorative line */}
          <div className="md:w-1/4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">INTRODUCE</h1>
              <div className="h-1 w-16 bg-gray-800 mt-4 md:mx-0 mx-auto" />
            </motion.div>
          </div>

          {/* Description area with enhanced typography and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-3/4"
          >
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              {/* 헤드라인 */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 leading-tight">
                아이디어를 바로 제품으로 만드는 1인 풀스택 개발자 송승주
              </h2>

              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              {/* 엘리베이터 피치 */}
              <div className="mb-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  저는 인하대학교 컴퓨터공학과 4학년, 1인 풀스택 개발자 <span className="font-medium text-gray-900">송승주</span>입니다. 
                  프론트는 Next.js 15+와 Tailwind, shadcn/ui로 빠르게 UX를 검증하고, 백엔드는 Spring Boot·JPA·MariaDB로 안정적으로 서비스화합니다.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  AWS EC2·S3·CloudFront 기반 배포와 운영에 익숙하고, 영상·의료·데이터 분석 등 다양한 도메인의 사이드 프로젝트를 실제 사용자 검증 단계까지 끌고 간 경험이 있습니다. 
                  필요하면 기획·문서화·마케팅까지 직접 수행해 &ldquo;작동하는 서비스&rdquo;를 끝까지 완성합니다.
                </p>
              </div>

              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              {/* 프로필 요약 */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <Code className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    1인 풀스택 개발자이자 스타트업 지향형 메이커입니다. Next.js 15+·Tailwind·shadcn/ui로 프론트를, 
                    Spring Boot·JPA·MariaDB로 백엔드를, AWS로 인프라를 구성하여 기획→개발→배포→지표 검증을 일괄 수행합니다.
                  </p>
                </div>

                <div className="flex items-start">
                  <Server className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Totaload(중고차 수출 디지털 인증 SaaS), Trynic(광고용 AI 영상 웹), MediVu(의료영상 판독문 가명화/자동화), 
                    RunningToYou(러닝 기반 실물 만남 매칭), BrosGG(TFT 메타/전적 분석) 등 실전 프로젝트를 주도했습니다.
                  </p>
                </div>

                <div className="flex items-start">
                  <Rocket className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    빠른 학습과 완결형 실행력으로 초기 제품을 &ldquo;사용 가능한 수준&rdquo;까지 끌어올리는 데 강점이 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Introduce

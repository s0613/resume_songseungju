"use client"

import type React from "react"
import { Code, Server, Cloud, Rocket } from "lucide-react"
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
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                안녕하세요, <span className="font-medium text-gray-900">송승주</span>입니다. 저는 고객의 문제를 정의하고 기술로 해결하는{' '}
                &apos;<span className="font-medium text-gray-900">Problem Solver</span>&apos;입니다.
              </p>

              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Code className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Next.js와 TypeScript를 활용한 프론트엔드, Spring Boot와 MariaDB 기반의 백엔드를 구현하고, AWS 인프라
                    환경에서 EC2, S3, CloudFront, Nginx를 활용해 직접 서비스를 배포합니다.
                  </p>
                </div>

                <div className="flex items-start">
                  <Server className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    단순한 개발자가 아닌, 고객의 문제를 정의하고 이를 MVP로 실험하며 빠르게 해결하는 창업형 개발자로 활동하고 있습니다.
                    &quot;러닝 기반 매칭 서비스(RunningToYou)&quot;, &quot;의료영상 AI 판독 솔루션(MediVu)&quot; 등 실사용자 대상의 프로젝트를 직접 기획하고 주도해왔습니다.
                  </p>
                </div>

                <div className="flex items-start">
                  <Rocket className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    저는 완벽한 제품보다 빠른 문제 해결과 시장 검증을 중시합니다. 빠르게 만들고, 사용자에게 전달하고, 실질적인 피드백으로 발전시킵니다.
                  </p>
                </div>

                <div className="flex items-start">
                  <Cloud className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    지금 이 순간에도 문제 해결 중심의 개발을 이어가며, 더 나은 사용자 경험과 가치를 만드는 데 집중하고 있습니다.
                    함께 실험하고 성장할 기회를 찾고 있습니다.
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

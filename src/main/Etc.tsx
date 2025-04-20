"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Calendar, ChevronRight, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Etc: React.FC = () => {
  return (
    <section
      id="etc"
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
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">ETC</h1>
              <div className="h-1 w-16 bg-gray-800 mt-4 md:mx-0 mx-auto" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-3/4 space-y-8"
          >
            {/* Military Service */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">해병대 복무</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">2020.11 - 2022.05</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">통신병</Badge>
                    <Badge variant="secondary">병장 전역</Badge>
                  </div>

                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>Republic of Korea Marine Corps (해병대)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>강인한 정신력과 팀워크 경험을 바탕으로 협업 능력 강화</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Startup Club */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">창업 동아리</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Badge variant="secondary">인하벤처클럽</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>아이디어 발굴 및 비즈니스 모델 설계</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>팀 프로젝트를 통한 실전 창업 경험</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>프로젝트 기획 및 운영, 사용자 피드백을 바탕으로 서비스 개선</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">수상 내역</h2>

            {/* Awards cards */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">창업지원 단장상 Launch Pad 최우수상</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">2025.03</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>AI 기반 영상 생성 서비스 'Trynic' 프로젝트로 수상</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">실험실특화형 창업 아이템 선정</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">2023.09</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>의료영상 AI 판독 솔루션 'MediVu' 프로젝트로 선정</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Etc;

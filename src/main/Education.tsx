"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Education: React.FC = () => {
  return (
    <section
      id="education"
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
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">EDUCATION</h1>
              <div className="h-1 w-16 bg-gray-800 mt-4 md:mx-0 mx-auto" />
            </motion.div>
          </div>

          {/* Education content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-3/4 space-y-8"
          >
            {/* University Education */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">인하대학교</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">2020.03 ~ 2026.02</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Badge variant="secondary">컴퓨터공학과 졸업예정</Badge>
                  </div>

                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>알고리즘, 자료구조, 운영체제, 네트워크, 데이터베이스 등 기본 이론 습득</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>웹프로그래밍, 소프트웨어 공학 등 실습 중심 과목 수료</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>학부 프로젝트를 통해 팀 협업 및 발표 경험</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">C++</Badge>
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">Web</Badge>
                    <Badge variant="secondary">클라우드</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High School Education */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">온양고등학교</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">2017.03 ~ 2020.02</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Badge variant="secondary">일반고/이과</Badge>
                  </div>

                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>고등학교 1학년 방황</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>고등학교 2학년 과학중점반 입성, 성적 상승</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                      <span>고등학교 3학년 성적 더 상승 덕분에 인하대 합격. 담임 선생님 감사합니다.</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">벡터 1등급</Badge>
                    <Badge variant="secondary">영어 1등급</Badge>
                    <Badge variant="secondary">지구과학 1등급</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;

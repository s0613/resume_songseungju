"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="py-5 pt-20 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="flex flex-col space-y-8">
        {/* EDUCATION 제목 */}
        <div>
          <h1 className="text-3xl md:text-4xl mb-4 text-left text-blue-600">
            EDUCATION
          </h1>
        </div>

        {/* 첫 번째 교육: 인하대학교 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2020.03 ~ 2026.02
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                인하대학교{" "}
                <Badge variant="outline" className="bg-lime-300">
                  컴퓨터공학과 졸업예정
                </Badge>
              </span>
            </div>
          </div>
          {/* 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              학부과정
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                알고리즘, 자료구조, 운영체제, 네트워크, 데이터베이스 등 기본 이론
                습득
              </li>
              <li>
                웹프로그래밍, 소프트웨어 공학 등 실습 중심 과목 남김없이 수료
              </li>
              <li>학부 프로젝트를 통해 팀 협업 및 발표 경험</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                학사과정
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                C++
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Java
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Web
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                클라우드
              </Badge>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* 두 번째 교육: 온양고등학교 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2017.03 ~ 2020.02
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                온양고등학교{" "}
                <Badge variant="outline" className="bg-lime-300">
                  일반고/이과
                </Badge>
              </span>
            </div>
          </div>
          {/* 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              과학중점반
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>고등학교 1학년 방황</li>
              <li>고등학교 2학년 과학중점반 입성, 성적 상승</li>
              <li>
                고등학교 3학년 성적 더 상승 덕분에 인하대 합격. 담임 선생님 감사합니다.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                벡터 1등급
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                영어 1등급
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                지구과학 1등급
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

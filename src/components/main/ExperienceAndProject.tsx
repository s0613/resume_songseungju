"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-5 pt-20 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col space-y-8">
        {/* EXPERIENCE & PROJECT 제목 */}
        <div>
          <h1 className="text-3xl md:text-4xl mb-4 text-left text-blue-600">
            EXPERIENCE &amp; PROJECT
          </h1>
        </div>

        {/* 첫 번째 경험: 크레이지 스페이스 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2024.02 ~ 2025.12
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                크레이지 스페이스{" "}
                <Badge variant="outline" className="bg-lime-300">
                  10개월
                </Badge>
              </span>
            </div>
          </div>
          {/* 역할 및 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              팀장 및 백엔드 개발자
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                생성형 AI기반 한국어 교육 서비스 <strong>동반</strong> 기획 및 백엔드
                개발
              </li>
              <li>
                러닝 만남 서비스 <strong>러닝투유</strong> 기획 및 MVP 개발
              </li>
              <li>
                프로젝트 기획 및 운영, 사용자 피드백을 바탕으로 서비스 개선
              </li>
              <li>
                팀 관리 및 애자일 방법론 적용을 통한 효율적 프로젝트 운영
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Spring Boot
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                MariaDB
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                GitHub
              </Badge>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* 두 번째 경험: 첫 외주 프로젝트 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2025.01 ~ 2025.02
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                최적 진입 시간 웹사이트{" "}
                <Badge variant="outline" className="bg-lime-300">
                  2개월
                </Badge>
              </span>
            </div>
          </div>
          {/* 역할 및 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              풀스택 개발자
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>Django와 Next.js를 활용한 외주 프로젝트 기획 및 개발</li>
              <li>
                최적 진입 시간 분석을 통한 사용자 경험 개선 및 웹사이트 최적화
              </li>
              <li>백엔드 API 개발 및 프론트엔드 구현, 데이터 통합 관리</li>
              <li>고객과의 커뮤니케이션 및 프로젝트 관리</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Django
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Next.js
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                REST API
              </Badge>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* 세 번째 경험: RealFeel 프로젝트 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">2025.01 ~</span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                RealFeel{" "}
                <Badge variant="outline" className="bg-lime-300">
                  진행중
                </Badge>
              </span>
            </div>
          </div>
          {/* 역할 및 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              풀스택 개발자
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                <strong>AI 생성 이미지</strong>와 영상을 제공하는 웹사이트로,{" "}
                <strong> Next.js + Tailwind CSS</strong>를 이용해 프론트엔드 구현
              </li>
              <li>
                <strong>Spring Boot</strong> 기반 백엔드로 회원가입·로그인·검색 기능,{" "}
                <strong> AWS S3</strong>로 이미지 업로드 및 관리,{" "}
                <strong> EC2</strong>로 배포 환경 구성
              </li>
              <li>
                AI 모델로부터 생성된 콘텐츠를 실시간 반영해 사용자에게 제공
              </li>
              <li>
                회원가입 &amp; 로그인, 이미지 업로드, 검색 기능을 중점적으로 구현하여 사용자
                경험 최적화
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Next.js
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Tailwind CSS
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Spring Boot
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                AWS S3
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                AWS EC2
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                AI Integration
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

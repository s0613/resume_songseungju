"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-5 pt-20 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="flex flex-col space-y-8">
        {/* EXPERIENCE & PROJECT 제목 */}
        <div>
          <h1 className="text-3xl md:text-4xl mb-4 text-left text-blue-600">
            EXPERIENCE &amp; PROJECT
          </h1>
        </div>

        {/* MediVu 프로젝트 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2025.03 ~
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                MediVu{" "}
                <Badge variant="outline" className="bg-lime-300">
                  진행중
                </Badge>
              </span>
            </div>
          </div>
          {/* 역할 및 활동 내용 */}
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              프론트엔드 개발자 (기획 및 사업화 업무 병행)
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                AI 기반 의료영상 판독문 자동 생성 솔루션 서비스{" "}
                <strong>‘MediVu’</strong>의 초기 기획 및 런칭 참여
              </li>
              <li>
                병원을 타겟으로 한 <strong>랜딩페이지</strong>를 직접 제작하고
                사용자 흐름을 설계
              </li>
              <li>
                <strong>실험실특화형 창업 아이템</strong>으로 선정되기 위한{" "}
                사업계획서 작성 및 발표 자료(PPT) 제작 주도
              </li>
              <li>
                기획 단계에서 서비스 구조를 정리하고 기술 로드맵 수립에 기여
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                프론트엔드 개발
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                랜딩페이지 제작
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                창업중심대학
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                사업계획서 작성
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                발표 자료 제작
              </Badge>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Crazy Space 프로젝트 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2025.01 ~
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                Crazy Space{" "}
                <Badge variant="outline" className="bg-lime-300">
                  진행중
                </Badge>
              </span>
            </div>
          </div>
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              풀스택 개발자
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                레퍼런스 기반 AI 생성 이미지와 영상을 제공하는 웹사이트로,{" "}
                <strong> Next.js + Tailwind CSS</strong>를 이용해 프론트엔드
                구현
              </li>
              <li>
                <strong>Spring Boot</strong> 기반 백엔드로 회원가입·로그인·검색
                기능, <strong> AWS S3</strong>로 이미지 업로드 및 관리,{" "}
                <strong> CloudFront</strong>로 리소스 배포 환경 구성
              </li>
              <li>
                AI 모델로부터 생성된 콘텐츠를 실시간 반영해 사용자에게 제공
              </li>
              <li>
                <strong>창업지원 단장상 Launch Pad 최우수상</strong> 수상
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
                AWS S3, CloudFront
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                fal api
              </Badge>
            </div>
            <div className="mt-4 flex items-center">
              <a
                href="https://github.com/s0613/ai-website-front"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black hover:underline transition-all"
              >
                <img
                  src="/github-mark.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* 외주 프로젝트 */}
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

        {/* 나랑 팀해듀오 프로젝트 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2024.02 ~ 2025.12
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                나랑 팀해듀오{" "}
                <Badge variant="outline" className="bg-lime-300">
                  10개월
                </Badge>
              </span>
            </div>
          </div>
          <div className="mt-4 ml-0 md:ml-[25%]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              팀장 및 백엔드 개발자
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>
                생성형 AI기반 한국어 교육 서비스 <strong>동반</strong> 기획 및
                백엔드 개발
              </li>
              <li>
                러닝 만남 서비스 <strong>러닝투유</strong> 기획 및 MVP 개발
              </li>
              <li>
                프로젝트 기획 및 운영, 사용자 피드백을 바탕으로 서비스 개선
              </li>
              <li>팀 관리 및 애자일 방법론 적용을 통한 효율적 프로젝트 운영</li>
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
      </div>
    </section>
  );
};

export default Experience;

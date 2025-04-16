"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const CrazySpacePage: React.FC = () => {
    return (
        <section className="px-6 sm:px-10 md:px-20 lg:px-32 py-20 space-y-12">
            {/* 제목 */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">Crazy Space</h1>
                <p className="text-lg text-gray-600">
                    패션 중소기업을 위한 AI 기반 영상 생성 서비스
                </p>
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Image-to-Video</Badge>
                    <Badge variant="secondary">Prompt Tuning</Badge>
                </div>
            </div>

            {/* 서비스 개요 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Overview</h2>
                <p className="text-gray-700 text-justify">
                    Crazy Space는 패션 중소기업을 위한 AI 영상 생성 플랫폼으로, 누구나 모델을 선택하고
                    자사 의류 이미지를 입힌 후, 레퍼런스 영상을 기반으로 자신만의 패션 영상을 만들 수 있는
                    서비스입니다. 기존의 영상 제작 비용과 시간이 부담되던 소규모 브랜드들도 이 플랫폼을 통해
                    손쉽게 마케팅 콘텐츠를 생성할 수 있도록 돕습니다.
                </p>
                {/* <서비스 전체 흐름도 이미지> */}
            </div>

            {/* 주요 기능 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Main Features</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>모델 선택 및 AI 의상 입히기 기능</li>
                    <li>레퍼런스 영상을 기반으로 한 스타일 선택</li>
                    <li>프롬프트 및 의류 이미지 입력을 통한 AI 영상 생성</li>
                    <li>생성된 영상 다운로드 및 소셜 미디어 공유</li>
                </ul>
                {/* <AI 영상 생성 예시 이미지> */}
            </div>

            {/* 문제 정의 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Problem</h2>
                <p className="text-gray-700 text-justify">
                    패션 중소기업들은 제품을 홍보하기 위한 고퀄리티 영상 콘텐츠를 제작하기 위해 높은 비용과 시간이
                    소요되는 문제를 겪고 있습니다. 특히 모델 섭외, 촬영, 편집 등은 물리적인 제약이 많아 지속적인
                    콘텐츠 생산이 어려웠습니다.
                </p>
                {/* <전통적 영상 제작 프로세스 예시 이미지> */}
            </div>

            {/* 솔루션 설명 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Solution</h2>
                <p className="text-gray-700 text-justify">
                    Crazy Space는 AI 영상 생성 기술을 활용하여 실제 모델에 옷을 입히고, 기존 영상 스타일을
                    레퍼런스로 활용해 새로운 콘텐츠를 자동 생성합니다. 이를 통해 사용자는 비용과 시간의
                    부담 없이 마케팅 콘텐츠를 지속적으로 제작할 수 있습니다.
                </p>
                {/* <AI가 생성한 영상 샘플 이미지 or 비교 이미지> */}
            </div>

            {/* 기술 스택 및 시스템 구성 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Tech Stack & Architecture</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>프론트엔드: Next.js, Tailwind CSS, Shadcn/UI</li>
                    <li>백엔드: Spring Boot, JPA</li>
                    <li>AI 생성: Fal.ai image-to-video API</li>
                    <li>인프라: AWS EC2, S3, CloudFront, Nginx</li>
                </ul>
                {/* <시스템 아키텍처 다이어그램 이미지> */}
            </div>

            {/* 성과 및 향후 계획 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Progress & What’s Next</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Launch Pad 창업경진대회 최우수상 수상</li>
                    <li>AI 영상 퀄리티 향상 및 사용자 프롬프트 커스터마이징 기능 개발 예정</li>
                    <li>실제 패션 중소기업 대상 베타 테스트 준비 중</li>
                </ul>
                {/* <수상 관련 인증 이미지 또는 데모 영상 썸네일> */}
            </div>
        </section>
    );
};

export default CrazySpacePage;

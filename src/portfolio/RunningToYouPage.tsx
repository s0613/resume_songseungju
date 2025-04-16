"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const RunningToYouPage: React.FC = () => {
    return (
        <section className="px-6 sm:px-10 md:px-20 lg:px-32 py-20 space-y-12">
            {/* 제목 */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">RunningToYou</h1>
                <p className="text-lg text-gray-600">
                    러닝을 통해 자연스럽게 사람을 연결하는 데이팅 MVP 서비스
                </p>
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">MariaDB</Badge>
                    <Badge variant="secondary">AWS EC2</Badge>
                </div>
            </div>

            {/* 서비스 개요 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Overview</h2>
                <p className="text-gray-700 text-justify">
                    RunningToYou는 운동이라는 공통된 행위를 통해 자연스럽게 서로를 알아가는 새로운 형태의 만남 서비스를 제안합니다.
                    기존 데이팅 앱의 과몰입 구조나 불편한 채팅 중심의 상호작용을 배제하고, ‘함께 뛴다’는 경험을 중심으로 관계를 쌓도록 설계했습니다.
                </p>
                {/* <러닝 중 만남 장면 일러스트 또는 mockup 이미지> */}
            </div>

            {/* 문제 정의 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Problem</h2>
                <p className="text-gray-700 text-justify">
                    현재 대부분의 데이팅 앱은 사진 기반의 일방적인 판단, 과도한 채팅 중심 구조 등으로 인해 진정성 있는 관계 형성이 어렵고,
                    사용자 피로도가 높다는 문제가 있습니다. 특히 실외 활동 기반의 자연스러운 만남을 원하는 사용자층은 소외되고 있습니다.
                </p>
                {/* <기존 데이팅 앱 문제 시각화 이미지> */}
            </div>

            {/* 솔루션 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Solution</h2>
                <p className="text-gray-700 text-justify">
                    RunningToYou는 러닝이라는 가벼운 활동을 기반으로, 비슷한 속도와 관심사를 가진 사람들을 매칭합니다.
                    정해진 러닝 시간 동안 함께 뛰고, 이후 선택적으로 관심 표현을 할 수 있어 부담 없이 자연스럽게 관계를 이어갈 수 있습니다.
                </p>
                {/* <러닝 일정 잡기 UI or 매칭 시나리오 다이어그램> */}
            </div>

            {/* 기술 구성 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Tech Stack & Architecture</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>프론트엔드: Next.js + TypeScript</li>
                    <li>백엔드: Spring Boot + JPA</li>
                    <li>데이터베이스: MariaDB</li>
                    <li>배포: AWS EC2 + Nginx + HTTPS</li>
                    <li>운영: 수동 매칭 운영으로 초기 피드백 실험</li>
                </ul>
                {/* <전체 시스템 구성도 이미지> */}
            </div>

            {/* 주요 실행 경험 및 피드백 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Execution & Feedback</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>기획, 디자인, 프론트/백엔드, 배포까지 전 과정 단독 수행</li>
                    <li>Everytime 게시판을 활용해 타겟 유저 대상 MVP 소개 및 유입 유도</li>
                    <li>매칭은 수동으로 운영하며 사용자의 자연스러운 반응 관찰 및 개선</li>
                </ul>
                {/* <Everytime 마케팅 캡처 or 매칭 운영 플로우 이미지> */}
            </div>

            {/* 향후 계획 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">What’s Next</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>알고리즘 기반 자동 매칭 기능 설계</li>
                    <li>커뮤니티 기능 도입: 러닝 기록 공유 및 인증</li>
                    <li>소규모 그룹 러닝 매칭 기능 추가 예정</li>
                </ul>
                {/* <기능 로드맵 이미지> */}
            </div>
        </section>
    );
};

export default RunningToYouPage;

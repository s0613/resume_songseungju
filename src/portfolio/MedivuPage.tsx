"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const MediVuPage: React.FC = () => {
    return (
        <section className="px-6 sm:px-10 md:px-20 lg:px-32 py-20 space-y-12">
            {/* 제목 */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">MediVu</h1>
                <p className="text-lg text-gray-600">
                    PACS 연동 문제를 해결하는 AI 기반 의료영상 판독 솔루션 (기획 및 프로토타입 단계)
                </p>
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">MCP</Badge>
                    <Badge variant="secondary">PDF De-identification</Badge>
                </div>
            </div>

            {/* 서비스 개요 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Overview</h2>
                <p className="text-gray-700 text-justify">
                    MediVu는 병원 현장에서 실질적인 활용이 어려운 기존 AI 판독 솔루션의 한계를 극복하기 위해
                    기획된 서비스입니다. PACS 연동 문제, 표준화되지 않은 판독문 양식, 그리고 개인정보 보호
                    이슈를 해결하고자 하는 목표로 시작되었으며, 현재 초기 프로토타입을 제작 중입니다.
                </p>
                {/* <AI 기반 의료영상 판독 흐름도 이미지> */}
            </div>

            {/* 문제 정의 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Problem</h2>
                <p className="text-gray-700 text-justify">
                    병원에 AI 판독 솔루션이 도입되었음에도 불구하고, PACS와의 기술적 연동 부재로 인해 실질적인 사용이 제한되고 있습니다.
                    또한 의료 판독문은 병원과 전문의마다 형식과 용어가 달라 표준화가 어려우며, 환자 개인정보 보호 역시 AI 도입의 큰 장벽이 됩니다.
                </p>
                {/* <PACS 미연동 문제 시각화 이미지> */}
            </div>

            {/* 솔루션 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Solution</h2>
                <p className="text-gray-700 text-justify">
                    MediVu는 Model Context Protocol(MCP)을 활용한 구조를 기획하고 있습니다. 이를 통해 PACS에서 의료영상을 자동으로 받아오고,
                    AI가 분석하여 표준화된 판독문을 생성하는 자동화 흐름을 설계 중입니다. 또한 PDF 판독문 내 환자 정보를 자동 가명화하는 기능을 포함해
                    개인정보 보호 이슈도 함께 해결하고자 합니다.
                </p>
                {/* <MCP 기반 연동 구조 다이어그램 이미지> */}
            </div>

            {/* 기술 구성 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Tech Stack & Architecture</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>프론트엔드: Next.js + TypeScript 기반 랜딩페이지 프로토타입</li>
                    <li>PDF 가명화 모듈: Python 기반 PDF 텍스트 추출 + 식별정보 마스킹</li>
                    <li>AI 연동 구조: Model Context Protocol(MCP)을 활용한 구조 설계 중</li>
                </ul>
                {/* <전체 시스템 구성도 이미지> */}
            </div>

            {/* 현재 진행 상황 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Current Progress</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>실험실 특화형 선도대학 창업지원 사업계획서 단독 작성 및 제출</li>
                    <li>Next.js 기반 랜딩페이지 프로토타입 개발 진행 중</li>
                    <li>Python 기반 PDF 판독문 가명화 프로토타입 개발 중</li>
                </ul>
                {/* <랜딩페이지 캡처 이미지 or 사업계획서 제출 이미지> */}
            </div>

            {/* 향후 계획 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">What’s Next</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>MCP 연동 구조를 실제 영상 시스템과 연결 테스트 예정</li>
                    <li>AI 모델 기반 판독문 생성 퀄리티 향상</li>
                    <li>병원 기관 대상 베타테스트 준비 및 검토</li>
                    <li>DICOM 기반 연동 및 가명화 범위 확장 계획</li>
                </ul>
                {/* <베타 테스트 계획 다이어그램 이미지> */}
            </div>
        </section>
    );
};

export default MediVuPage;

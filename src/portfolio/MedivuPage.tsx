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
                    PACS 연동 문제를 해결하는 AI 기반 의료영상 판독 솔루션
                </p>
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">MariaDB</Badge>
                    <Badge variant="secondary">MCP</Badge>
                    <Badge variant="secondary">PDF De-identification</Badge>
                </div>
            </div>

            {/* 서비스 개요 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Overview</h2>
                <p className="text-gray-700 text-justify">
                    MediVu는 병원 현장에서 실질적인 활용이 어려운 기존 AI 판독 솔루션의 문제점을 해결하기 위해
                    기획된 프로젝트입니다. PACS와의 미연동 문제, 표준화되지 않은 판독문 양식, 그리고 개인정보 보호
                    이슈까지 해결할 수 있도록 설계되었습니다.
                </p>
                {/* <AI 기반 의료영상 판독 흐름도 이미지> */}
            </div>

            {/* 문제 정의 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Problem</h2>
                <p className="text-gray-700 text-justify">
                    현재 많은 병원에서는 AI 판독 솔루션이 도입되었지만, PACS와의 연동이 이루어지지 않아
                    실질적인 사용이 불가능한 경우가 많습니다. 또한 판독문 형식이 표준화되어 있지 않아 병원 간,
                    전문의 간 문서 품질 차이가 존재하며, 환자의 개인정보 처리 문제로 AI 판독 결과의 활용이 제한되고 있습니다.
                </p>
                {/* <PACS 미연동 문제 시각화 이미지> */}
            </div>

            {/* 솔루션 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Solution</h2>
                <p className="text-gray-700 text-justify">
                    MediVu는 MCP(Multimodal Context Protocol) 기반 구조를 도입하여 PACS로부터 CT/MRI 영상과
                    관련 데이터를 자동으로 연동하고, AI가 이를 바탕으로 판독문을 생성하는 솔루션입니다. 또한 PDF 판독문에서
                    환자 정보를 자동 가명화하여 의료법 및 개인정보보호법을 준수합니다.
                </p>
                {/* <MCP 기반 연동 구조 다이어그램 이미지> */}
            </div>

            {/* 기술 구성 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Tech Stack & Architecture</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>프론트엔드: Next.js + TypeScript 기반 대시보드</li>
                    <li>백엔드: Spring Boot 기반 REST API</li>
                    <li>데이터베이스: MariaDB</li>
                    <li>PDF 가명화 모듈: Python 기반 PDF 추출 + 식별정보 마스킹</li>
                    <li>AI 인터페이스: MCP 프로토콜 적용 설계</li>
                </ul>
                {/* <전체 시스템 구성도 이미지> */}
            </div>

            {/* 주요 성과 및 진행 상황 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Progress & Outcome</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>실험실 특화형 선도대학 창업지원 사업계획서 제출</li>
                    <li>서비스 구조 설계 및 MCP 기반 흐름도 완성</li>
                    <li>랜딩페이지 UI/UX 디자인 및 개발 진행 중</li>
                    <li>PDF 판독문 가명화 프로토타입 개발 중</li>
                </ul>
                {/* <랜딩페이지 캡처 이미지 or 사업계획서 제출 이미지> */}
            </div>

            {/* 향후 계획 */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">What’s Next</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>AI 분석 정확도 개선 및 전자동화 기능 추가</li>
                    <li>의료 기관 베타테스트 준비</li>
                    <li>PDF 외 DICOM 기반 자동 가명화 모듈 추가 개발 예정</li>
                </ul>
                {/* <베타 테스트 계획 다이어그램 이미지> */}
            </div>
        </section>
    );
};

export default MediVuPage;

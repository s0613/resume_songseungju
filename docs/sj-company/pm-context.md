# PM Context — resume_songseungju

## 프로젝트 개요
송승주 개인 사이트(songseungju.dev). Next.js App Router 기반. 이력서형 메인 + 개인 블로그(/blog) + 제품 페이지 2개(/s-skills, /open-trader) + 포트폴리오 상세 12개(/portfolio/*)로 구성. 2026-07 현재 "퍼스널 브랜딩 사이트"로 전환 중 — 목표 포지셔닝은 **AI 에이전트 빌더**.

## 주요 사용자
- 채용 담당자·협업 제안자 (링크 공유로 유입)
- S-Skills / open-trader 오픈소스에 관심 있는 개발자
- 블로그 독자 (AI 에이전트 개발 콘텐츠)

## 개발 단계
production (실배포: www.songseungju.dev, EC2+nginx)

## 핵심 제약조건
- 명화 비주얼 모티프(씨름도·아담의 창조·비너스의 탄생)는 브랜드 자산으로 유지
- 메인은 CSS Modules(home.module.css) 에디토리얼 디자인 — 취향 프로필 preserve 모드 적용 대상
- src/main/* 구버전 이력서 컴포넌트는 미사용 죽은 코드
- Header.tsx는 포트폴리오 상세에서만 렌더되며 구버전 앵커(/#skill 등)가 깨져 있음
- OG 이미지 전무, 포트폴리오 12개 중 3개만 페이지별 metadata 보유
- sitemap.ts에 블로그 슬러그 하드코딩

## 기술 스택 요약
Next.js 16(App Router), React 19, TypeScript, CSS Modules + Tailwind(구버전 잔재), framer-motion. 콘텐츠는 src/data/{blog,insights}.ts에 하드코딩.

## 히스토리
- 2026-07-27: 초기 생성 — AI 에이전트 빌더 브랜딩 개편 사이클 시작
- 2026-07-27 [run:20260727-081336-49493]: 포지셔닝은 문장 반복이 아니라 라벨("AI 에이전트 빌더")만 통일하고 설명은 페이지별 변형 — Codex 교차 검토 합의. "풀스택 개발자" 키워드는 SEO 보조 정체성으로 유지해야 검색 유입이 안 깨진다.
- 2026-07-27 [run:20260727-081336-49493]: 사용자 확정 — 이력서성 콘텐츠는 삭제 아닌 축소, Flagship(S-Skills·open-trader) 강조 + 12개 아카이브 구조. 도메인 이메일 전환은 코드 밖 후속 과제.

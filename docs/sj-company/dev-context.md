# Dev Context — resume_songseungju

## 기술 스택
- Next.js 16 (App Router) + React 19 + TypeScript
- 스타일: 신규 페이지는 CSS Modules(`home.module.css`, `s-skills.module.css`, `open-trader.module.css`, `blog.module.css`) — 다크 에디토리얼 톤. 구버전 잔재는 Tailwind(`src/main/*`, `Header/Footer`).
- 애니메이션: framer-motion (구버전), 신규 페이지는 CSS 위주
- 콘텐츠 데이터: `src/data/blog.ts`(블로그 6편), `src/data/insights.ts`(인사이트) — 파일 하드코딩
- 배포: EC2 + nginx (appspec.yml, nginx-resume.conf)

## 디렉토리 컨벤션
- 라우트: `src/app/**/page.tsx` (얇은 래퍼) → 실제 화면은 `src/portfolio/*Page.tsx` 또는 라우트 파일 자체
- 메인 페이지는 `src/app/page.tsx` 단일 파일 + `home.module.css` (self-contained, `"use client"`)
- 공통: `src/components/common/{Header,Footer}.tsx` — 구버전, 렌더 조건 분기 많음

## 핵심 계약
- 디자인 preserve 모드: 명화 배경 + 다크 골드 에디토리얼. 새 컬러 토큰 추가 금지, home.module.css 기존 클래스 체계 재사용
- 도메인: https://www.songseungju.dev (metadataBase 설정됨)
- 포지셔닝 라벨: "AI 에이전트 빌더" (2026-07 브랜딩 개편)

## 히스토리
- 2026-07-27: 초기 생성 — 브랜딩 개편 사이클에서 작성
- 2026-07-27 [run:20260727-081336-49493]: Next.js metadata는 필드 단위 얕은 병합 — 자식이 openGraph를 정의하면 루트 openGraph(파일 컨벤션 og:image 포함)가 통째로 대체된다. 자식 title/description만 바꿔도 og:title은 루트 값이 상속되므로 상세 페이지는 openGraph를 명시해야 함 (Codex 교차 리뷰로 발견).
- 2026-07-27 [run:20260727-081336-49493]: 포트폴리오 메타 단일 소스는 src/data/portfolio.ts의 buildPortfolioMetadata(slug) — 메인 Archive·상세 metadata·sitemap이 모두 이 파일 참조. 예외: upflowax는 승인 카피 유지로 title/description 자체 정의.
- 2026-07-27 [run:20260727-081336-49493]: OG 이미지 라우트(satori)는 CSS 변수를 못 읽어 브랜드 색을 리터럴로 사용 — home.module.css 토큰 값과 수동 동기화 필요.

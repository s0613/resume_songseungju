# Frontend Output — Phase 2 메타데이터·SEO 인프라
> 작성: sj-dev-frontend (frontend-phase2) · 2026-07-27

## 변경 파일
- `src/app/layout.tsx`: title 템플릿(`%s | 송승주`) + 핵심/보조 정체성을 담은 description 개편, OG/Twitter(summary_large_image) 메타 추가, Person(sameAs: GitHub·LinkedIn) + WebSite JSON-LD 삽입(`JSON.stringify` + `dangerouslySetInnerHTML`, 정적 제어 데이터).
- `src/app/opengraph-image.tsx` (신설): 루트 OG 이미지. Google Fonts CSS API에서 Noto Sans KR TTF를 fetch→ArrayBuffer로 로드하는 검증된 패턴. 실패 시 영문 전용("SONG SEUNGJU — AI Agent Builder")으로 자동 폴백. `home.module.css`의 브랜드 색상 리터럴(`#1a1008`, `rgb(212,168,50)`, `#f0e6cc`)을 그대로 재사용.
- `src/app/blog/[slug]/opengraph-image.tsx` (신설): 블로그 글 제목을 넣은 동적 OG. 같은 폰트 로딩 패턴 재사용, `params`가 Promise임을 Next.js 16 라우트 로더 소스 확인 후 반영.
- `src/data/portfolio.ts` (신설): 12개 프로젝트 slug·name·title·description·date·tags 단일 소스. `getPortfolioProject(slug)` 헬퍼 포함.
- `src/app/page.tsx`: `EXPERIENCES` 상수를 `portfolioProjects.map(...)`로 교체(데이터 소스만 교체, 렌더 구조·정렬 순서 동일).
- `src/app/portfolio/{cogmo,curlcode,indexkit,medivu,mone,runningtoyou,s-skills,totaload,trynic}/page.tsx`: `getPortfolioProject(slug)` 기반 `export const metadata` 추가 (9개, metadata 없던 페이지 전부).
- `src/app/portfolio/{totaroweb,totarocos}/page.tsx`: 기존 metadata 텍스트가 `portfolio.ts`와 완전히 동일해 안전하게 같은 소스로 정합(텍스트 변경 없음).
- `src/app/sitemap.ts`: 하드코딩 슬러그 제거. `portfolioProjects`(포트폴리오 12) · `posts`(블로그 6, `src/data/blog.ts`) · `articles`(인사이트 1, `src/data/insights.ts`)에서 프로그래밍적으로 생성.
- `src/app/blog/layout.tsx`: description에 "AI 에이전트 빌더" 라벨을 자연스럽게 삽입(기존 톤 유지).

## 구현 요약
루트 메타데이터를 "AI 에이전트 빌더" 핵심 정체성 + "풀스택 개발자·Next.js·TypeScript·Spring Boot" 보조 정체성(기존 SEO 키워드 유지) 조합으로 개편하고, Person/WebSite JSON-LD를 삽입했다. OG 이미지는 루트·블로그 상세 2종 모두 실제 빌드에서 한글 폰트가 정상 로드되어 렌더됨을 스크린샷으로 확인했다(폴백 로직도 구현했으나 이번 빌드 환경에서는 트리거되지 않음). 포트폴리오 12개 프로젝트를 `src/data/portfolio.ts` 단일 소스로 통합해 메인 Archive·9개 포트폴리오 페이지 메타·sitemap.ts가 모두 같은 데이터를 참조하도록 정리했다.

## Backend 계약 의존성
없음 (정적 콘텐츠·메타데이터 전용 작업, API 호출 없음).

## 검증 결과
- `npm run build` exit 0. 라우트 표: `○ /opengraph-image`(정적 프리렌더, 175KB PNG), `ƒ /blog/[slug]/opengraph-image`(동적).
- `next start` 기동 후 `curl` 확인: `GET /opengraph-image` → `200 image/png`, `GET /blog/harness-obsidian-long-term-memory/opengraph-image` → `200 image/png`. 두 이미지 모두 스크린샷으로 한글 렌더 확인(다크 배경 + 골드 텍스트, 브랜드 톤 일치).
- `sitemap.xml` 총 24개 `<url>` — 루트1 + s-skills1 + open-trader1 + blog인덱스1 + 블로그6 + insights인덱스1 + insight글1 + 포트폴리오12 = 24, 하드코딩 슬러그 0.
- 홈 index.html: `<title>송승주 — AI 에이전트 빌더 · 풀스택 개발자</title>`, `"AI 에이전트"` 29회 매치 / `"온양고"` 0회, `href="/blog/{slug}"` 링크 3개(harness-obsidian-long-term-memory·making-my-own-harness·starting-london-system-agent) 렌더 확인, Person/WebSite JSON-LD 2개 스크립트 모두 확인.
- 포트폴리오 12개 라우트 전부 고유 `<title>` 확인(예: `Cogmo 안녕 | Portfolio | 송승주`, `S-Skills | Portfolio | 송승주` 등).

## 알려진 제약 / 후속 작업
- `src/app/portfolio/upflowax/page.tsx`는 손대지 않았다 — 기존 metadata description("제안부터 정산까지 하나의 워크스페이스")이 `portfolio.ts`의 값("제안부터 정산까지, DDD 도메인 캔버스·RTM·손익 통합")과 텍스트가 달라, "유지" 원칙을 우선해 소스 통합을 보류했다. Tech Lead 판단 필요: (a) `portfolio.ts`를 페이지 기존 문구로 맞추고 import 전환, 또는 (b) 페이지별 변형 허용 원칙에 따라 현행 유지.
- OG 이미지의 영문 실패 폴백은 코드로 구현했지만 이번 빌드·로컬 검증에서는 Google Fonts fetch가 항상 성공해 실제로 트리거되지 않았다. 배포 환경(EC2/nginx)에서 외부 fetch가 차단되면 자동으로 영문 폴백("SONG SEUNGJU — AI Agent Builder")이 나가는 구조이나, 실환경 스모크 테스트는 배포 후 재확인 권장.
- OG 이미지 라우트는 satori 렌더러 특성상 CSS 변수(`var(--gold)` 등)를 읽을 수 없어 `home.module.css`와 동일한 색상 값을 리터럴로 하드코딩했다(취향 프로필 C08 관련 — 신규 색상 발명이 아니라 기존 토큰 값의 리터럴 재사용이며, 다른 방법이 없는 satori/ImageResponse 렌더링 경계의 기술적 제약).
- 보안 리뷰가 남긴 주의사항(JSON-LD 인라인 `<script>`는 향후 CSP 도입 시 nonce 처리 대상)은 그대로 유효 — 이번 작업 범위 밖의 인프라 과제로 남겨둔다.
- `npm run build` 검증 후 `.next` 디렉토리는 삭제했다(빌드 산출물, git 비추적).

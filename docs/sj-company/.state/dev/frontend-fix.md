# Frontend Output — Codex 교차 리뷰 결함 10건 수정 (재디스패치 1회차)
> 작성: sj-dev-frontend (frontend-fix) · 2026-07-27

## 변경 파일
- `src/data/portfolio.ts`: `buildPortfolioMetadata(slug)` 헬퍼 추가 — title/description/openGraph(url·type)/alternates.canonical을 단일 소스에서 생성.
- `src/app/portfolio/{cogmo,curlcode,indexkit,medivu,mone,runningtoyou,s-skills,totaload,totarocos,totaroweb,trynic}/page.tsx` (11개): `getPortfolioProject` 직접 사용 → `buildPortfolioMetadata(slug)` 호출로 교체. og:title/description/canonical 자체 값 확보.
- `src/app/portfolio/upflowax/page.tsx`: 기존 승인 title/description 유지, `openGraph`(url="/portfolio/upflowax", type="website")·`alternates.canonical` 자체 추가.
- `src/app/s-skills/layout.tsx`: 고유 title("S-Skills — Claude Code 멀티 에이전트 하네스")·description·openGraph(url)·canonical 신설.
- `src/app/open-trader/layout.tsx`: 고유 title("open-trader — LLM 트레이딩 하네스")·description·openGraph(url)·canonical 신설.
- `src/app/blog/layout.tsx`: title을 "승주의 AI 블로그"(접미사 제거, 루트 템플릿이 " | 송승주" 부착)로 정정, `openGraph.images: ["/opengraph-image"]` 추가.
- `src/app/blog/page.tsx`: 자체 `metadata` export 제거(층layout.tsx로 단일화) — title 중복 정의·중복 접미사 원인 제거.
- `src/app/blog/[slug]/page.tsx`: `generateMetadata`에 `twitter: { card, title, description }` 추가.
- `src/app/sitemap.ts`: `lastModified`를 콘텐츠 날짜 기반으로 파싱하는 함수 3종(`parseDotDate`/`parseYearMonthDate`/`parsePortfolioDate`) 추가, 파싱 실패 시 고정 폴백(`FALLBACK_DATE`) 사용. 정적 페이지(홈·s-skills·open-trader·블로그 목록·인사이트 목록)는 `lastModified` 필드 생략.
- `src/components/common/Footer.tsx`: 렌더 제외 조건에 `pathname.startsWith("/blog")` 추가 — 블로그 자체 `<footer>`와 전역 Footer 중복 렌더 제거.
- `src/components/common/PageMain.tsx` (신규): `usePathname` 기반으로 `/`,`/s-skills`,`/blog`,`/open-trader` 하위 경로는 `<div>`로 감싸고(자체 `<main>` 보유), 그 외(포트폴리오 상세 등 자체 `<main>` 없는 페이지)는 `<main>`으로 감싸는 클라이언트 컴포넌트. Header/Footer와 동일한 pathname 분기 패턴 재사용.
- `src/app/layout.tsx`: body의 `<main>{children}</main>`을 `<PageMain>{children}</PageMain>`로 교체(중첩 main 제거, 랜드마크 보존), `SITE_DESCRIPTION`에 "React"·"포트폴리오" 키워드 자연스럽게 삽입.
- `src/app/s-skills/page.tsx`: 히어로 H1 `"SJ COMPANY"` → `"S-SKILLS"` (nav 로고·install 명령과 브랜딩 정합).

## 구현 요약
Codex 교차 리뷰에서 확인된 10개 결함(포트폴리오 OG/canonical 누락, s-skills·open-trader 메타 상속, 블로그 title 중복 접미사, og:image 누락, 블로그 글 twitter 메타 누락, sitemap 허위 lastmod, /blog 푸터 중복, 중첩 `<main>`, s-skills H1 브랜딩 충돌, 루트 description 키워드 누락)을 각각 최소 수정으로 해결했다. 포트폴리오 메타는 `portfolio.ts`의 `buildPortfolioMetadata` 헬퍼로 12개 페이지가 중복 없이 단일 소스를 참조하도록 통합했고(upflowax만 승인 카피 유지 + og/canonical 자체 추가), 중첩 `<main>` 문제는 기존 Header/Footer가 쓰던 pathname 분기 패턴을 재사용한 `PageMain` 컴포넌트로 랜드마크 손실 없이 해결했다.

## 기계 검증 결과 (`npm run build` exit 0, 30개 라우트 생성 확인)
- `.next/server/app/portfolio/cogmo.html`: `og:title="Cogmo 안녕 | Portfolio"`, `canonical="https://www.songseungju.dev/portfolio/cogmo"` — 확인 (12개 포트폴리오 페이지 전부 canonical 1건씩 보유, upflowax 포함).
- `.next/server/app/blog.html`: `<title>승주의 AI 블로그 | 송승주</title>` (접미사 1회), `og:image` 1건(`https://www.songseungju.dev/opengraph-image`), `<footer` 1개 — 확인.
- `.next/server/app/s-skills.html`: `<title>S-Skills — Claude Code 멀티 에이전트 하네스 | 송승주</title>` — 확인.
- `.next/server/app/open-trader.html`: `<title>open-trader — LLM 트레이딩 하네스 | 송승주</title>` — 확인.
- `.next/server/app/index.html`: `<main` 1개 — 확인 (포트폴리오 상세·s-skills·open-trader·blog·insights 전 라우트에서도 각 1개씩 검증).
- `.next/server/app/sitemap.xml.body`: 총 24 URL, `lastmod` 19건 중 고유값 15개(2024-10 ~ 2026-07 분포) — 단일 빌드 시각 아님 확인. 정적 5페이지는 `lastmod` 생략.
- `.next/server/app/blog/harness-obsidian-long-term-memory.html`: `twitter:title="하네스가 실행하고, 옵시디언이 기억합니다"` — 홈 값 상속 아님 확인.
- `npx tsc --noEmit` 통과.
- Playwright 스크린샷(`/s-skills`, 1440×900)으로 H1 "S-SKILLS" 렌더 및 기존 레이아웃 무변화 육안 확인.

## 알려진 제약 / 후속 작업
- `PageMain.tsx`는 이번 태스크 지시([SCOPE] 목록에 명시되지 않음)에 대한 최소 신규 파일이다. `src/app/layout.tsx`(스코프 내)에서만 사용되며 forbidden 파일은 건드리지 않았다. Tech Lead 검토 시 이 파일 신설이 스코프 해석상 문제가 없는지 확인 권장.
- `/s-skills/insights/[slug]` 페이지는 이제 s-skills/layout.tsx의 메타를 상속 경로가 하나 더 생겼으나 자체 `generateMetadata`가 이미 있어 실질 영향 없음(확인 완료).
- `Footer.tsx`의 `/s-skills` 제외 조건은 여전히 `pathname === "/s-skills"`(startsWith 아님)라 `/s-skills/insights`에서는 전역 Footer가 렌더될 수 있음 — 이번 스코프(작업 7: `/blog`만 명시) 밖이라 미수정, 후속 확인 권장.
- 개발 서버 포트 3000이 로컬 환경에서 Obsidian 프로세스가 선점 중이라(`lsof` 확인) 시각 검증은 격리 포트(3901)로 수행함 — QA 시 참고.
- 루트 description 키워드 보강 문장("...포트폴리오와 블로그를 포함해 기획부터 배포까지...")은 톤 유지 목적의 최소 수정이며, 별도 카피 리뷰 필요 시 조정 가능.

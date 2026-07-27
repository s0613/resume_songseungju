# Frontend Output — Phase 3 레거시·정합성 정리
> 작성: sj-dev-frontend (frontend-phase3) · 2026-07-27

## 변경 파일
- `src/main/HeroSection.tsx`, `Introduce.tsx`, `Skill.tsx`, `ExperienceAndProject.tsx`, `Education.tsx`, `Etc.tsx`: 삭제. `src/main/` 디렉토리 자체 제거. 삭제 전 `grep -rn "main/" src/app src/components src/portfolio` 및 컴포넌트명 기준 참조 0건 확인, 삭제 후 재확인 0건.
- `src/components/common/Header.tsx`: `menuItems` 배열을 새 메인 섹션 구조(`#builds`/`#writing`/`#archive`/`#about`)에 맞게 재작성. 기존 6개 항목(SSJ/Introduce/Skill/Expe&proj/Education/ETC, 구버전 앵커 `#skill`·`#experienceAndProject` 등 전부 깨져 있었음) → 5개 항목(SSJ + Builds/Writing/Archive/About)으로 축소. 컴포넌트 구조·조건부 렌더 로직은 그대로 유지(최소 변경).
- `src/components/common/Footer.tsx`: 렌더 조건(`if (pathname === ...) return null`) 및 레이아웃 변경 없음. Copyright 문구만 "© 2025 송승주의 포트폴리오." → "© 2025 송승주 · AI 에이전트 빌더."로 1줄 수정.
- `src/app/s-skills/page.tsx`: `installAlts`에서 `href="#"`인 "macOS / Linux", "Windows" 데드 링크 2개 제거. GitHub 링크는 유지.
- `src/portfolio/OpenTraderPage.tsx`: 히어로의 기존 `heroNote`(비너스 인용구) 바로 아래 같은 클래스로 면책 문구 1줄 추가 — "본 프로젝트는 페이퍼 트레이딩 전용 오픈소스 하네스이며, 투자 자문이나 수익 보장을 제공하지 않습니다." 새 CSS 클래스 추가 없음(기존 `heroNote` 재사용).

## 구현 요약
죽은 코드(src/main/* 6개, 총 1,633줄) 삭제로 코드 사다리를 낮췄고, Header의 깨진 앵커를 새 메인 섹션 ID와 정합시켰다. Footer는 렌더 조건·디자인을 건드리지 않고 브랜딩 문구만 최소 수정. s-skills 데드 링크 제거와 open-trader 면책 문구는 지시된 범위 내에서 기존 클래스만 재사용해 처리했다.

## 검증
- `npx tsc --noEmit` 통과(에러 0).
- `grep -rn "main/" src/app src/components src/portfolio` 및 컴포넌트명 검색 — 삭제 전/후 모두 참조 0건.
- 격리된 포트(3901)에서 별도 dev 서버 기동 후 `/`, `/portfolio/s-skills`, `/s-skills`, `/open-trader`, `/blog` 전부 200 확인 (공유 포트 3000의 500은 Phase 2 동시 작업발 Turbopack 캐시 이슈로, 격리 서버에서는 재현되지 않아 내 변경과 무관함을 확인).
- Playwright 스크린샷으로 목업 대비 확인: Header 새 앵커(`/#builds`, `/#writing`, `/#archive`, `/#about`) 렌더 확인(curl grep), s-skills 설치 영역에서 데드 링크 2개 제거·GitHub만 노출 확인(스크린샷), open-trader 히어로에 면책 문구 렌더 확인(스크린샷), Footer 브랜딩 문구 렌더 확인(curl grep).
- 최종 `npm run build` 1회 실행 — exit 0, 30개 라우트 전부 생성 성공(포트폴리오 12개·블로그·s-skills·open-trader 포함), `src/main/` 부재 상태로 빌드 통과.

## 알려진 제약 / 후속 작업
- Header가 실제로 렌더되는 페이지는 현재 `/portfolio/*` 상세뿐(홈/블로그/s-skills/open-trader는 자체 nav로 조기 return). 따라서 `href` 삼항 조건의 "포트폴리오 외 페이지" 분기(`isPortfolioPage ? ... : "#builds"` 등)는 사실상 도달하지 않는 죽은 분기이지만, 최소 변경 원칙에 따라 구조는 유지하고 값만 갱신함 — 추후 Header 재사용처가 없다면 삼항 분기 자체를 단순화할 여지 있음(이번 스코프 밖).
- s-skills 페이지의 Features 섹션에 있는 `<a href="#">More Details →</a>` (6곳)도 데드 링크이지만 이번 태스크 지시 범위(installAlts 2개)를 벗어나 손대지 않음. 후속 정리 대상으로만 기록.
- open-trader에는 이미 별도의 상세 면책 블록(`discBlock`, "교육·연구 목적의 오픈소스입니다")이 존재해 내용이 다소 중복되지만, PM 지시가 정확한 문구를 명시했으므로 별도 줄로 추가했다. 필요 시 두 문구 통합은 후속 카피 정리 태스크로 넘김.
- 공유 dev 서버(포트 3000)가 Phase 2와의 동시 작업으로 Turbopack panic(500)을 겪고 있었음 — 내 변경과 무관함을 격리 포트에서 확인했으나, QA는 최종 검증 시 서버 재시작 또는 새 dev 세션 사용을 권장.

# Team Channel — Phase 1: AI 에이전트 빌더 브랜딩 메인 페이지 재구성
> 프로젝트: resume_songseungju  |  경로: /Users/songseungju/me/resume_songseungju
> 시작: 2026-07-27


---
## [frontend] ✅ DONE
핵심 변경: 메인을 Hero(2줄 포지셔닝+CTA 1종) · Flagship Builds(S-Skills/open-trader) · Writing(blog.ts 3편) · Project Archive(12개 컴팩트) · About+Contact 구조로 재구성. home.module.css는 preserve 모드로 기존 토큰만 사용(신규 color token 0). `npm run build` exit 0, 320/768/1024/1440 가로 오버플로우 0.
후속 에이전트 주의사항:
- Phase 2(메타데이터): 메인 h1은 여전히 "SONG SEUNGJU"(hero-heading), 포지셔닝 문구는 `.heroLead`/`.heroTitle` 본문에 있음. 새 섹션 앵커는 #builds·#writing·#archive·#about이므로 sitemap·JSON-LD·OG 카피 작성 시 이 구조 기준. Writing 노출 slug 3개: harness-obsidian-long-term-memory / making-my-own-harness / starting-london-system-agent. 포트폴리오 12개 목록은 아직 page.tsx의 `EXPERIENCES` 상수에 있음 — `src/data/portfolio.ts` 단일 소스화 시 메인도 그 소스를 읽도록 교체 필요(현재는 읽기 전용 경로 제약으로 미이관).
- Phase 3(레거시): 메인은 `src/main/*`·`Header`·`Footer` 컴포넌트를 전혀 참조하지 않음(자체 nav/footer) → 삭제해도 메인 영향 없음. 메인 nav/footer에서 /blog·/s-skills·/open-trader 링크는 모두 실재 라우트로 확인됨.
블로커: 없음

---
## [security · review] ✅ PASS
frontend Result Card와 `src/app/page.tsx`·`src/app/home.module.css` diff(+395/-360) 보안 회귀 검토 완료. **CRITICAL 0 / HIGH 0 / MEDIUM 0 / LOW 2(둘 다 회귀 아님)** → 머지 차단 사유 없음.
확인된 사항:
- 외부 링크 `target="_blank"` 5곳 전부 `rel="noopener noreferrer"` 유지(182·206·210·257·394). Builds 링크는 `startsWith("/")` 분기로 내부 `<Link>` / 외부 `<a rel=...>`가 정확히 갈림.
- `dangerouslySetInnerHTML`·`innerHTML`·`eval` 리포 전체 0건. 신규 동적 값(blog.ts title/excerpt/date)은 JSX 텍스트로 React 이스케이프됨, 출처는 리포 내 정적 데이터.
- 클립보드/localStorage/fetch/process.env 사용 0건. 설치 명령 코드 블록은 실행·복사 자동화 없는 순수 텍스트.
- 신규 외부 리소스 0건(CSS에 url()/@import 추가 없음, Image src 전부 로컬 /public).
- PII는 오히려 감소 — 온양고·해병대 상세 3건 삭제. 신규 PII 카테고리·시크릿 리터럴 0건.
후속 에이전트 주의사항:
- LOW#1: mailto 인스턴스 3→4건(About CTA 추가). 동일 주소가 이미 공개돼 있어 회귀 아님. 도메인 메일 전환 시 3곳 일괄 교체 필요.
- LOW#2: **기존부터** CSP/HSTS/X-Frame-Options 등 보안 헤더가 리포 전체에 없음(`next.config.ts` 빈 설정). 이번 변경과 무관하며 이 태스크 차단 사유 아님 — 별도 인프라 태스크로 분리 권장.
- Phase 2에서 JSON-LD/OG 추가 시 인라인 `<script type="application/ld+json">`을 쓰게 되면 CSP 도입 시점에 nonce 처리 대상이 되므로 함께 고려할 것.
상세: `docs/sj-company/.state/dev/_review-security.md`

---
## [frontend-phase3] ✅ DONE
핵심 변경: src/main/* 죽은 코드 6개 파일(1,633줄) 삭제 + 디렉토리 제거, Header.tsx 깨진 앵커를 새 메인 섹션(#builds/#writing/#archive/#about)에 맞춰 수정, Footer.tsx 브랜딩 문구 1줄 갱신(렌더 조건 불변), s-skills 데드 링크(macOS/Windows href="#") 2개 제거, open-trader 히어로에 페이퍼 트레이딩 면책 문구 1줄 추가(기존 heroNote 클래스 재사용).
후속 에이전트 주의사항:
- Header는 현재 실질적으로 `/portfolio/*` 상세 페이지에서만 렌더됨(홈/블로그/s-skills/open-trader는 자체 nav로 조기 return) — QA는 포트폴리오 상세 페이지에서 새 앵커(`/#builds` 등)가 메인(`/`)의 해당 섹션으로 정확히 스크롤되는지 확인 권장.
- s-skills Features 섹션의 `<a href="#">More Details →</a>` 6곳은 이번 스코프(installAlts 2개) 밖이라 미수정 — 후속 정리 대상.
- 공유 dev 서버(3000)에서 Phase 2와의 동시 컴파일로 인한 Turbopack panic(500)을 관찰했으나 격리 포트(3901)에서는 재현 안 됨 — 내 변경과 무관. `npx tsc --noEmit` 통과, 최종 `npm run build` exit 0(30개 라우트 전부 생성, src/main 부재 상태) 확인 완료.
블로커: 없음

---
## [frontend-phase2] ✅ DONE
핵심 변경: 루트 메타데이터(title 템플릿·핵심+보조 정체성 description·Person/WebSite JSON-LD) 개편, 루트+블로그 상세 OG 이미지 2종(한글 폰트 fetch 로딩 검증 완료, 빌드에서 실제 렌더 스크린샷 확인), `src/data/portfolio.ts` 단일 소스로 메인 Archive·9개 포트폴리오 metadata·sitemap.ts 통합, sitemap.ts를 blog.ts/insights.ts/portfolio.ts 기반 프로그래밍 생성으로 전환.
후속 에이전트 주의사항:
- OG 라우트 경로: `/opengraph-image`(정적), `/blog/[slug]/opengraph-image`(동적, params는 Promise). QA는 `curl -o /dev/null -w "%{http_code} %{content_type}"`로 두 경로 모두 200/image-png 확인 가능.
- `portfolio.ts` 스키마: `{ slug, name, title, description, date, tags }`, `getPortfolioProject(slug)` 헬퍼 제공. 메인 페이지 EXPERIENCES와 9개 포트폴리오 metadata, sitemap.ts가 전부 이 파일을 참조.
- `src/app/portfolio/upflowax/page.tsx`는 기존 metadata 문구가 portfolio.ts와 달라 의도적으로 미전환 — Tech Lead 판단 필요(Result Card 참조).
- sitemap.xml 총 24 URL, 하드코딩 슬러그 0건.
블로커: 없음

---
## [frontend-fix] ✅ DONE
핵심 변경: Codex 교차 리뷰 결함 10건 전부 수정 — ① 포트폴리오 12개(`portfolio.ts`의 `buildPortfolioMetadata` 헬퍼로 og:title/description/canonical 단일 소스화, upflowax는 승인 카피 유지+og/canonical만 자체 추가) ② s-skills·open-trader layout.tsx 고유 메타 신설 ③ blog title 중복 접미사 제거(page.tsx metadata를 layout.tsx로 단일화) ④ blog og:image 명시(`openGraph.images: ["/opengraph-image"]`) ⑤ blog/[slug] twitter 메타 추가 ⑥ sitemap.ts lastModified를 콘텐츠 날짜 파싱 기반으로 전환(폴백 포함, 정적 페이지는 필드 생략) ⑦ Footer.tsx `/blog` 제외 조건 추가 ⑧ 신규 `PageMain.tsx`(Header/Footer와 동일 pathname 분기 패턴)로 중첩 `<main>` 제거하며 랜드마크 보존 ⑨ s-skills H1 "SJ COMPANY"→"S-SKILLS" ⑩ 루트 SITE_DESCRIPTION에 React·포트폴리오 키워드 보강.
QA 주의사항:
- `npm run build` exit 0(30 라우트), `npx tsc --noEmit` 통과. 기계 검증 전항목(og:title/canonical/title 중복/og:image/footer 개수/main 개수/sitemap lastmod 다양성) `.next/server/app/*.html`·`.next/server/app/sitemap.xml.body`에서 직접 grep 확인 완료 — 상세는 `docs/sj-company/.state/dev/frontend-fix.md` 참조.
- 로컬 개발 포트 3000이 Obsidian 프로세스에 선점돼 있어(무관한 500 응답) 시각 검증은 포트 3901로 수행함. QA도 포트 충돌 여부 먼저 확인 권장.
- `PageMain.tsx`는 스코프에 명시되지 않은 신규 파일(Tech Lead 검토 권장) — `src/app/layout.tsx`에서만 사용, forbidden 파일(page.tsx/home.module.css/src/portfolio/*) 미변경.
- Footer.tsx `/s-skills` 제외 조건이 여전히 정확일치(`=== "/s-skills"`)라 `/s-skills/insights`에서 전역 Footer가 뜰 수 있음 — 이번 스코프 밖, 후속 과제로 남김.
블로커: 없음

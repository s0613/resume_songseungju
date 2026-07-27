# Security Review — Phase 1 메인 재구성
> 작성: sj-dev-security · 2026-07-27
> 모드: review
> 검토 대상: `docs/sj-company/.state/dev/frontend.md` → `src/app/page.tsx`, `src/app/home.module.css`

## 검토 범위
`git diff src/app/page.tsx src/app/home.module.css` (+395 / -360) 전체와 변경 후 파일 현재 상태.
정적 사이트(서버 로직·API·DB·인증 없음)이므로 인증/인가·SQLi·시크릿 관리는 해당 없음(N/A).
프론트엔드 회귀 벡터(XSS, 링크 위생, PII, 외부 리소스, 브라우저 API)에 집중.

## 발견 (CRITICAL / HIGH / MEDIUM / LOW)

### CRITICAL — 머지 차단
없음.

### HIGH — 머지 전 수정 권장
없음.

### MEDIUM
없음.

### LOW — 후속 작업 (모두 회귀 아님)

- **[frontend] `src/app/page.tsx:382` — mailto 인스턴스 3건 → 4건 증가**
  About 섹션 CTA로 `farchicken00@naver.com` mailto가 하나 추가됐다. 동일 주소가 히어로(202)·푸터(393)에 이미 평문 노출되어 있어 **노출 카테고리 변화는 없고 회귀 아님**. 다만 평문 mailto는 크롤러 수집 대상이 되므로, 스팸이 늘면 후속으로 도메인 메일 전환 또는 난독화/폼 전환을 검토. → 조치 불필요(정보 공유). frontend.md 후속 작업 항목과 동일한 인식.

- **[infra/none] `next.config.ts` — 보안 헤더 미설정 (기존 상태, 이번 변경과 무관)**
  `Content-Security-Policy` / `Strict-Transport-Security` / `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy` 가 리포지토리 전체에 설정되어 있지 않다(`next.config.ts`는 빈 설정). 이번 diff가 만든 문제가 아니므로 **이 태스크의 머지 차단 사유가 아니다.** 정적 개인 사이트로 위험도는 낮으나, 향후 별도 태스크에서 `next.config.ts`의 `headers()` 또는 호스팅 플랫폼 헤더 설정으로 추가 권장. → 담당: 별도 인프라/frontend 태스크.

## 회귀 체크리스트 결과

**링크 위생 (외부 링크)**
- [x] `target="_blank"` 5곳 전부 `rel="noopener noreferrer"` 보유 — page.tsx:182, 206, 210, 257, 394. 누락 0건.
- [x] 신규 `BUILDS` 링크 렌더링이 `l.href.startsWith("/")` 분기로 내부는 `<Link>`, 외부는 `<a target="_blank" rel="noopener noreferrer">`로 정확히 갈린다(page.tsx:252-260). 외부 URL이 `rel` 없는 경로로 새는 케이스 없음.
- [x] diff에서 제거된 링크 중 `rel`을 잃은 항목 없음(제거분은 전부 내부 앵커 `#introduce`/`#skills`/`#experience`/`#education`).
- [x] 신규 외부 도메인은 `github.com/s0613/S-skills`, `github.com/Totaro-int/claude-trade-harness` 2건 — 둘 다 본인 소유 GitHub 리포지토리, `javascript:`·데이터 URI·리디렉터 없음.

**XSS**
- [x] `dangerouslySetInnerHTML` 리포지토리 전체 0건 (신규 도입 없음).
- [x] `innerHTML` / `eval(` / `new Function` 0건.
- [x] 신규 동적 렌더 값(`p.title`, `p.excerpt`, `p.date`, `b.problem` 등)은 전부 JSX 텍스트 자식으로 들어가 React 기본 이스케이프 적용. 데이터 출처는 리포 내 정적 `src/data/blog.ts`이며 사용자 입력·원격 응답이 아님.
- [x] `/blog/${p.slug}` 템플릿 URL의 slug는 하드코딩된 `FEATURED_POST_SLUGS` 3개를 `posts`에서 조회한 값 — 외부 주입 경로 없음.
- [x] `buildInstall` 코드 블록(`claude plugin install s0613/S-skills`)은 정적 문자열 텍스트 렌더. 실행·복사 자동화 없음.

**브라우저 API 오남용**
- [x] `navigator.clipboard` / `document.*` 직접 조작 / `window` 전역 접근 0건 — 클립보드 API는 도입되지 않았고, 설치 명령은 사용자가 직접 선택·복사하는 순수 텍스트다.
- [x] `localStorage` / `sessionStorage` 사용 0건 (토큰 저장 이슈 N/A).
- [x] `fetch(` / 신규 네트워크 호출 0건.
- [x] `process.env` 참조 0건 — 클라이언트 번들로 새는 환경변수 없음.

**외부 리소스 로딩**
- [x] CSS diff에 `url(` / `@import` / `http(s):` / `expression(` 추가분 0건 — 신규 폰트·이미지·스타일 외부 로딩 없음.
- [x] `<script>` 태그·서드파티 스크립트 신규 추가 0건 (SRI/CSP 검토 대상 증가 없음).
- [x] `<Image>` src 전부 로컬 `/public` 자산(`/ssireum.webp`, `/IM.webp`) — 원격 호스트 없음, `next.config` remotePatterns 확장 불필요.

**개인정보(PII)**
- [x] **노출 감소(개선)**: 기존 Education/ETC 블록의 고교(온양고)·병역(해병대) 상세 3건이 삭제되어 공개 PII 표면이 줄었다. 학력은 대학 1줄로 축소.
- [x] 신규 노출된 PII 카테고리 없음 — 전화번호·주소·생년월일·주민번호 패턴 0건.
- [x] 이메일은 기존 공개분과 동일 주소(추가 인스턴스 1건은 위 LOW 참고).
- [x] 시드/더미 데이터에 타인 실명·연락처 포함 없음.

**시크릿**
- [x] diff 내 API 키·토큰·비밀번호 리터럴 0건. 변경 파일은 TSX/CSS 뿐이며 CI·Dockerfile·`.env*` 변경 없음.

## 판정: PASS

이번 변경은 보안 회귀를 도입하지 않았다. 오히려 고교·병역 상세 제거로 공개 PII가 줄었고, 신규 외부 링크는 전부 `rel="noopener noreferrer"`를 갖췄다. CRITICAL/HIGH 0건이므로 머지 차단 사유 없음.

## 알려진 제약 / 후속 작업
- 보안 헤더(CSP/HSTS/X-Frame-Options 등) 미설정은 이번 태스크 이전부터의 상태이며 별도 태스크로 분리 권장 — 이번 머지의 차단 사유 아님.
- 그 외 요구사항을 막는 미해결 보안 항목: 없음.

# Team Channel — 블로그 실시스템화

---
## [backend] ✅ DONE
핵심 변경: Supabase 서버 전용 클라이언트(`src/lib/supabase-admin.ts`) + 조회수·댓글 Route Handler 3종(`src/app/api/blog/views/[slug]`, `src/app/api/blog/comments/[slug]`, `.../[slug]/[id]`) 구현, 실제 Supabase 대상 curl 시나리오 전체 검증 완료.

후속 에이전트 주의사항 (frontend용 API 계약 요약):
- `GET/POST /api/blog/views/[slug]` → `{ count: number }`. POST 1회 호출 = +1 (멱등 아님) — 상세 페이지 진입 시 정확히 1번만 호출할 것(StrictMode 이중 마운트 주의).
- `GET /api/blog/comments/[slug]` → `{ comments: [{ id, name, body, created_at }] }` (오름차순, password_hash 없음).
- `POST /api/blog/comments/[slug]` body `{ name, password, body, website? }` → 성공 201 `{ comment }`. `website`는 화면에 보이지 않는 honeypot 입력(예: `display:none` 또는 `position:absolute; left:-9999px`, `tabIndex={-1}`, `autoComplete="off"`)으로 폼에 심어두고 사용자에게는 노출 금지. 값이 채워지면 204만 오고 실제 저장 안 됨(정상 동작).
- `DELETE /api/blog/comments/[slug]/[id]` body `{ password }` → 200 `{ ok:true }` / 403 `{ error:"wrong_password" }` / 404 `{ error:"not_found" }`.
- 공통: env 미설정 시 전 라우트 503 `{ error: "not_configured" }` → 프론트는 이 코드를 받으면 조회수·댓글 섹션을 숨기거나 "댓글 기능을 사용할 수 없습니다" 안내로 graceful degrade(페이지 자체는 정상 렌더 유지).
- 필드 검증 실패는 400 `{ error: "invalid_body", reason: "name"|"password"|"body"|"invalid_json" }` — reason으로 어떤 입력창에 에러 표시할지 분기 가능(이름 1~40자, 비밀번호 4자 이상, 본문 1~2000자).
- 존재하지 않는 slug(=`src/data/blog.ts`에 없는 slug) 호출 시 400 `{ error: "invalid_slug" }` — 신규 블로그 포스트 추가 시 blog.ts에 등록되어야 API가 정상 동작함.
- 로컬 검증은 격리 포트 **3902**에서 수행(`npx next dev --turbopack -p 3902`) — 개발 중 포트 충돌 방지용으로 참고.

블로커: 없음

---
## [frontend] ✅ DONE
핵심 변경: 블로그 상세에 ViewCounter(진입 1회 증가·503이면 미표시)와 Comments(이름·비밀번호 2열 + 대형 textarea + 인라인 비밀번호 삭제) 클라이언트 컴포넌트를 붙이고, 인사이트 아티클을 blog.ts "S-Skills" 카테고리 포스트로 이관 후 /s-skills/insights 라우트·데이터 삭제 + 301(308) 리다이렉트 연결.

후속 에이전트 주의사항 (QA용):
- 검증 포트: **3902** (`npx next dev --turbopack -p 3902`). 검증 후 종료함 — QA는 재기동 필요.
- 이관 slug: `s-skills-in-one` (구 URL `/s-skills/insights/s-skills-in-one` → `/blog/s-skills-in-one`, 목록은 `/s-skills/insights` → `/blog?category=s-skills`). Next의 `permanent: true`이므로 응답 코드는 301이 아니라 **308**(동일한 영구 리다이렉트).
- 정리한 테스트 데이터: `blog_comments` 잔여 0건, `blog_views`의 `s-skills-in-one` 행(count 3) 삭제 완료 → 두 테이블 모두 잔여 행 없음. QA가 조회수 테스트를 하면 행이 다시 생기므로 종료 후 동일하게 정리 필요.
- `/blog`는 정적 유지를 위해 `?category=` 필터를 클라이언트에서 적용한다(초기 HTML = 전체 목록 → 하이드레이션 후 필터). 프리렌더 HTML 검사 시 "필터가 안 걸렸다"고 오판하지 말 것.
- 조회수는 방문마다 +1(중복 방지 없음). StrictMode 이중 증가는 없음을 delta=1로 확인함.
- `npm run build` exit 0, `tsc --noEmit` 에러 0. ESLint는 리포지토리에 사전 존재하는 설정 오류로 실행 불가(이번 변경과 무관).
블로커: 없음

---

## [review-security] ✅ PASS (조건부)
CRITICAL 0건 → 머지 차단 없음. 상세: `docs/sj-company/.state/dev/_review-security.md`

실증 검증(정적 리뷰 아님):
- `next build` 산출물 전체(.next/static + .next/server/app 프리렌더 HTML)에서 `.env.local` 실제 값 4종 grep → **유출 0건**. JWT/supabase 호스트 패턴도 클라이언트 번들에 0건.
- `server-only` 가드 실효성: 임시 `"use client"` 컴포넌트에서 `getSupabaseAdmin()` import 후 빌드 → **하드 실패 확인**(가드가 주석이 아니라 실제 차단). 임시 파일·수정 원복 완료.
- 라이브 DB에 anon 키로 read-only 프로브 4종(`blog_comments` select, `password_hash` select, `blog_views` select, `rpc/increment_blog_view`) → **전부 401 42501 permission denied**. RLS/REVOKE가 실제 적용됨.
- 신규 의존성(`@supabase/supabase-js` 2.110.8 / `bcryptjs` 3.0.3 / `server-only` 0.0.1) 취약점 0건.
- IDOR·slug 인젝션·XSS·password_hash 응답 유출·에러 정보 노출 전부 반박 실패(방어 확인).

머지 전 필수 조치 1건:
- **H-1**: `supabase/.temp/`가 gitignore 미적용(`git check-ignore` exit 1) + `?? supabase/` 상태 → `git add .` 하면 CLI 로컬 상태(project ref, Vercel org id)가 커밋된다. `supabase/.gitignore`에 `.temp/` 추가할 것. ※ `pooler-url`에는 **비밀번호 성분 없음**을 파싱으로 확인 → 자격증명 유출 아님.

후속 티켓(판정 미반영):
- **H-2**(PM 수용): rate limit 부재. 수용된 건 "스팸"이었는데, 별개로 bcryptjs(순수 JS) cost 10이 요청당 이벤트 루프를 ~100ms 블로킹 → CPU/과금 소진 + DELETE 비밀번호(최소 4자) 온라인 브루트포스가 가능. 코드 0줄 완화책은 Vercel WAF 경로별 rate limit.
- **M-1** 바디 크기 제한 없음(App Router는 sizeLimit 미적용, Vercel 4.5MB 상한에만 의존) / **M-2** 비밀번호 상한 없음 → bcrypt 72바이트 절삭으로 다른 비밀번호가 통과 / **M-3** CSP·HSTS·X-Frame-Options 등 보안 헤더 전무(UGC 도입으로 위험도 상승) / **M-4** 기존 `sharp`·`postcss` high 취약점(이번 변경 무관).
- LOW 5건(에러 객체 전체 로깅, honeypot 오탐 시 무음 소실, "비밀번호" 라벨의 재사용 유도, `.commentName` 오버플로, text/plain CSRF는 영향 없음으로 조치 불필요).

블로커: 없음

---

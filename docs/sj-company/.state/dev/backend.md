# Backend Output — 블로그 조회수·댓글 API (Supabase 서버 전용 연결)
> 작성: sj-dev-backend · 2026-07-27

## 변경 파일
- `src/lib/supabase-admin.ts` (신설): 서버 전용 Supabase 클라이언트. `import "server-only"`로 클라이언트 번들 유입 시 빌드 에러 강제. `getSupabaseAdmin()`은 `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` 미설정 시 `null` 반환(캐시됨).
- `src/app/api/_lib/blog-api.ts` (신설): 공통 헬퍼 — slug 형식(`[a-z0-9-]{1,100}`) + `src/data/blog.ts` posts 존재 여부 검증(`isValidSlug`), uuid 형식 검증(`isValidUuid`), 표준 에러 응답(`notConfiguredResponse` 503, `invalidSlugResponse` 400, `invalidBodyResponse` 400, `dbErrorResponse` 500 — 내부 에러는 `console.error`로만 기록).
- `src/app/api/blog/views/[slug]/route.ts` (신설): GET/POST 조회수.
- `src/app/api/blog/comments/[slug]/route.ts` (신설): GET/POST 댓글.
- `src/app/api/blog/comments/[slug]/[id]/route.ts` (신설): DELETE 댓글(비밀번호 검증).
- `package.json` / `package-lock.json`: `@supabase/supabase-js`, `bcryptjs`, `server-only`를 dependencies에, `@types/bcryptjs`를 devDependencies에 추가.

모든 라우트는 `export const runtime = "nodejs"` + `export const dynamic = "force-dynamic"`, Next.js 16 규약에 따라 `{ params: Promise<{...}> }`를 `await`하여 사용.

## API 계약
### GET /api/blog/views/[slug]
- Response 200: `{ count: number }` (행 없으면 0)
- Errors: 400 `{ error: "invalid_slug" }` (형식 불일치 또는 blog.ts에 없는 slug) / 503 `{ error: "not_configured" }` / 500 `{ error: "db_error" }`

### POST /api/blog/views/[slug]
- Request body 없음
- Response 200: `{ count: number }` — RPC `increment_blog_view` 호출로 원자적 증가
- Errors: 위와 동일

### GET /api/blog/comments/[slug]
- Response 200: `{ comments: [{ id: string, name: string, body: string, created_at: string }] }` (created_at 오름차순, **password_hash 미포함 — select 컬럼 명시**)
- Errors: 400 / 503 / 500 (위와 동일)

### POST /api/blog/comments/[slug]
- Request: `{ name: string(1~40), password: string(4자 이상), body: string(1~2000), website?: string }` (`website`는 honeypot — 미노출 폼 필드로 프론트가 구현)
- Response 201: `{ comment: { id, name, body, created_at } }`
- Honeypot: `website`에 값이 있으면 **본문 검증 없이** 204(No Content) — 스팸봇에게는 성공처럼 보이나 실제 저장 안 함
- Errors: 400 `{ error: "invalid_slug" }` / 400 `{ error: "invalid_body", reason: "name"|"password"|"body"|"invalid_json" }` / 503 / 500

### DELETE /api/blog/comments/[slug]/[id]
- Request body: `{ password: string }`
- Response 200: `{ ok: true }`
- Errors: 400 `{ error: "invalid_slug" }` / 400 `{ error: "invalid_id" }` (uuid 형식 아님) / 400 `{ error: "invalid_body", reason: "password" }` / 403 `{ error: "wrong_password" }` (비밀번호 불일치) / 404 `{ error: "not_found" }` (해당 slug+id 댓글 없음) / 503 / 500

### 공통 에러 규약
- env 미설정: 모든 라우트 503 `{ error: "not_configured" }` — 프론트는 이 코드로 graceful degrade(섹션 숨김/안내) 처리
- 알 수 없는 Supabase 오류: 500 `{ error: "db_error" }` (내부 메시지 절대 미노출)

## Database 의존성
- 사용 테이블: `public.blog_views`, `public.blog_comments`
- 사용 RPC: `public.increment_blog_view(p_slug text) returns bigint`
- 신규/변경 컬럼: 없음 (마이그레이션 `supabase/migrations/20260727000001_blog_views_comments.sql` 그대로 사용)
- RLS: anon 전면 차단 검증 완료 → 모든 접근은 `SUPABASE_SERVICE_ROLE_KEY` 경유(서버 전용)

## 검증 결과
- `npx tsc --noEmit`: 통과 (에러 0)
- dev 서버 격리 포트 **3902**에서 실제 Supabase 프로젝트(oxsdlupyhwfhlglkeuop) 대상 curl 시나리오 전체 통과:
  - `GET views` (행 없음) → `{"count":0}` 200
  - `POST views` × 2 → `{"count":1}` → `{"count":2}` (원자적 증가 확인)
  - 잘못된 slug 형식(`Not_Valid_Slug`) → 400 `invalid_slug`
  - 형식은 유효하나 존재하지 않는 slug(`no-such-post-xyz`) → 400 `invalid_slug`
  - honeypot(`website` 채움) → 204, 실제 댓글 미생성
  - 정상 댓글 생성 → 201, `comment.id` 확보
  - 필드 검증 실패(비밀번호 3자) → 400 `invalid_body`
  - `GET comments` → 목록에 방금 작성한 댓글 포함, 응답 문자열에 `password_hash` 없음 확인(grep)
  - `DELETE` 틀린 비밀번호 → 403 `wrong_password`
  - `DELETE` 존재하지 않는 id → 404 `not_found`
  - `DELETE` 올바른 비밀번호 → 200 `{"ok":true}`, 이후 `GET comments`에서 제거 확인
  - 테스트로 생성된 `blog_views` 카운트(hello-im-songseungju, count=2)는 검증 후 별도 1회성 스크립트로 삭제하여 정리 완료(재확인: `GET views` → `count:0`)
- 보안 점검: `grep -rn "eyJ" src` 0건, `grep -rn "supabase.co" src` 0건(코드 내 URL 하드코딩 없음, env로만 참조), `.env.local`은 `.gitignore`의 `.env*` 패턴에 포함되어 미추적 확인(`git check-ignore -v .env.local`)
- `supabase-admin` import는 `src/app/api/**` 서버 라우트 3곳에서만 발생 (클라이언트 컴포넌트 import 없음)

## 알려진 제약 / 후속 작업
- `POST /api/blog/comments/[slug]`의 필드 검증 실패 시 `invalid_body`에 `reason` 필드를 추가해 프론트가 어떤 필드가 문제인지 표시할 수 있도록 함 — PM 브리프에 명시되지 않은 부가 정보이므로 필요 없으면 프론트에서 무시 가능.
- 조회수 증가는 멱등하지 않음(호출마다 +1) — 프론트에서 상세 페이지 진입 시 **1회만** POST하도록 (예: `useEffect` 의존성 배열/StrictMode 이중 호출 주의) 구현 필요. 백엔드에서 클라이언트별 중복 방지는 하지 않음(요구사항 범위 밖, over-engineering 방지).
- rate limiting은 구현하지 않음 (PM 브리프: "과설계 금지 — reCAPTCHA 등 도입 안 함" 방침에 따름). 스팸 방어는 길이 제한 + honeypot만.
- `supabase/` 마이그레이션 폴더는 이번 작업에서 직접 만들지 않았으며(다른 에이전트/사용자가 이미 적용) 그대로 참조만 함.

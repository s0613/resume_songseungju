# Security Review — 블로그 조회수·댓글 시스템
> 작성: sj-dev-security · 2026-07-27
> 모드: review (LENS=security, 적대 리뷰)
> 대상: `src/lib/supabase-admin.ts`, `src/app/api/**`, `src/components/blog/**`, `supabase/migrations/**`, `next.config.ts`, `package.json` + backend/frontend Result Card

## 검증 방법 (주장 검증 → 반박 시도)
정적 리뷰에 더해 다음을 **실증**했다.

| # | 공격 가설 | 실증 방법 | 결과 |
|---|---|---|---|
| 1 | service_role 키가 클라이언트 번들에 유출 | `next build` 후 `.env.local`의 실제 값 4개를 `.next/static` + `.next/server/app`(프리렌더 HTML 포함) 전체 바이너리 grep | **유출 0건**. JWT 패턴·`*.supabase.co` 호스트 패턴도 `.next/static`에서 0건 |
| 2 | `server-only` 가드가 실효성 없음(주석 수준) | 임시 `"use client"` 컴포넌트에서 `getSupabaseAdmin()` import 후 `next build` | **빌드 하드 실패** (`'server-only' cannot be imported from a Client Component module`). 가드 실효 확인. 테스트 파일·수정분은 원복 완료 |
| 3 | RLS/권한이 실제 DB에 적용 안 됨 → anon 키로 `password_hash` 직접 조회 | `.env.local`의 실 anon 키로 라이브 프로젝트에 read-only 프로브 4건 | 전부 **401 `42501 permission denied`** (`blog_comments` select, `password_hash` select, `blog_views` select, `rpc/increment_blog_view`). 쓰기 없음 |
| 4 | Content-Type 미검증 → 폼 기반 CSRF | Node `Request.json()`에 `text/plain` 바디 투입 | **파싱됨**(아래 L-1 참조. 다만 ambient 인증이 없어 권한 상승 불가) |
| 5 | 신규 의존성 자체 취약점 | `npm audit --omit=dev` | `@supabase/supabase-js@2.110.8`, `bcryptjs@3.0.3`, `server-only@0.0.1` **취약점 0건** (기존 transitive 이슈만 존재 → M-4) |

---

## 발견

### CRITICAL — 머지 차단
**없음.** 위 #1~#3으로 최대 위험(service_role 유출·DB 직접 노출)은 정적·동적 양쪽에서 반박에 실패했다.

---

### HIGH — 머지 전 수정 권장

**H-1 [backend/infra] `supabase/.temp/` 가 gitignore 되지 않은 채 워킹트리에 존재 — `git add .` 시 커밋됨**
- 파일: `supabase/.temp/linked-project.json`, `supabase/.temp/pooler-url`, `supabase/.temp/project-ref` (+6)
- 재현: `git status` → `?? supabase/` (untracked). `git check-ignore -v supabase/.temp/pooler-url` → **exit 1 = 미차단**. `.gitignore`에는 `.env*`만 있고 `supabase/.temp` 규칙 없음.
- 내용: 링크된 프로젝트 ref `oxsdlupyhwfhlglkeuop`, Vercel org config id `icfg_uzh2m7eLwdCn6oZucaXeiZ0x`, 풀러 호스트/포트.
- **완화 요인(중요):** `pooler-url`을 파싱해 확인한 결과 **비밀번호 성분이 없다**(`postgresql://postgres.<ref>@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`, 97자, userinfo에 `:pw` 구간 없음). 즉 자격증명 유출은 **아님**. 그래서 CRITICAL이 아니라 HIGH.
- 영향: 리포지토리에 인프라 식별자·조직 id가 영구 기록되고, CLI 로컬 상태가 커밋 노이즈로 남는다. 이후 CLI 명령/버전에 따라 같은 경로에 자격증명이 쓰이면 그때는 그대로 유출된다.
- 조치: `supabase/.gitignore`에 `.temp/`(및 `.branches/`) 추가, 또는 루트 `.gitignore`에 `supabase/.temp/`. 커밋 전 `git status`에서 `supabase/.temp` 미노출 확인.

**H-2 [backend] 인증 없는 상태변경 엔드포인트 3종에 남용 통제가 전무 — bcrypt CPU 소진 + 무제한 쓰기 (PM 수용 리스크, 판정에는 미반영)**
- 파일: `src/app/api/blog/comments/[slug]/route.ts:77` (`bcrypt.hash`, cost 10), `.../[id]/route.ts:51` (`bcrypt.compare`), `src/app/api/blog/views/[slug]/route.ts:40`
- 재현: 인증·토큰·CAPTCHA·IP 스로틀이 없으므로 `for i in {1..N}; curl -XPOST .../api/blog/comments/<slug> -d '{"name":"a","password":"1234","body":"x"}'` 로 무제한 행 생성. honeypot은 `website` 키를 **생략만 하면** 우회되므로(route.ts:64) 봇 방어 효과는 사실상 0. `POST /api/blog/views/<slug>`도 호출당 +1 무한.
- 추가 관점(백엔드 Result Card에 미기재): **bcryptjs는 순수 JS 구현**이라 cost 10 해싱이 Node 이벤트 루프를 ~100ms+ 블로킹한다. 동시 요청 N개 = 함수 인스턴스 전체 정지 + Vercel 실행시간 과금 증폭. DELETE도 동일 비용이라 **온라인 비밀번호 무차별 대입**(최소 4자, 숫자 4자리면 10^4)이 성립하고, 성공 시 임의 댓글 삭제가 가능하다.
- 판단: PM 브리프의 "rate limit 미구현" 방침을 존중해 **판정에는 반영하지 않는다**. 다만 수용된 것은 "스팸 유입"이었고 **CPU/과금 소진과 삭제 비밀번호 온라인 브루트포스는 별개 리스크**이므로 명시적 수용 기록이 필요하다.
- 최소 비용 완화 제안(코드 변경 거의 없음): Vercel WAF/Firewall의 경로별 rate limit 규칙(코드 0줄), DELETE 실패 시 지연 추가, 또는 삭제 비밀번호 최소 길이를 4 → 6으로 상향.

---

### MEDIUM — 후속 작업

**M-1 [backend] 요청 바디 크기 제한 없음 → 메모리/파싱 DoS**
- 파일: `src/app/api/blog/comments/[slug]/route.ts:58`, `.../[id]/route.ts:32`
- 재현: `await request.json()`이 **길이 검증(line 72~74)보다 먼저** 전체 바디를 버퍼링한다. App Router Route Handler에는 Pages Router의 `bodyParser.sizeLimit`이 적용되지 않는다. 100MB JSON을 POST하면 2000자 제한에 걸리기 전에 메모리를 먹는다.
- 완화 요인: Vercel Serverless의 플랫폼 요청 바디 상한(≈4.5MB)이 프로덕션에서 방어. 자체 호스팅 시 방어 없음.
- 조치: `request.headers.get("content-length")`가 임계값(예: 16KB) 초과면 413 즉시 반환.

**M-2 [backend] 비밀번호 최대 길이 미검증 → bcrypt 72바이트 무음 절삭**
- 파일: `src/app/api/blog/comments/[slug]/route.ts:73` (`password.length < 4`만 검사, 상한 없음)
- 재현: 73바이트 이상 비밀번호로 댓글 등록 후, 앞 72바이트만 같은 **다른** 비밀번호로 DELETE → 성공. bcrypt 규격상 키가 72바이트에서 절삭되기 때문.
- 조치: `password.length > 72`(또는 128) 시 `invalid_body` 반환.

**M-3 [frontend/infra] 보안 헤더 전무 — CSP / X-Frame-Options / Referrer-Policy / HSTS 미설정**
- 파일: `next.config.ts` (이번 변경에서 `redirects()`만 추가, `headers()` 없음)
- 재현: 설정·빌드 산출물 어디에도 헤더 정의 없음. 이 변경으로 사이트가 **사용자 생성 콘텐츠(UGC)를 렌더하는 성격으로 바뀌었는데** 방어 계층이 0이다.
- 현재 실제 XSS 싱크는 없음(아래 "반박 실패" 표 참조)이나, 향후 댓글에 마크다운·링크 렌더를 붙이는 순간 완충재가 없다. 글로벌 룰(`web/security.md`)이 프로덕션 CSP를 요구.
- 조치: `next.config.ts`에 `headers()`로 `Content-Security-Policy`(최소 `object-src 'none'; base-uri 'self'; frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` 추가.

**M-4 [기존 / 이번 변경 무관] 런타임 의존성 취약점 잔존**
- `npm audit --omit=dev` → 7건(high 6, moderate 1): `sharp <0.35.0`(libvips CVE-2026-33327/33328/35590/35591), `postcss <=8.5.17`, `picomatch`, `yaml`. 모두 `next` transitive.
- `sharp`는 `next/image` 최적화·`opengraph-image` 경로에서 **서버 런타임에 사용**되므로 이미지 처리 경로가 노출되면 실질 위험.
- 이번 태스크가 도입한 것은 아니므로 회귀는 아님. 별도 티켓으로 `npm audit fix` 검토.

---

### LOW

**L-1 [backend] `request.json()`이 Content-Type을 검증하지 않아 폼 기반 CSRF 자체는 성립 — 다만 영향 없음**
- 실증: `new Request(..., {headers:{"Content-Type":"text/plain"}, body:'{"name":...}'}).json()` → 정상 파싱됨. 즉 크로스오리진 `<form enctype="text/plain">`으로 POST/DELETE 호출 가능.
- **결론: 조치 불필요.** 이 API들은 쿠키·세션 등 ambient 인증을 전혀 쓰지 않으므로 CSRF로 얻는 권한이 0이고(공격자가 직접 `fetch`하는 것과 동일), DELETE는 비밀번호를 알아야 한다. **CSRF 토큰 요구는 과설계**로 판단. 기록 목적으로만 남긴다.

**L-2 [backend] 에러 객체 전체를 `console.error`로 남김 → 이론적 `password_hash` 로그 유입**
- 파일: `src/app/api/_lib/blog-api.ts:34` (`console.error(..., error)` — Supabase `PostgrestError` 원본)
- 경로: Postgres CHECK 위반 시 `details`에 `Failing row contains (..., $2b$10$..., ...)`가 담긴다 → Vercel 로그에 bcrypt 해시가 기록될 수 있다.
- 도달성 낮음: 라우트 검증(JS `.length`)이 DB CHECK(`char_length`)보다 항상 같거나 엄격하므로(서로게이트 페어는 JS에서 2, PG에서 1) 정상 경로로는 CHECK 위반을 만들 수 없다. 응답에는 절대 노출되지 않음(`{error:"db_error"}`만).
- 조치(방어적): `error.code` / `error.message`만 로깅하고 `details`·`hint`는 제외.

**L-3 [frontend] honeypot 오탐 시 정상 댓글이 "성공"으로 위장되어 조용히 소실**
- 파일: `CommentForm.tsx:67-77` (`position:absolute; left:-9999px` — DOM에 실재하는 `name="website"` 텍스트 입력), `Comments.tsx:72` (`if (res.status === 204) return true` → 폼 초기화 = 사용자에게 성공으로 보임)
- 재현: 일부 패스워드 매니저/자동완성이 `website` 필드를 채우면 서버가 204로 폐기하는데 UI는 성공 처리한다. `autoComplete="off"` + `tabIndex={-1}`로 완화되어 확률은 낮음.
- 조치: 낮은 우선순위. 필요하면 필드명을 자동완성이 인식하지 않는 값(`hp_field`)으로 변경.

**L-4 [frontend] 익명 댓글 필드 라벨이 "비밀번호" → 사용자 비밀번호 재사용 유도**
- 파일: `CommentForm.tsx:53,59` (`비밀번호 (4자 이상)`, `autoComplete="new-password"`)
- 위험: 이 값은 bcrypt로 저장되지만, 사용자가 상용 계정 비밀번호를 재사용하면 사이트가 **불필요한 타인 자격증명 해시를 보관**하게 된다(PII/책임 확대).
- 조치: 라벨을 "삭제용 비밀번호" / "삭제 PIN"으로 바꿔 재사용 의도를 차단.

**L-5 [frontend] 댓글 이름·본문으로 레이아웃 훼손 가능 (보안 영향 없음, 데이스페이싱)**
- 파일: `src/app/blog/blog.module.css:751` `.commentName`에 `overflow-wrap`/`min-width:0` 없음 → flex 자식으로서 40자 무공백 이름이 모바일에서 가로 오버플로 유발. `:786` `.commentBody`는 `white-space: pre-wrap`이라 개행 2000개 댓글로 세로 늘리기 가능(단 `word-break: break-word`가 있어 가로 오버플로는 없음).
- 이름에 U+200B(폭 0)·U+202E(RTL override) 삽입 시 빈 이름/역순 표시 가능.
- 조치: `.commentName { min-width: 0; overflow-wrap: anywhere; }` + 서버에서 이름의 제어·포맷 문자 제거, 연속 개행 축약.

---

## 반박에 실패한 항목 (공격 시도 → 방어 확인)

| 공격 | 결과 |
|---|---|
| slug로 PostgREST 필터 / 경로 인젝션 | `blog-api.ts:11-13` 형식 정규식 **+ `KNOWN_SLUGS` 화이트리스트 멤버십** 이중 검증. `../`·`*`·`,`·`.` 전부 차단. 임의 slug로 행 생성 불가 |
| 타 slug 댓글 id로 DELETE (IDOR) | `[id]/route.ts:44-45,59-60` fetch·delete 양쪽 모두 `.eq("slug",slug).eq("id",id)` 교차 검증. uuid 정규식(`isValidUuid`)도 통과해야 함 |
| `password_hash` 응답 유출 | GET/POST 모두 `select("id, name, body, created_at")` 컬럼 명시(`route.ts:30,82`). DELETE는 내부 select만 하고 미반환. 에러 응답은 전부 상수 코드 |
| 댓글 본문/이름 XSS | `CommentItem.tsx:40,54`에서 React 텍스트 자식으로 렌더 → 자동 이스케이프. 코드베이스 전체 `dangerouslySetInnerHTML`은 `layout.tsx:74,78` JSON-LD 2건뿐이며 **완전 정적 리터럴**(사용자 입력 미포함) |
| 토큰/비밀값 클라이언트 저장 | `localStorage`/`sessionStorage` 사용 0건 |
| `target="_blank"` reverse tabnabbing | 검출된 12건 전부 `rel="noopener noreferrer"` 보유 |
| `.env.local` 커밋 | `.gitignore`의 `.env*`에 포함, `git ls-files`에 env 파일 0건. 코드 내 `NEXT_PUBLIC_*` 사용 0건(= Supabase 값이 클라이언트로 넘어갈 경로 자체가 없음) |
| 마이그레이션 권한 설계 | RLS enable + 정책 0개(default deny) + anon/authenticated REVOKE + RPC EXECUTE REVOKE. **라이브 DB에서 anon 키 프로브 4종 전부 401 확인** |
| 에러 응답의 내부 정보 노출 | 전 경로가 `not_configured`/`invalid_slug`/`invalid_body`/`invalid_id`/`not_found`/`wrong_password`/`db_error` 상수만 반환. Supabase 메시지·스택 미노출 |
| 삭제 타이밍 공격 | 404(해싱 없음) vs 403(해싱 수행) 시간차는 존재하나, 댓글 id는 GET으로 이미 공개이므로 추가 정보 획득 없음 |
| `next.config.ts` 리다이렉트 오픈 리다이렉트 | destination이 전부 상대 경로(`/blog/:slug`). 외부 호스트 주입 불가 |

---

## 판정: PASS

- CRITICAL 0건. **머지 차단 사유 없음.**
- H-1(`supabase/.temp` gitignore)은 커밋 전 1줄로 처리 가능하므로 **커밋 직전 필수 조치**로 지정한다. 자격증명이 아닌 식별자 유출이라 차단 판정까지는 가지 않는다.
- H-2(rate limit 부재)는 PM 브리프의 명시적 방침이므로 **판정에 반영하지 않되**, "CPU/과금 소진 + 삭제 비밀번호 온라인 브루트포스"라는 별개 리스크로 수용 기록을 남길 것.
- M/L 항목은 후속 티켓.

## 알려진 제약 / 후속 작업
- 라이브 DB에 대한 **쓰기** 공격 검증(대량 삽입·바디 크기)은 프로덕션 데이터 오염을 피하려 수행하지 않았다. H-2/M-1은 코드 경로 분석과 플랫폼 상한 근거로 판단했다.
- 배포 환경(Vercel)의 실제 응답 헤더는 미확인 — M-3은 코드 기준 판정이므로, 플랫폼이 HSTS 등을 이미 부여한다면 범위가 줄어든다. 배포 후 `curl -I` 재확인 권장.
- ESLint가 리포지토리 사전 오류로 실행 불가(frontend Result Card 기재). 정적 분석 린트 계층은 이번 리뷰에서 활용하지 못했다.
- 리뷰 중 생성한 임시 검증 파일(`src/components/blog/__sectest.tsx`)과 `Comments.tsx` 임시 수정은 **원복 완료**(`git status`로 확인).

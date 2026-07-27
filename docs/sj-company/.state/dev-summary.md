# Dev Summary — 블로그 실시스템화 (조회수·댓글·Supabase) + 인사이트 이관
> Tech Lead 통합 · 2026-07-27 · run:20260727-081336-49493 (2차 사이클)

## 참여 역할
- database/provisioning (Tech Lead 직접 — Supabase 프로젝트 생성·마이그레이션), backend (API), frontend (UI+이관 — opus), security (적대 리뷰), Codex GPT (교차 리뷰)

## 통합 요약
Supabase 신규 프로젝트 `songseungju-blog`(Vercel 조직, ap-northeast-2)에 blog_views·blog_comments 스키마 + RLS(anon 전면 차단) 적용. 모든 접근은 service_role 키를 쓰는 Next.js Route Handler 3종 경유(키는 .env.local 전용). 블로그 상세에 조회수(진입당 정확히 1회 증가)·익명 댓글(이름+비밀번호 2열, 대형 textarea — 사용자 첨부 이미지 레이아웃, bcrypt 해시, honeypot, 비밀번호 삭제) 추가. s-skills 인사이트 아티클은 블로그 "S-Skills" 카테고리로 이관(원문 보존), /s-skills/insights 삭제 + 308 영구 리다이렉트.

## 변경 파일 (역할별)
- provisioning: supabase/migrations/20260727000001_blog_views_comments.sql, supabase/.gitignore, .env.local(미추적)
- backend: src/lib/supabase-admin.ts, src/app/api/_lib/blog-api.ts, src/app/api/blog/**(3 라우트), package.json(+@supabase/supabase-js, bcryptjs, server-only)
- frontend: src/components/blog/{ViewCounter,Comments,CommentForm,CommentItem,types}, src/app/blog/**(상세 통합·카테고리 필터 Suspense), src/data/blog.ts(S-Skills 카테고리+이관 포스트), src/data/insights.ts 삭제, src/app/s-skills/insights/** 삭제, next.config.ts(redirects), sitemap.ts
- Tech Lead 직접 수정: 비밀번호 72 UTF-8 바이트 상한(생성·삭제), JSON null 바디 400 처리(생성·삭제), supabase/.gitignore

## API 계약
- GET/POST /api/blog/views/[slug] → { count }
- GET /api/blog/comments/[slug] → { comments:[{id,name,body,created_at}] } (password_hash 미노출)
- POST 〃 { name, password, body, website? } → 201 { comment } / honeypot 204
- DELETE /api/blog/comments/[slug]/[id] { password } → 200 / 403 wrong_password / 404
- 공통: env 미설정 503 not_configured / invalid_slug 400 / invalid_body 400 / db_error 500

## 배포·운영 영향
- **EC2 서버 env 필수**: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 미설정 시 댓글·조회수 503(페이지는 정상, 섹션 숨김)
- 마이그레이션: 적용 완료 (supabase db push) / 롤백: 테이블 drop + git revert
- nginx 경로별 rate limit 권장 (/api/blog/* — bcrypt CPU 소진·브루트포스 완화, 코드 0줄 대안)

## 리뷰 결과
- Security 적대 리뷰: PASS(조건부) — 실증 기반(번들 grep, server-only 빌드 실패 확인, 라이브 RLS 프로브 401). 필수 H-1(supabase/.temp gitignore) 조치 완료
- Codex GPT 교차 리뷰: FAIL(10건) → 실조치 2건(72바이트 검사, JSON null 400) 반영, 나머지는 기수용 리스크(레이트리밋·조회수 조작·페이지네이션 YAGNI·308 vs 301)로 기각·기록
- Design 리뷰: PASS — 이미지 레이아웃 재현, 오류 컬러 1건 구조화 예외
- 수정 후 tsc·build 통과

## 미해결 / 후속 작업
- nginx rate limit (/api/blog/*) — 배포 인프라 태스크
- CSP 등 보안 헤더 — UGC 도입으로 우선순위 상승 (기존 이슈)
- 목록 조회수 표시는 미구현 (slug당 N-fetch 과설계 방지 — 배치 API 필요 시 후속)
- bcryptjs → 네이티브 bcrypt 교체 검토 (이벤트 루프 블로킹 완화)

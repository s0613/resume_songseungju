[HINT:single=]
# PM Brief — 블로그 실시스템화 (조회수·댓글·Supabase) + 인사이트 이관
> 생성일: 2026-07-27 · run:20260727-081336-49493 (2차 사이클)
> 사용자 확정: Supabase 신규 프로젝트를 Vercel 조직(totalointernational-2935's projects)에 생성

## 요구사항 분석
1. **인사이트 → 블로그 이관**: /s-skills/insights의 아티클(s-skills-in-one)을 블로그 "S-Skills" 카테고리 포스트로 변환. /s-skills/insights 라우트 제거, 구 URL은 next.config redirects로 새 블로그 URL에 301. s-skills nav의 "인사이트" 링크는 /blog(S-Skills 카테고리)로 교체.
2. **조회수**: 글 상세 진입 시 증가, 목록·상세에 표시.
3. **댓글**: 익명 — 이름 + 비밀번호 + 본문 (첨부 이미지 레이아웃: 이름·비밀번호 2열 입력 위, 큰 textarea "댓글을 입력해주세요." 아래). 비밀번호로 본인 댓글 삭제 가능.
4. **Supabase**: 신규 프로젝트(리전 ap-northeast-2). 클라이언트에 키 미노출 — 모든 접근은 Next.js Route Handler(서버)에서 service role 키로. RLS는 anon 전면 차단.

## 아키텍처 결정
- 테이블: `blog_views(slug text pk, count bigint)` / `blog_comments(id uuid pk, slug text, name text≤40, password_hash text, body text≤2000, created_at timestamptz)`
- 비밀번호는 bcrypt 해시(bcryptjs) 저장. API 응답에 password_hash 절대 미포함. 삭제는 비밀번호 검증 후.
- API: `GET|POST /api/blog/views/[slug]`, `GET|POST /api/blog/comments/[slug]`, `DELETE /api/blog/comments/[slug]/[id]` (body에 password)
- 시크릿: `.env.local`(gitignore)만. 코드 하드코딩 금지. EC2 배포 시 서버 env 설정 필요(배포 노트).
- Supabase 미설정/장애 시 graceful degrade — 조회수·댓글 영역 숨기거나 안내, 페이지 자체는 정상 렌더.
- 스팸 최소 방어: 길이 제한 + honeypot 필드 1개 (과설계 금지 — reCAPTCHA 등 도입 안 함).

## 태스크 목록
- [ ] Supabase 프로젝트 생성(CLI) + 마이그레이션(테이블·RLS·인덱스) 적용 — supabase/migrations에 SQL 보존
- [ ] Route Handlers 3종 + Supabase 서버 클라이언트(lib) + bcryptjs 의존성
- [ ] 블로그 상세: ViewCounter(진입 시 증가+표시) + Comments(목록/작성/삭제, 이미지 레이아웃) 클라이언트 컴포넌트
- [ ] 블로그 목록: 조회수 표시(가능 범위), "S-Skills" 카테고리 추가
- [ ] insights 아티클 → blog.ts 포스트 변환(category "S-Skills"), /s-skills/insights 라우트·데이터 제거, redirects 추가, s-skills nav 교체
- [ ] sitemap·메타 정합 (인사이트 URL 제거는 데이터 기반이라 자동)

## 리스크
- service role 키 노출 시 DB 전체 접근 — 서버 전용 모듈(lib/supabase-admin)에 격리, "use server"/route handler 밖 import 금지
- EC2에 env 미설정 상태로 배포되면 API 500 — graceful degrade + 배포 노트 필수
- 정적 프리렌더 페이지에 동적 데이터 혼입 — 조회수·댓글은 클라이언트 fetch로 분리해 기존 SSG 유지
- 구 인사이트 URL 색인 유실 — 301 redirect로 보전

## 완료 조건 (기계 검증 가능)
- `npm run build` exit 0
- 빌드 라우트에 /s-skills/insights 부재 + next.config에 redirect 정의 존재
- blog.ts에 category "S-Skills" 포스트 ≥1, /blog 프리렌더에 해당 카테고리 노출
- 로컬 dev 서버 + 실제 Supabase 대상 curl 시나리오 통과: 댓글 생성(201)→조회(목록 포함)→잘못된 비밀번호 삭제(401/403)→올바른 비밀번호 삭제(200)
- 조회수 API 2회 호출 시 count 증가 확인
- 댓글 GET 응답에 password_hash 문자열 미포함
- `git grep`으로 코드 내 Supabase 키 하드코딩 0건, .env.local이 gitignore에 포함
- 삭제된 /s-skills/insights 참조(링크) 소스 내 0건

## Dev/QA에 전달할 핵심 지침
- 댓글 폼은 첨부 이미지 레이아웃 재현: 상단 이름·비밀번호 2열, 하단 대형 textarea(placeholder "댓글을 입력해주세요."), 블로그 기존 톤(blog.module.css) 준수
- 모든 DB 접근은 서버 라우트에서만. 클라이언트 번들에 SUPABASE 문자열이 들어가면 실패
- 기존 블로그 SSG·디자인 보존 (preserve 모드), 요청 밖 리팩터 금지

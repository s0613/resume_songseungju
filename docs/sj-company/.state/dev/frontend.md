# Frontend Output — 블로그 조회수·댓글 UI + 인사이트 → 블로그 이관
> 작성: sj-dev-frontend · 2026-07-27

## 변경 파일
### 신설
- `src/components/blog/ViewCounter.tsx`: 상세 진입 시 `POST /api/blog/views/[slug]` **1회** 호출(useRef 가드로 StrictMode 이중 마운트 차단) 후 "조회 N" 표시. 비정상 응답(503 not_configured 포함)·네트워크 오류 시 `null` 렌더(구분자 dot도 컴포넌트 안에 포함해 잔여 여백 없음). 요청을 abort하지 않음 — StrictMode 언마운트로 증가 요청이 취소되는 것을 막기 위함.
- `src/components/blog/Comments.tsx`: 댓글 컨테이너. GET 실패(503 등) 시 섹션 전체 미렌더. 작성/삭제 호출·에러 메시지 매핑·목록 불변 갱신 담당.
- `src/components/blog/CommentForm.tsx`: 이름·비밀번호 2열 + 대형 textarea(placeholder "댓글을 입력해주세요.") + "댓글 남기기" 버튼 1개. honeypot `website` 필드 포함(`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`, `left:-9999px`).
- `src/components/blog/CommentItem.tsx`: 댓글 1건(이름·작성시각·본문) + 인라인 삭제(소형 비밀번호 입력 → 확인/취소).
- `src/components/blog/types.ts`: `BlogComment` 타입 + 고정 포맷 날짜 헬퍼(`2026. 7. 27. 09:59`).
- `src/components/blog/BlogBody.tsx`: 블로그 목록 본문(사이드바 + 글 목록). `activeCategory` prop으로 필터. 서버 프리렌더/클라이언트 양쪽에서 재사용되는 프레젠테이셔널 컴포넌트.
- `src/components/blog/BlogBrowser.tsx`: `useSearchParams()`로 `?category=`를 읽어 `BlogBody`에 넘기는 얇은 클라이언트 컨테이너.

### 수정
- `src/app/blog/[slug]/page.tsx`: 메타 라인에 `<ViewCounter>`, 본문 아래(태그·작성자 카드 뒤, 이전/다음 글 앞)에 `<Comments>` 삽입. SSG(`generateStaticParams`) 구조 그대로 유지.
- `src/app/blog/page.tsx`: 상단바만 남기고 본문을 `<Suspense fallback={<BlogBody activeCategory="all" />}><BlogBrowser /></Suspense>`로 교체 → **/blog는 여전히 ○ Static**이며 프리렌더 HTML에 전체 목록·카테고리가 그대로 담긴다.
- `src/app/blog/blog.module.css`: `.viewCount`, `.comment*`(섹션·목록·항목·폼), `.honeypot`, `.srOnly` 추가 + 560px 이하 반응형(2열 → 1열). 기존 `--naver-*`/`--ink*`/`--line` 토큰만 사용, 신규 컬러 토큰 0개. `.catItem`은 링크화에 맞춰 `cursor: default` 제거 → `text-decoration: none`, 패딩 9px → 11px(터치 타깃 확보)로만 조정.
- `src/data/blog.ts`: `categories`에 `{ name: "S-Skills", slug: "s-skills", count: 1 }` 추가·전체보기 count 6 → 7. `posts` 최상단에 이관 포스트 추가.
- `src/app/sitemap.ts`: `@/data/insights` import·insight 엔트리·`/s-skills/insights` 항목 제거. 그로 인해 고아가 된 `MONTH_NAMES`/`parseYearMonthDate`도 함께 제거(본 변경이 만든 미사용 코드만 정리).
- `src/app/s-skills/page.tsx`: nav "인사이트" 링크를 `/blog?category=s-skills`로 교체(라벨은 "인사이트" 유지 — 사용자 인지 경로 보존).
- `next.config.ts`: `redirects()` 추가.

### 삭제
- `src/app/s-skills/insights/**`(page.tsx, [slug]/page.tsx, insights.module.css), `src/data/insights.ts`

## 구현 요약
조회수·댓글은 전부 클라이언트 fetch로 분리해 블로그의 기존 SSG·디자인(preserve 모드)을 그대로 둔 채 얹었다. 조회수는 useRef 가드로 진입당 정확히 1회만 증가시키고, API가 미설정이거나 실패하면 조회수·댓글 영역이 조용히 사라진다(페이지 자체는 정상 렌더). 댓글 폼은 요청받은 이미지 레이아웃대로 이름·비밀번호 2열 + 대형 textarea + 단일 제출 버튼이며, 삭제는 각 댓글의 인라인 비밀번호 입력으로 처리한다. 인사이트 아티클은 문장을 그대로 살린 채 블록 구조만 블로그용으로 변환(cardNews 4장 → "한눈에 보는 네 가지 흐름" heading + list 4항목, divider → heading 경계, cta → 링크 포함 문단)해 `s-skills-in-one` slug 그대로 블로그 "S-Skills" 카테고리로 이관했고, 구 라우트는 영구 리다이렉트로 넘긴다.

## 검증 결과
- `npm run build` **exit 0** (Turbopack, TypeScript 검사 포함). `npx tsc --noEmit` 에러 0.
- 빌드 라우트: `/s-skills/insights` **부재**, `/blog` = ○ (Static), `/blog/[slug]` = ● SSG에 `/blog/s-skills-in-one` 포함(총 7경로).
- 프리렌더 HTML(`.next/server/app/blog.html`)에 `S-Skills` 10회 · `category=s-skills` 링크 · 이관 포스트 제목 포함 → 정적 산출물에 카테고리·포스트 노출 확인.
- `sitemap.xml` 산출물에 `s-skills/insights` 0건.
- 격리 포트 **3902** dev 서버 + Playwright 1.62(1440×900 / 375×780):
  - 조회수: API count `before=0 → after=1`, **delta 1**(dev의 React StrictMode 이중 마운트에서도 이중 증가 없음), 화면 "조회 1" 표시.
  - 댓글: 작성 → 201 → 목록 즉시 노출, 헤더 "댓글 1"로 갱신.
  - 삭제: 틀린 비밀번호 → **"비밀번호가 일치하지 않습니다"** 인라인 표시(403), 올바른 비밀번호 → 목록 제거·헤더 "댓글 0".
  - 스크린샷: `/tmp/frontend-comments-1440.png`(2열 + 대형 textarea), `/tmp/frontend-comments-desktop.png`(목록 + 폼), `/tmp/frontend-comments-375.png`(모바일 세로 스택, 오버플로우 없음), `/tmp/frontend-post-top.png`(이관 포스트 본문), `/tmp/frontend-blog-filter.png`(S-Skills 필터 활성).
  - 리다이렉트: `/s-skills/insights` → 308 → `/blog?category=s-skills`, `/s-skills/insights/s-skills-in-one` → 308 → `/blog/s-skills-in-one`.
  - 필터: `/blog?category=s-skills` 글 1개(이관 포스트) + 사이드바 S-Skills 활성, `/blog` 전체 7개.
- 소스 내 `/s-skills/insights` 참조: `next.config.ts` redirect source 2건 **외 0건**(`src/`, `public/`, 루트 설정 grep).
- 테스트 데이터 정리 완료: `blog_comments` 잔여 0건, `blog_views`의 `s-skills-in-one` 행(count 3) 삭제 → 테이블 잔여 행 0.

## 알려진 제약 / 후속 작업
- `permanent: true`는 Next.js 표준대로 **308 Permanent Redirect**를 반환한다(301과 동일하게 영구 이전으로 색인됨). 굳이 301 코드가 필요하면 `statusCode: 301`로 교체 가능.
- `/blog`는 정적 유지를 위해 카테고리 필터를 클라이언트에서 적용한다. `?category=` 직접 진입 시 최초 HTML에는 전체 목록이 담기고 하이드레이션 직후 필터가 적용된다(짧은 깜빡임 가능, 크롤러에는 전체 목록이 노출되므로 SEO 손해 없음).
- `categories`의 count는 여전히 수동 관리 값이다. 글 추가 시 갱신 필요(현 구조 유지, 자동 집계는 범위 밖으로 판단).
- 리포지토리의 ESLint 실행이 사전에 깨져 있다(`next lint`의 `--dir` 옵션 제거 + eslintrc 순환 참조 오류). 이번 변경과 무관하며 타입 검사는 `next build`/`tsc`로 통과 확인했다.
- 조회수는 방문마다 +1(중복 방지 없음, 백엔드 정책 그대로). 클라이언트 사이드 네비게이션으로 같은 글에 재진입하면 다시 증가한다.

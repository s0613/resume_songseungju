# Frontend Output — 메인 페이지를 AI 에이전트 빌더 브랜딩 구조(Hero·Builds·Writing·Archive·About)로 재구성
> 작성: sj-dev-frontend · 2026-07-27

## 변경 파일
- `src/app/page.tsx`: 섹션 구조 전면 재편 (Hero 2줄 포지셔닝 + CTA 1종 / Flagship Builds 신설 / Writing 신설 / Experience→Project Archive 컴팩트화 / Introduce·Education·ETC → About+Contact 통합). `src/data/blog.ts`의 `posts`를 import해 선별 3편 렌더. `EXPERIENCES` 12개 유지하되 에이전트·AI 관련 우선 정렬 + `bullets` 필드 제거(미렌더 데이터 정리).
- `src/app/home.module.css`: 신규 클래스 추가 — `heroLead`, `heroCtaRow`, `cta`(공용), `build*`(Flagship 카드), `write*`/`sectionMore`(Writing), `arch*`(Archive), `blockHeading`, `contactBlock`/`contactText`. 미사용이 된 `exp*`(item/header/bullets/more)·`edu*`·`etc*` 블록 삭제, `expTag`·`awards*`·`intro*`·`skill*`은 재사용으로 유지. 반응형(≤900px) 규칙을 새 클래스에 맞게 갱신.

## 구현 요약
히어로는 "AI 에이전트가 함께 일하는 시스템을 설계하고 제품으로 출시합니다." + "S-Skills와 open-trader를 만든 풀스택 개발자 송승주입니다." 2줄 구성에 CTA `대표작 보기 ↓`(#builds) 1종만 두고, 기존 연락처 3종(이메일·GitHub·LinkedIn)은 유지했다. Flagship Builds는 S-Skills·open-trader 2개 카드로 해결한 문제 / 핵심 구조 / 현재 상태 / 링크를 정보 행(`dl`)으로 제시하고, S-Skills에는 `claude plugin install s0613/S-skills` 설치 명령을 코드 블록으로 노출했다(주장 대신 검증 가능한 사실 위주). Writing은 blog.ts에서 slug 3개(`harness-obsidian-long-term-memory`, `making-my-own-harness`, `starting-london-system-agent`)를 조회해 제목·발췌(2줄 클램프)·날짜로 렌더하고 `/blog` 전체 보기 링크를 뒀다. Archive는 name·date·desc·tags 1줄 카드로 축소(bullets 제거), 12개 전부 `/portfolio/*` 링크 유지. About은 프로필+학력 한 줄(인하대 컴공 졸업 2026)·본문 2문단·STACK·AWARDS·메일 CTA로 통합했고 온양고·해병대 상세 블록은 삭제했다. 디자인은 preserve 모드로 기존 gold/cream/ink 토큰과 sectionGrid·sectionLabel 패턴만 사용했다(신규 color token 0개, tripwire 스캔 결과 새 색 리터럴 0건).

## Backend 계약 의존성
없음 (정적 페이지, 클라이언트 데이터 소스는 `src/data/blog.ts`만 읽기 참조)

## 검증
- `npm run build` exit 0 (29/29 정적 페이지 생성)
- 프리렌더 HTML: "AI 에이전트" 포함 / "온양고" 0건 / `/blog/{slug}` 링크 3개
- 가로 오버플로우 320·768·1024·1440 전부 0px (Playwright 측정)
- 스크린샷 확인: 1440 풀페이지·375 풀페이지·768/1440 섹션 캡처

## 알려진 제약 / 후속 작업
- **SKILLS 데이터는 삭제하지 않고 About 섹션 안 STACK 블록으로 축소 이전**했다. 태스크의 5개 섹션 목록에는 없었지만 PM Brief의 "기존 SEO 키워드(Next.js·TypeScript 등) 제거 금지" 원칙을 지키기 위한 판단. 불필요하면 제거 가능.
- 반응형 수정 1건: `≤900px`의 `.heroName`을 `clamp(56px,14vw,120px)` → `clamp(52px,12vw,120px)`로 조정. 768px 구간에서 히어로 타이포가 콘텐츠 폭을 넘겨 **기존부터 가로 스크롤이 발생**하던 문제를 막기 위한 최소 수정이다.
- `EXPERIENCES`의 `bullets` 데이터는 메인에서 제거됐지만 각 `/portfolio/*` 상세 페이지에는 그대로 남아 있다.
- open-trader는 Flagship에만 있고 Archive(EXPERIENCES)에는 항목이 없다(지시대로 추가하지 않음).
- 메일 주소는 여전히 `farchicken00@naver.com` — 도메인 메일 전환은 코드 범위 밖.

[HINT:single=frontend]
# PM Brief — AI 에이전트 빌더 퍼스널 브랜딩 전 사이트 페이지 정리
> 생성일: 2026-07-27
> 참조: [OBSIDIAN: 10_지식/11_마케팅/랜딩 페이지와 전환.md] [OBSIDIAN: 10_지식/04_디자인/00_취향 프로필.md]
> Codex CLI 세컨드 오피니언 반영 (threadId: 019fa0b8-1027-7201-88b9-32d80fcdddc0)

## 요구사항 분석

사이트를 "잘 만든 이력서"에서 "AI 에이전트 빌더 퍼스널 브랜드"로 전환한다.
사용자 확정 결정: (a) 이력서성 콘텐츠(고교·군복무 상세)는 메인에서 축소 — 삭제 아님,
(b) 대표작(S-Skills·open-trader) 강조 + 나머지는 컴팩트 아카이브, (c) 글을 메인에 노출.

Codex 교차 검토 반영 원칙:
- 포지셔닝은 **핵심 라벨 "AI 에이전트 빌더"만 통일**, 설명 문장은 페이지 맥락별로 변형.
- 히어로는 한 문장 욕심 대신 2줄 분리:
  "AI 에이전트가 함께 일하는 시스템을 설계하고 제품으로 출시합니다." + "S-Skills와 open-trader를 만든 풀스택 개발자 송승주입니다."
- "풀스택 개발자"·Next.js·TypeScript 등 기존 SEO 키워드는 보조 정체성으로 메타·본문에 유지 (검색 유입 손실 방지).
- Flagship은 2개(S-Skills, open-trader)에 집중. 카드 내용: 해결한 문제 / 직접 설계한 핵심 구조 / 현재 상태 / GitHub·문서 링크.
- 증거 지표는 검증 가능한 것만 (오픈소스 공개·실운영·설치 방법 등 상태 정보 위주, 부풀리기 금지).
- 명화 모티프·기존 에디토리얼 디자인(home.module.css)은 preserve 모드 — 새 디자인 시스템 도입 금지, 기존 토큰·스타일 재사용.

## 태스크 목록

### Phase 1 — 메인 페이지 재구성 (src/app/page.tsx + home.module.css)
- [ ] 히어로 개편: 2줄 포지셔닝 + CTA 1종(대표작 보기 or GitHub) + 기존 씨름도 배경 유지
- [ ] Flagship Builds 섹션 신설: S-Skills·open-trader 2개 카드 (문제/구조/상태/링크), 히어로 바로 아래
- [ ] Writing 섹션 신설: src/data/blog.ts에서 선별 글 3개 (제목·발췌·날짜·링크)
- [ ] Experience → "Project Archive" 컴팩트 목록으로 재편 (12개 유지, 카드 축소, 에이전트 관련 우선 정렬)
- [ ] Education·ETC 축소: 학력 한 줄(인하대 컴공 졸업), 고교·군복무 상세 제거, About+Contact로 통합
- [ ] 메인 nav·푸터에 Blog/S-Skills/open-trader 링크 정합성 정리

### Phase 2 — 메타데이터·SEO 인프라
- [ ] layout.tsx 루트 메타데이터 개편: title "송승주 — AI 에이전트 빌더 · 풀스택 개발자" 패턴, description에 핵심+보조 정체성
- [ ] JSON-LD: Person(+sameAs: GitHub·LinkedIn) + WebSite 스키마 삽입
- [ ] OG 이미지: opengraph-image.tsx(ImageResponse)로 루트 1종 + 블로그·포트폴리오 제목 변형. **한글 폰트 로딩 검증 필수**
- [ ] 포트폴리오 메타 단일 소스화: src/data/portfolio.ts 신설(12개 slug·title·desc) → 9개 페이지 metadata 추가 + sitemap.ts가 같은 소스 사용
- [ ] sitemap.ts: 블로그 슬러그를 src/data/blog.ts에서 생성 (하드코딩 제거)
- [ ] 블로그·s-skills 페이지 메타 문구를 브랜딩 라벨과 정합

### Phase 3 — 레거시·정합성 정리
- [ ] src/main/* 미사용 컴포넌트 6개 삭제 (HeroSection·Introduce·Skill·ExperienceAndProject·Education·Etc)
- [ ] Header.tsx: 깨진 앵커(/#skill 등) 수정 또는 포트폴리오 상세용 미니 nav로 교체
- [ ] Footer.tsx 렌더 조건·디자인 정리 (구버전 회색 톤 → 현행 디자인 정합)
- [ ] /s-skills 데드 링크(href="#" macOS/Windows) 제거
- [ ] open-trader 페이지에 투자 면책·페이퍼 트레이딩 명시 문구 1줄 추가

## 리스크
- 메인 전면 재작성 시 기존 에디토리얼 디자인 훼손 — home.module.css 기존 클래스·토큰 재사용 원칙, 전역 스타일 신설 금지 (취향 프로필 preserve 모드)
- "AI 에이전트 빌더" 라벨이 유행어로 보일 위험 — 주장 대신 증거(오픈소스 링크·설치 명령·아키텍처 설명)로 뒷받침
- ImageResponse 한글 폰트 미로딩 시 OG 깨짐 — 폰트 파일 번들 또는 fetch 방식 검증 후 적용
- 이력서 용도 병행 — 축소하되 정보 자체는 Archive·About에 보존
- 이메일(farchicken00@naver.com)은 도메인 이메일 전환 권장이나 인프라 작업이라 코드 범위 밖 — 후속 과제로 기록

## 완료 조건 (기계 검증 가능)
- `npm run build` 성공 (exit 0)
- 메인 렌더 HTML에 "AI 에이전트" 포함, "온양고" 미포함 (grep 검증)
- 메인에 blog 링크 3개(/blog/ 경로) 렌더
- /portfolio/* 12개 라우트 전부 고유 title 메타 보유 (빌드 산출 확인)
- opengraph-image 라우트 응답 200 + 이미지 Content-Type
- sitemap.xml에 src/data/blog.ts의 모든 slug 포함
- src/main/ 디렉토리 부재 상태로 빌드 통과
- Header가 렌더되는 페이지에서 존재하지 않는 앵커(#skill, #experienceAndProject) 참조 0건

## Dev/QA에 전달할 핵심 지침
- preserve 모드: 기존 home.module.css·명화 모티프·에디토리얼 톤 유지. 새 컬러 토큰 0개 원칙.
- 콘텐츠 단일 소스: 포트폴리오 메타·sitemap·메인 Archive 목록이 같은 데이터 파일을 읽게 할 것.
- 히어로·메타데이터·블로그 소개에 "AI 에이전트 빌더" 라벨 통일, 설명 문장은 페이지별 변형 허용.
- 기존 SEO 키워드(풀스택 개발자, Next.js, TypeScript) 메타에서 제거 금지.
- 요청 범위 밖 리팩터 금지 (Surgical Changes).

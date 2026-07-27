# Design Review — Phase 1 메인 페이지 재구성 (AI 에이전트 빌더 브랜딩)
> 2026-07-27 · sj-design (리뷰 모드) · TARGET: docs/sj-company/.state/dev/frontend.md

## 판정: PASS

## 절대 금지 패턴
- 가운데 정렬 히어로 + 버튼 2개 + 그라데이션: ✅ 없음 (좌측 정렬 에디토리얼 유지, CTA 1종)
- 균등 3-column 카드 그리드: ✅ 없음 (Flagship 2개 세로 스택, Archive 1열 컴팩트 행)
- 이름 없는 폰트/2단계 웨이트: ✅ 없음 (기존 --hero-font/--font/--mono 3계열 유지)
- letter-spacing 방치: ✅ 조정됨 (.heroLead -0.005em, mono 라벨 0.08~0.12em — 기존 시스템 관례 준수)
- 원색·보라 액센트·장식 그라데이션: ✅ 없음
- 체크마크 리스트·아이콘 박스: ✅ 없음 (dl 정보 행 사용)

## 레퍼런스 일치도 (preserve 모드 — 기존 시스템이 레퍼런스)
- 기존 토큰만 사용: ✅ 신규 색 리터럴 0건 (:root 변수 정의부 무변경, 신규 클래스 전부 var() 참조)
- 레이아웃 패턴: ✅ sectionGrid/sectionLabel/sectionNum 기존 체계 그대로 확장
- 명화(씨름도) 배경·다크 골드 톤: ✅ 유지

## AI 티 체크
- 호버·포커스 상태: ✅ .cta hover/focus-visible, .buildCard hover(border-left) 디자인됨
- 강조 1군데: ✅ 히어로 CTA 1종, Flagship이 유일한 강조 블록
- 시맨틱: ✅ h1(1개)→h2(섹션)→h3(카드), article/dl/dt/dd, aria-labelledby 일관

## 취향 프로필 게이트
- C06 순회색 대면적 배경: ✅ 없음 / C07 보라·인디고: ✅ 없음
- C08 token 소스 밖 raw color: ✅ 없음
- C11 route 전용 토큰 재정의: ✅ 없음 (home.module.css 단일 소유 유지)
- 참고: design-banned.md의 "다크 캔버스 봉인"(2026-06-08)은 s-skills 랜딩 Framer 방향에 대한 봉인. 현행 씨름도 다크 골드 에디토리얼은 2026-06-09 이후 사용자 승인·배포된 시스템이므로 preserve 대상이며 위반 아님.

## 발견 이슈 (HIGH / MEDIUM / LOW)
- LOW: .heroLead 한글 자간 -0.005em — 프로필 일반 권고(-0.02em)보다 얕으나 대형 디스플레이 타이포에서 기존 .heroTitle 관례와 일치. 수정 불요.
- LOW: 히어로 h1은 "SONG SEUNGJU" 유지 — 포지셔닝 문구는 .heroLead에 있음. SEO상 h1 키워드 반영은 Phase 2 메타데이터에서 title로 해결 예정.

## Frontend 재디스패치 지시
없음

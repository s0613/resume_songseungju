# Design Review — 송승주 에이전트 챗봇 UX 수정
> 2026-07-27 · run:20260727-132925-87329 · sj-design 리뷰 모드 (preserve — home gold/ink/cream 팔레트)

## 판정: PASS
(HIGH 1건 발견 → Tech Lead가 1줄 수정으로 즉시 해소, 재실측 통과)

## 절대 금지 패턴
- 원색·쨍한 컬러 사용 ✅ 없음 / 그라데이션 장식 남용 ✅ 없음 / shadow 남발 ✅ 없음 (기존 3단계 유지)

## 레퍼런스(팔레트) 일치도
- home.module.css gold/ink/cream 값 그대로 — 새 raw color 리터럴 0건 ✅ (기존 rgba 조합만)
- .msgLink·크로스페이드 등 신규 클래스 전부 var() 토큰 사용 ✅
- 미사용 --agent-cream-faint 제거 — surgical cleanup ✅

## AI 티 체크 / 접근성 실측
- 텍스트 대비: panelSub·typing·placeholder 6.82:1 ✅ (was 3.3) / 본문 13.3:1 / msgLink 7.44:1 ✅
- [HIGH→해소] .input 테두리 gold-faint(0.28)=1.57:1로 3:1 미달 → **gold-dim(0.6)으로 교정: 3.31:1 ✅**, focus는 full gold 5.9:1 ✅ (팔레트 알파 단계 내, 새 값 없음)
- hover/focus 상태 설계 ✅ / prefers-reduced-motion 시 auto-rotate 비활성 ✅
- dvh 폴백 패턴 ✅ / 크로스페이드 opacity 전환만(컴포지터 친화) ✅

## 발견 이슈
### HIGH — 해소됨
- [agent.module.css:.input] 테두리 1.57:1 → gold-dim으로 3.31:1 (Tech Lead 직접 수정, 재실측 확인)
### LOW
- /blog 밝은 팔레트 위 다크 위젯의 대비적 존재감 — 브랜드 아이덴티티로 수용 (사이트 전역 단일 위젯)

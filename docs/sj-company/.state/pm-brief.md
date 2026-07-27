[HINT:single=frontend]
# PM Brief — 챗봇 UI/UX 리뷰 이슈 수정
> 생성일: 2026-07-27 · run:20260727-132925-87329 · 근거: .state/review-design.md (판정 FAIL)

## 태스크 목록
- [ ] 마크다운 최소 렌더러 (굵게 `**`·링크 `[t](u)`·줄바꿈) — React 요소 렌더, 라이브러리·dangerouslySetInnerHTML 금지, href는 `/` 또는 `http(s)`만 허용, /blog 내부 링크 같은 탭·외부 새 탭+noopener
- [ ] 접근성: ESC 닫기 + 닫을 때 FAB 포커스 복귀 + 재오픈 시 입력창 포커스 + 메시지 영역 `aria-live="polite"`·`tabIndex={0}`
- [ ] 대비: `.input` 테두리 gold-faint(0.28)↑, `.panelSub`/`.typing`/placeholder cream-dim(0.65)↑ — 기존 팔레트 알파 단계 내에서만, 새 색상 금지
- [ ] 에러 UX: 429 전용 문구 / 에러 메시지 isError 플래그 → 후속 요청 히스토리 제외 / 자동 스크롤은 하단 80px 이내일 때만 / 전송 직후 즉시 로딩 인디케이터
- [ ] 3D 에셋: GLB gltf-transform 압축, model-viewer idle 로드, load 이벤트 전 글리프 유지(깜빡임 제거), error 시 글리프 폴백
- [ ] 모바일: 패널 높이 vh → dvh 기반 교체

## 완료 조건
- `npm run build` exit 0
- Playwright(로컬 프로덕션 서버): 챗봇 답변에 `**`·`[...](...)` 원문 미노출, 메시지 내 `<a href="/blog/...">` 존재, 클릭 시 /blog/* 로 이동
- Playwright: 패널 열림 상태에서 ESC → `[role="dialog"]` 비표시 + `document.activeElement`가 FAB 버튼, 재오픈 시 activeElement가 질문 입력창
- DOM: 메시지 컨테이너에 `aria-live="polite"` 속성 존재
- CSS 실측: `.input` border 알파 ≥ 0.28, `.panelSub`·`.input::placeholder`·`.typing` 색 알파 ≥ 0.65
- `public/ai-chat-1c.glb` 파일 크기가 압축 전(532KB) 대비 감소
- 코드 검증: 429 분기 전용 문구 존재, 히스토리 전송 시 isError 메시지 필터 존재
- agent.module.css에 `dvh` 단위 사용, `68vh`·`100vh` 단독 사용 제거

## Dev/QA에 전달할 핵심 지침
- 위젯 팔레트는 home.module.css와 동일한 gold/ink/cream 값만 사용(이미 agent.module.css 상단에 정의됨). 새 색상 리터럴 추가 금지.
- 서버(route.ts)는 이미 429를 구분해 반환하므로 원칙적으로 클라이언트만 수정. 서버 수정이 필요하면 최소로.
- model-viewer 의존성 자체는 유지(3D 버튼은 사용자 명시 요구). 경량화는 로드 시점·GLB 압축으로.

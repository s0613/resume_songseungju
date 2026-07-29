# Frontend Output — 챗봇 UX 이슈 수정
> 작성: sj-dev-frontend · 2026-07-27

## 변경 파일
- `src/components/agent/AgentChat.tsx` — 최소 인라인 마크다운 렌더러(`renderInlineTokens`) 신설(`**굵게**`/`[텍스트](url)`, dangerouslySetInnerHTML 미사용), href 화이트리스트(`/`내부·`http(s)` 외부만), `open` prop 기반 재오픈 포커스, Esc 닫기, 메시지 컨테이너 `aria-live="polite"`+`tabIndex={0}`, 429 전용 문구, `isError` 플래그+히스토리 필터링, 하단 근접(80px) 시에만 자동 스크롤, 전송 직후(사용자 메시지 상태에서도) 즉시 타이핑 인디케이터 노출.
- `src/components/agent/AgentWidget.tsx` — model-viewer 모듈 import를 `requestIdleCallback`(폴백 `setTimeout` 1500ms)로 지연, FAB ref로 닫을 때 포커스 복귀, `open`/`onClose(closePanel)`를 AgentChat에 전달, model-viewer `load`/`error` 이벤트를 ref+addEventListener로 구독해 글리프↔3D 크로스페이드(에러 시 글리프 영구 폴백).
- `src/components/agent/agent.module.css` — `.input` 테두리 `--agent-gold-ghost`(0.12)→`--agent-gold-faint`(0.28), `.panelSub`/`.typing`/`.input::placeholder`를 `--agent-cream-faint`(0.4)→`--agent-cream-dim`(0.65)로 교체 후 미사용 `--agent-cream-faint` 토큰 제거, `.msgLink`(gold 계열) 신설, `.fab`/`.fabModel`/`.fabGlyph`를 겹침+opacity 크로스페이드 구조로 변경, `.panel` `max-height`와 모바일 `.panel` `height`에 `dvh` 재선언 추가(기존 vh 유지 + 폴백 패턴).
- `public/ai-chat-1c.glb` — gltf-transform CLI로 압축(아래 참조). 새 raw color 리터럴·새 의존성 추가 없음.

## 구현 요약
마크다운은 정규식 토크나이저로 `**bold**`/`[label](href)`만 React 엘리먼트(`<strong>`, `<Link>`/`<a>`)로 변환하고 나머지는 원문 그대로 두어 스트리밍 중 잘린 토큰이 자연스러운 플레인 텍스트로 보이게 했다. 포커스/Esc/aria-live로 다이얼로그 접근성 3중 결함을 모두 해소했고, 대비 미달 4곳을 기존 팔레트 알파 단계 안에서 상향했다. 에러 문구 분기·히스토리 오염 방지·근접 스크롤·즉시 로딩 인디케이터로 에러/로딩 UX를 정리했다. 3D 에셋은 idle 로드 + load/error 이벤트 기반 크로스페이드로 깜빡임과 초기 로딩 경합을 없앴고 GLB는 544.8KB→21.8KB(draco)로 압축했다.

## Backend 계약 의존성
- `POST /api/agent/chat` — 기존 계약 그대로 사용(수정 없음). `res.status === 429`만 클라이언트에서 분기해 문구를 바꿈. 요청 payload shape(`{ messages: [{role, content}] }`)는 변경 없음 — 히스토리 필터링(`isError` 제외)은 클라이언트 로컬 상태에만 존재하는 필드라 서버로는 `{role, content}`만 매핑해 전송.

## 검증 결과
- `npx tsc --noEmit`: pass (에러 0)
- `npm run build`: pass (exit 0, 전 라우트 정상 생성)
- Playwright(로컬 프로덕션 서버, PORT=3907, `<LOCAL_PROJECT>`에서 실행 후 스크립트 삭제·서버 종료 완료) — 9건 전부 pass:
  - 패널 열림 / 메시지 컨테이너 `aria-live="polite"` 존재 / 최초 오픈 시 입력창 포커스
  - FAB `model-viewer` 렌더(opacity 1, 커스텀 엘리먼트 정상 로드, console 에러 0)
  - "추천 글 하나 링크와 함께 알려줘" 질문 → 답변에 `**`/`](` 원문 미노출, `a[href^="/blog/"]` 3~4개 존재
  - Esc → 패널 비표시 + `document.activeElement`가 FAB(`aria-label="송승주 에이전트 열기"`)
  - 재오픈 → `document.activeElement`가 입력창(`INPUT`)
- GLB 크기: **544,812 bytes → 21,800 bytes** (약 96% 감소, gltf-transform `optimize --compress draco --texture-compress webp`)
  - 최초 시도한 `--compress meshopt`는 66.5KB까지 줄였으나 실제 브라우저 검증에서 `THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files` 에러로 로드 실패(model-viewer 4.3.1이 EXT_meshopt_compression 디코더를 사전 등록하지 않음) → 지시된 폴백 순서대로 draco로 전환, 실제 렌더 성공 확인 후 채택.

## 알려진 제약 / 후속 작업
- gltf-transform `optimize`는 기본적으로 `simplify`(메시 단순화) 단계를 포함한다 — 지시된 명령을 그대로 실행했고 렌더 확인 결과 시각적 문제는 없었으나, 원본 형상을 무손실로 유지해야 한다면 후속으로 `--simplify` 비활성화 옵션을 검토할 것.
- 메시지 컨테이너의 `aria-live="polite"`는 PM 브리프 지시대로 최소 구현(토큰 단위 스트리밍 중에도 계속 켜져 있음). 리뷰 문서가 제안한 "스트리밍 중 live 끄고 완료 시에만 별도 노드로 낭독" 이원화는 이번 태스크 범위(PM 브리프 2d)를 넘어서 구현하지 않음 — 스크린리더 사용성 개선이 추가로 필요하면 별도 태스크로 진행 권장.
- `--agent-cream-faint` CSS 변수는 대비 상향으로 사용처가 모두 `--agent-cream-dim`으로 교체되어 오펀이 되어 선언 자체를 제거함(surgical cleanup).

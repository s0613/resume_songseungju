# Design Review — 송승주 에이전트 챗봇

리뷰 일자: 2026-07-27 / 대상: 커밋 전 작업 트리
검토 파일: `src/components/agent/AgentWidget.tsx`, `src/components/agent/AgentChat.tsx`, `src/components/agent/agent.module.css`, `src/app/layout.tsx`, `src/app/api/agent/chat/route.ts`

## 판정: FAIL

HIGH 7건. 그중 3건(마크다운 미렌더, 포커스 관리 부재, aria-live 부재)은 위젯의 핵심 목적(블로그 글로 유도) 또는 기본 접근성을 직접 깨뜨린다.

## 발견 이슈

### HIGH (실사용 UX 결함 — 수정 필요)

- **[AgentChat.tsx:137] 마크다운이 렌더되지 않아 위젯의 핵심 기능이 죽는다**
  `{msg.content}` 로 원문 문자열을 그대로 출력한다. 반면 `route.ts:63` 시스템 프롬프트는 *"블로그 글을 언급할 때는 해당 글의 URL 경로(/blog/슬러그)를 함께 알려주면 좋습니다"* 라고 모델에 지시하고 있어, 답변에 `**[하네스가 실행하고, 옵시디언이 기억합니다](/blog/slug)**` 같은 마크다운이 항상 섞여 나온다.
  → 사용자 화면에는 별표와 대괄호가 그대로 보이고, **링크는 클릭할 수 없다.** 에이전트가 글을 추천해도 사용자는 URL을 눈으로 읽고 직접 주소창에 입력해야 한다. 유입 동선이 완전히 끊긴다.
  → 수정: 최소한의 인라인 마크다운(링크·볼드·줄바꿈·리스트)만 파싱해 렌더. 링크는 내부 경로면 `next/link`, 외부면 `target="_blank" rel="noopener"`. 임의 HTML 삽입(`dangerouslySetInnerHTML`) 대신 파서 → React 엘리먼트 방식으로. 스트리밍 중 미완성 마크다운(`**[제목](`)이 깨져 보이지 않도록 partial 토큰 처리 필요.

- **[AgentWidget.tsx:35-46 / AgentChat.tsx:41-43] 다이얼로그 포커스 관리가 전부 빠져 있다 (3중 결함)**
  1. **Escape 키 핸들러 없음.** `role="dialog"`(AgentChat.tsx:109)를 선언해 놓고 Esc로 닫히지 않는다. 키보드 사용자는 Tab으로 ✕ 버튼까지 이동해야만 닫을 수 있다.
  2. **닫을 때 포커스가 사라진다.** `onClose`(AgentChat.tsx:122)가 패널을 `display:none`(agent.module.css:84-86) 처리하면 현재 포커스 엘리먼트가 화면에서 없어지고 포커스는 `<body>`로 떨어진다. 키보드 사용자는 읽던 위치를 잃고 문서 최상단부터 다시 Tab 해야 한다. 포커스를 FAB로 되돌려야 한다.
  3. **재오픈 시 입력창에 포커스가 안 간다.** `inputRef.current?.focus()`가 마운트 시 1회만 실행된다(:41-43). `everOpened` 플래그로 패널을 언마운트하지 않고 유지하므로(AgentWidget.tsx:42), 열기 → 닫기 → 다시 열기 하면 이 effect가 재실행되지 않아 입력창이 죽은 채로 열린다. 첫 오픈과 두 번째 오픈의 동작이 달라진다.
  → 수정: `open` 상태를 AgentChat에 prop으로 내려 `useEffect(() => { if (open) inputRef.current?.focus() }, [open])`, `keydown` Esc 리스너 추가, `onClose` 시 FAB ref로 `focus()` 복귀.

- **[AgentChat.tsx:129-143] 스트리밍 답변이 스크린리더에 전혀 전달되지 않고, 메시지 영역을 키보드로 스크롤할 수 없다**
  `.messages` 컨테이너에 `aria-live`/`role="log"`가 없다. 답변이 토큰 단위로 DOM에 들어와도 보조기술은 아무것도 읽지 않는다. 스크린리더 사용자는 질문을 보낸 뒤 답이 왔는지조차 알 수 없다. `.typing` 인디케이터(:141)도 마찬가지로 무음이다.
  동시에 `.messages`는 `overflow-y: auto`(agent.module.css:127-129)인데 `tabIndex`가 없어 포커스를 받을 수 없다. 대화가 길어지면 **키보드만 쓰는 사용자는 이전 메시지를 스크롤해 볼 방법이 없다** (WCAG 2.1.1).
  → 수정: `<div role="log" aria-live="polite" aria-relevant="additions text" tabIndex={0}>`. 토큰마다 재낭독되는 폭탄을 막으려면 스트리밍 중에는 live 영역을 끄고 완료 시 최종 답변만 별도 `aria-live` 노드에 넣는 방식이 안전하다. `.typing`에는 `role="status"`.

- **[agent.module.css:102-106, 161-166, 176-196] WCAG AA 대비 기준 미달 4건 — 입력 필드는 경계가 사실상 안 보인다**
  ink `#1a1008` 배경 기준 실측:
  | 대상 | 실측 대비 | 기준 | 판정 |
  |---|---|---|---|
  | `.panelSub` 11.5px (`--agent-cream-faint` .4) | **3.32:1** | 4.5:1 | FAIL |
  | `.input::placeholder` (:190) | **3.27:1** | 4.5:1 | FAIL |
  | `.typing` 13px (:161) | **3.32:1** | 4.5:1 | FAIL |
  | `.input` 평상시 테두리 (`--agent-gold-ghost` .12, :180) | **1.09:1** | 3:1 (1.4.11) | FAIL |
  `.input`은 배경도 `rgba(240,230,204,0.05)`로 패널 배경 대비 **1.13:1**이라, 테두리·배경 어느 쪽으로도 "여기가 입력 필드"라는 신호가 없다. 위젯에서 유일한 입력 어포던스가 안 보이는 상태다.
  또 `.input`은 `outline: none`(:186)으로 브라우저 기본 포커스 링을 제거하고 테두리 색 변화(3.38:1)로만 대체한다 — 최소 기준은 넘지만, 위 1.09:1 → 3.38:1 변화는 저시력 사용자에게 인지 가능한 상태 변화가 아니다.
  → 수정: `--agent-cream-faint`를 .4 → 최소 .58(≈4.6:1)로 올리고, `.input` 테두리를 `--agent-gold-faint`(.28) 이상으로, `:focus-visible`에 `.fab`와 동일한 `outline: 2px solid var(--agent-gold)` 패턴 적용.

- **[AgentWidget.tsx:23 / package.json] 버튼 아이콘 하나 때문에 모든 페이지에 gzip 378KB를 추가로 내려받는다**
  `@google/model-viewer` = **283KB gzip**(`model-viewer.min.js` 1.0MB raw) + `public/ai-chat-1c.glb` = **95KB gzip**(532KB raw). 이게 76px짜리 FAB 아이콘 하나를 그리려고 `layout.tsx:86`을 통해 **/blog, /s-skills, /open-trader 포함 전 페이지**에서 로드된다.
  프로젝트 성능 예산은 랜딩 JS < 150KB gzip인데 장식 요소 하나로 2.5배 초과다. `import()`로 지연 로드하긴 하지만(:23) 조건 없이 마운트 즉시 실행되므로 초기 뷰포트 리소스와 대역폭을 그대로 경합한다. 모바일 3G에서 본문 이미지·폰트 로딩을 밀어낸다.
  → 수정: 3D를 포기하고 SVG/Lottie로 대체하는 게 정답. 3D를 꼭 유지해야 한다면 (a) FAB에 `IntersectionObserver`나 첫 hover/focus 시점까지 import 지연, (b) 최초 클릭 전까지는 정적 poster 이미지(webp)만 노출, (c) glb를 Draco/meshopt 압축.

- **[AgentWidget.tsx:56-74] FAB 아이콘이 로드 도중 "빈 원"으로 깜빡이고, glb 실패 시 영구히 빈 원으로 남는다**
  렌더 흐름이 **✦ 글리프 → 빈 원 → 3D 모델** 3단계다. `modelReady`는 *모듈 import* 성공 시점에 true가 되지만(:25), 그 순간 `<model-viewer>`는 532KB glb를 아직 다운로드 전이고 `--poster-color: transparent`(agent.module.css:53) + `poster` 미지정이라 **아무것도 그리지 않는다.** 즉 폴백 글리프를 지워버린 뒤 빈 상태를 노출한다.
  더 나쁜 케이스: glb가 404거나 파싱 실패하면 model-viewer의 `error` 이벤트를 아무도 듣지 않으므로(:57-69 핸들러 없음) FAB는 **아무 아이콘도 없는 검은 원**으로 영구 고정된다. 사이트 전역 신규 진입점이 "깨진 버튼"처럼 보인다.
  → 수정: `onLoad` 이벤트까지는 `.fabGlyph`를 겹쳐 두고 로드 완료 시 크로스페이드, `onError` 시 `setModelReady(false)`로 글리프 복귀. 또는 `poster` 속성에 경량 webp 지정.

- **[agent.module.css:73-74, 232-238] 모바일에서 키보드가 올라오면 입력창이 키보드 뒤로 숨는다**
  `.panel`이 `position: fixed` + `height: 68vh` + `bottom: 92px` + `max-height: calc(100vh - 140px)` 조합이다. iOS Safari / Android Chrome에서 소프트 키보드가 뜨면 visual viewport만 줄고 `vh`와 fixed 기준인 layout viewport는 그대로다. 결과적으로 패널 하단의 `.inputRow`(:169)가 키보드 아래로 밀려 **자기가 뭘 타이핑하는지 볼 수 없는 상태**가 된다. 챗봇에서 가장 치명적인 실패 모드다.
  → 수정: `100vh`/`68vh` → `100dvh`/`68dvh`로 교체하고, `visualViewport` resize 이벤트로 패널 `bottom`을 보정하거나 `interactive-widget=resizes-content`를 viewport 메타에 지정. 전송 후 `scrollIntoView` 보정도 함께 검토.

### MEDIUM

- **[AgentChat.tsx:36-39] 스트리밍 중 자동 스크롤이 사용자 스크롤을 강탈한다.** 토큰이 들어올 때마다(`[messages, loading]` 의존) 무조건 `scrollTop = scrollHeight`를 실행한다. 사용자가 이전 답변을 다시 읽으려 위로 올려도 다음 토큰(수십 ms 간격)에 즉시 맨 아래로 끌려 내려간다. 답변이 길수록 이전 내용을 읽는 것이 불가능하다.
  → 수정: 스크롤 위치가 하단 근처(예: `scrollHeight - scrollTop - clientHeight < 80`)일 때만 자동 스크롤. 아닐 때는 "새 메시지 ↓" 버튼 노출.

- **[AgentChat.tsx:68-70, 91-92, 97-99 / route.ts:79, 91, 105] 모든 실패가 같은 문구로 뭉개지고, 재시도 수단이 없다.** 429(분당 10회 초과), 400(입력 검증 실패), 503(모델 장애), 네트워크 단절이 전부 `ERROR_TEXT` 한 문장으로 표시된다. 특히 429는 60초 후 풀린다는 정보를 사용자가 알 방법이 없고 `route.ts:79`는 `Retry-After` 헤더도 안 준다. 게다가 에러 발생 시 사용자가 방금 쓴 질문은 이미 `setInput("")`(:48)으로 날아간 뒤여서 **다시 타이핑해야 한다.**
  → 수정: `res.status`로 분기해 429는 "질문이 너무 잦아요. 1분 뒤 다시 시도해 주세요", 503은 별도 문구. 실패한 사용자 메시지에 "다시 시도" 버튼을 붙이고 실패 시 입력값을 복원.

- **[AgentChat.tsx:59-61 vs 68-70] 에러 문구가 대화 기록에 남아 다음 요청에서 모델 컨텍스트를 오염시킨다.** `ERROR_TEXT`를 `role: "assistant"` 메시지로 `messages`에 넣기 때문에(:70, :92, :98), 다음 `send()`에서 `nextMessages.slice(1).slice(-HISTORY_LIMIT)`(:59-61)에 그대로 포함되어 서버로 전송된다. 모델은 "지금은 답변을 가져오지 못했어요"를 자기 이전 발언으로 인식하고 그 톤을 이어갈 수 있다. 12개 히스토리 슬롯도 잠식한다.
  → 수정: `ChatMessage`에 `isError?: boolean` 플래그를 두고 히스토리 구성 시 필터링. 시각적으로도 일반 답변 말풍선과 다르게(경고 색/아이콘) 구분.

- **[AgentChat.tsx:62-66, 100-103] 스트리밍을 중단할 수단이 없다.** `AbortController`가 없어 (a) 사용자가 긴 답변을 끊을 수 없고, (b) 패널을 닫아도(`onClose`) 요청은 계속 돌며 숨겨진 패널의 state를 갱신하고, (c) 다른 페이지로 이동해도 루트 레이아웃이 유지되므로 스트림이 살아 있다. `route.ts:99`의 `maxOutputTokens: 800`이면 최대 20~30초 대기가 발생할 수 있는데 그동안 사용자는 갇힌다.
  → 수정: `AbortController`를 ref로 보관해 로딩 중에는 전송 버튼을 "중지"로 전환, `onClose`/언마운트 시 `abort()`.

- **[AgentChat.tsx:140] 전송 직후 아무 피드백이 없는 공백 구간이 있다.** `.typing` 표시 조건이 `loading && messages[messages.length-1]?.content === ""` 인데, 전송 직후 마지막 메시지는 사용자 질문(비어 있지 않음)이다. 어시스턴트 빈 말풍선이 push되는 `:75` 이전 — 즉 fetch 왕복 구간 전체 — 동안 인디케이터가 안 뜬다. 콜드 스타트나 느린 네트워크에서 사용자는 "전송이 먹었나?" 상태로 방치된다. 비활성 전송 버튼이 유일한 단서다.
  → 수정: 조건을 `loading && messages[messages.length-1]?.role !== "assistant"` 를 포함하도록 확장하거나, 단순히 `loading &&` 이면서 마지막 어시스턴트 메시지가 비었을 때로 통합.

- **[AgentChat.tsx:152-160] 단일행 `<input>` + 1000자 무음 절삭.** 사용자가 두세 문장짜리 질문을 쓰면 ~250px 폭(모바일)에서 가로 스크롤되어 자기가 쓴 문장을 통으로 볼 수 없다. `maxLength={1000}`(:157)은 초과분을 경고 없이 잘라내며 남은 글자 수 표시도 없다. 긴 텍스트를 붙여넣으면 어디서 잘렸는지 모른 채 전송된다.
  → 수정: auto-grow `<textarea>`(최대 4~5줄) + Enter 전송 / Shift+Enter 줄바꿈, 900자 초과 시 잔여 글자 수 노출.

- **[agent.module.css:108-119] 닫기 버튼 터치 타겟 30×30px.** WCAG 2.5.8 AA 최소(24px)는 넘지만 iOS HIG 44pt / Material 48dp에 미달한다. 패널 우상단 모서리라 엄지 오조작이 잦은 위치다. `.send` 버튼(:198)도 계산상 약 39px로 44px 미만.
  → 수정: `.panelClose`를 `width/height: 40px`로 키우고 아이콘 크기는 유지, 또는 `::before`로 히트 영역만 확장.

- **[agent.module.css:4-21 / layout.tsx:86] 다크 gold/ink 팔레트가 밝은 페이지 위에 그대로 얹힌다.** `.widget`은 전역 마운트인데 팔레트를 하드코딩한다(`--agent-ink: #1a1008`). `/blog`는 `--bg: #f4f5f7` / `--surface: #ffffff` / 네이버 그린 포인트(blog.module.css:5-12)라 완전히 다른 시스템이다. 밝은 흰 배경 위에 짙은 갈색 원과 짙은 갈색 패널이 떠 있으면 이 사이트 요소가 아닌 서드파티 채팅 위젯(Intercom/Channel)처럼 읽힌다. `/s-skills`, `/open-trader`도 각자 톤이 있다.
  → 수정: 팔레트 변수를 `.widget` 하드코딩 대신 페이지 루트에서 override 가능한 전역 토큰으로 승격하고, `/blog`에서는 surface/green 계열로 리매핑. 최소한 밝은 페이지에서는 패널 배경을 밝은 surface로 전환.

- **[route.ts:99 / AgentChat.tsx:88] 답변이 토큰 상한에 걸려 잘려도 아무 표시가 없다.** `maxOutputTokens: 800`이면 한국어 기준 약 400~500자에서 문장 중간에 끊긴다. 스트림은 정상 종료되므로 클라이언트는 이를 "완료된 답변"으로 렌더한다. 사용자에게는 에이전트가 말하다 만 것처럼 보인다.
  → 수정: 서버에서 `finishReason === "length"`를 감지해 스트림 말미에 "(내용이 길어 여기서 줄였어요)" 같은 마커를 붙이거나, 프롬프트의 "3~6문장" 지시(route.ts:68)에 맞게 상한을 낮춰 잘림 자체를 방지.

### LOW

- **[agent.module.css 전체] `prefers-reduced-motion` 미디어 쿼리 블록이 없다.** JS 쪽에서 `auto-rotate`만 처리하고(AgentWidget.tsx:18-21) CSS의 `.fab:hover` translateY(:39), `.send:hover` translateY(:212) transition은 무조건 동작한다. 폭이 작아 실질 피해는 낮지만 일관성을 위해 `@media (prefers-reduced-motion: reduce) { * { transition: none } }` 블록 추가 권장. 같은 맥락으로 `matchMedia` 결과를 1회만 읽고 `change` 이벤트를 구독하지 않아(:19-21) 세션 중 설정 변경에 반응하지 않는다.

- **[AgentWidget.tsx:47-55] `aria-expanded`는 있는데 `aria-controls`가 없다.** 패널에 `id`를 부여하고 `aria-controls`로 연결하면 보조기술이 "무엇이 펼쳐졌는지" 안내할 수 있다.

- **[AgentWidget.tsx:56-74] 패널이 열려도 FAB의 시각 상태가 변하지 않는다.** `aria-label`은 "닫기"로 바뀌지만(:51-53) 화면상으로는 동일한 3D 아이콘이다. 대부분의 채팅 위젯은 열림 상태에서 ✕로 전환된다. 헤더에 ✕가 있어 기능 결손은 아니지만 토글 어포던스가 약하다.

- **[agent.module.css:84-86] 패널이 `display: none` 즉시 토글이라 열고 닫힘이 뚝 끊긴다.** 등장/퇴장 트랜지션이 전혀 없어 어디서 튀어나왔는지 공간적 연결이 안 잡힌다. `transform: scale(.96) translateY(8px)` + `opacity` 페이드(120~180ms, reduced-motion 시 생략) 정도면 충분하다.

- **[AgentChat.tsx:109-118] `role="dialog"`인데 `aria-modal` 미지정이고 제목이 heading이 아니다.** 실제로 모달이 아니므로(배경 상호작용 가능, 포커스 트랩 없음) `aria-modal="false"` 명시가 정확하다. `.panelTitle`(:114)을 `<h2>`로 올리고 `aria-labelledby`로 연결하면 랜드마크 탐색에서 잡힌다.

- **[AgentWidget.tsx:41-46] 바깥 클릭으로 닫히지 않는다.** 챗 위젯에서 필수는 아니나, 모바일에서 화면 대부분을 덮는 상태(68vh)에서는 백드롭 탭으로 닫히는 편이 자연스럽다.

- **[route.ts:19-31] 인스턴스 메모리 기반 레이트 리밋이라 사용자 체감이 비결정적이다.** 서버리스에서 인스턴스가 여러 개면 어떤 요청은 통과하고 어떤 요청은 429가 된다. 사용자 입장에서는 "될 때도 있고 안 될 때도 있는" 챗봇으로 보인다. 유입 규모상 당장 문제는 아니나, 429 응답에 `Retry-After: 60`만이라도 붙이면 클라이언트가 정확한 안내를 할 수 있다.

## 검증하지 못한 영역

- 실제 브라우저 렌더 스크린샷(320/375/768/1024/1440) 및 iOS Safari 키보드 동작 — 정적 분석만 수행했다. 특히 HIGH #7(dvh/키보드)은 실기기 확인이 필요하다.
- `src/data/agent-knowledge.ts` 내용 품질 및 모델 실제 응답의 마크다운 사용 빈도 — 프롬프트 지시(route.ts:63)와 태스크 설명에 근거해 판단했다.
- Lighthouse / 실제 번들 분석 결과 — 번들 영향은 `node_modules` 파일 gzip 실측치로 추정했다.

## 요약

**가장 심각한 문제:** 답변 속 블로그 링크가 마크다운 원문 텍스트로 출력되어 클릭 불가 — 위젯을 만든 이유 자체가 작동하지 않는다.
**전체 지적 사항:** HIGH 7건 / MEDIUM 9건 / LOW 7건

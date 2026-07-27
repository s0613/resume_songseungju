# Security Review — 챗봇 UX 수정
> 작성: sj-dev-security · 2026-07-27
> 모드: review
> 대상: `docs/sj-company/.state/dev/frontend.md` (AgentChat.tsx / AgentWidget.tsx / agent.module.css / public/ai-chat-1c.glb)

## 요약

이번 사이클 핵심 신규 공격면인 `renderInlineTokens` 마크다운 렌더러를 42종 페이로드로 적대적 검증했다.
**XSS(스크립트 실행) 벡터는 재현되지 않았다.** `dangerouslySetInnerHTML`/`innerHTML`/`eval` 미사용이 확인됐고,
`javascript:` · `data:` · `vbscript:` · 대소문자·공백·개행·엔티티·퍼센트 인코딩 우회 전부 차단된다.
다만 "내부 링크" 판정 함수에 **역슬래시·탭·개행을 이용한 오픈 리다이렉트 우회 4종**이 존재한다(MEDIUM).

## 검증 방법

`AgentChat.tsx:36-42`의 `isInternalHref`/`isSafeHref`와 `:51`의 토크나이저 정규식을 그대로 이식해
42종 href 페이로드 + 9종 마크다운 문자열 + WHATWG URL 리졸브 + ReDoS 타이밍을 실행 검증했다.

### 차단 확인된 페이로드 (전부 plaintext로 폴백 — 링크 엘리먼트 미생성)

```
javascript:alert(1)              JaVaScRiPt:alert(1)          JAVASCRIPT:alert(1)
 javascript:alert(1) (선행 공백)  \tjavascript:  \njavascript:  U+00A0 javascript:
java\nscript:alert(1)            java\tscript:alert(1)        &#106;avascript:alert(1)
&#x6A;avascript:alert(1)         %6Aavascript:alert(1)        vbscript: / VBScript:
data:text/html,<script>alert(1)</script>                      data:text/html;base64,...
//evil.com   ///evil.com   \\evil.com   \/evil.com            blob: / filesystem: / file: / about:
https:javascript:alert(1)        U+202E(RLO) javascript:alert(1)
```

추가 확인:
- `[x](javascript:alert(1))` → 캡처 그룹 `([^)]+)`가 첫 `)`에서 끊겨 href가 `javascript:alert(1`이 되고, 그마저도 화이트리스트에서 탈락 → 라벨만 텍스트로 렌더.
- `**[x](javascript:alert(1))**` → bold 대안이 먼저 매칭되어 내부는 **플레인 텍스트**로 처리(중첩 링크 미생성). 안전.
- `[<img src=x onerror=alert(1)>](/a)` → 라벨은 React children으로 escape됨. 안전.
- `^https?:\/\/` 는 `i` 플래그가 없어 `HTTPS://`/`hTtP://`가 링크가 되지 않는다 — 보안상 fail-closed(안전 방향)이나 기능상 외부 링크가 텍스트로 떨어질 수 있음.
- ReDoS: `**`×32,000 반복에서 0.62ms — 실질 위험 없음.

## 발견

### CRITICAL — 머지 차단
없음.

### HIGH — 머지 전 수정 권장
없음.

### MEDIUM — 후속 수정 권장

**[frontend] `src/components/agent/AgentChat.tsx:36-38` — `isInternalHref` 우회로 인한 오픈 리다이렉트(크로스 오리진 피싱)**

주석은 "`//` 프로토콜 상대 경로는 제외"라고 명시하지만, `//`만 막고 **브라우저 URL 파서가 `//`와 동일하게 취급하는 변형**은 통과한다.
통과한 href는 `next/link`로 내부 링크처럼 렌더되어, 사용자에게는 사이트 내부 링크로 보이지만 클릭 시 외부 도메인으로 이동한다.

재현 페이로드 (모두 토크나이저 통과 → `<Link>` 생성 → `https://songseungju.dev` 기준 리졸브 결과):

| LLM 출력 | `isInternalHref` | 실제 이동 |
|---|---|---|
| `[블로그 보기](/\evil.com)` | true | `https://evil.com/` |
| `[블로그 보기](/\/evil.com)` | true | `https://evil.com/` |
| `[블로그 보기](/<TAB>/evil.com)` | true | `https://evil.com/` |
| `[블로그 보기](/<LF>/evil.com)` 및 `<CR>` | true | `https://evil.com/` |

원인: WHATWG URL 파싱은 special scheme에서 `\`를 `/`와 동등하게 처리하고, 파싱 전에 ASCII tab/LF/CR을 **전부 제거**한다.
토크나이저의 `([^)]+)`와 `([^\]]+)`가 탭·개행을 그대로 캡처하므로 세 문자 모두 href에 도달 가능하다.

영향도가 MEDIUM인 이유: 스크립트 실행은 없고(순수 내비게이션), href를 통제하려면 LLM 출력을 조종해야 하며
지식 베이스(`src/data/agent-knowledge.ts`)는 사이트 소유자 콘텐츠만 담고 대화는 공유·영속되지 않아
실질적으로 프롬프트 인젝션을 수행한 본인이 표적이 된다. 다만 검증 함수가 스스로 약속한 불변식이 깨진 상태다.

권장 조치 (fail-closed 화이트리스트로 정리):

```ts
function isInternalHref(href: string): boolean {
    // 브라우저 URL 파서는 탭/개행/CR을 제거하고 '\'를 '/'로 정규화하므로 선정규화 후 검사
    const normalized = href.replace(/[\t\n\r]/g, "")
    return /^\/(?![/\\])[^\s\\]*$/.test(normalized)
}
```

### LOW — 후속 작업 / 보고만

**[frontend] `public/ai-chat-1c.glb` — draco 압축 전환으로 gstatic 외부 디코더 의존 신규 발생 (공급망, 차단 아님)**

GLB에 `KHR_draco_mesh_compression`이 포함됨을 확인했고(21,800 bytes), `@google/model-viewer@4.3.1` 번들에
하드코딩된 디코더 경로를 확인했다:

```
node_modules/@google/model-viewer/dist/model-viewer.min.js
  https://www.gstatic.com/draco/versioned/decoders/1.5.6/
  https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/
```

즉 압축 전(무압축 GLB)에는 발생하지 않던 **런타임 서드파티 WASM 페치가 이번 변경으로 새로 생겼다**.
평가: 위험 수준 낮음 — 버전 고정 경로이고 Google 소유 도메인이며 SRI 불가한 WASM 페치는 업계 일반 관행이다.
다만 (a) 향후 CSP 도입 시 `script-src`/`connect-src`에 `https://www.gstatic.com` 허용이 반드시 필요하고,
(b) 서드파티 도메인 장애 = 3D 아이콘 로드 실패이며, (c) 무결성 검증 수단이 없다.
완전 자립을 원하면 `ModelViewerElement.dracoDecoderLocation`을 self-host 경로로 지정하는 후속 작업 권장.
현재는 `AgentWidget.tsx:44-46`에서 import 실패 시 글리프 폴백, `:73-75`에서 `error` 이벤트 시 영구 폴백이 있어
가용성 회귀는 방어되어 있다.

**[frontend/backend] 사이트 전역 CSP·보안 헤더 부재 (기존 이슈, 이번 사이클과 무관하나 노출면 확대)**

`next.config.ts`에 `headers()` 없음, `middleware.ts` 없음, `vercel.json` 없음 — CSP/HSTS/X-Frame-Options/
X-Content-Type-Options 전부 미설정. 이번에 챗봇 위젯이 `layout.tsx`를 통해 **전 페이지에 전역 마운트**되고
LLM 출력을 DOM에 렌더하기 시작했으므로, CSP는 렌더러 파싱 버그에 대한 2차 방어선으로서 가치가 이전보다 커졌다.
별도 태스크 권장.

**[backend] `src/app/api/agent/chat/route.ts` — 이번 사이클 변경 없음 확인, 회귀 없음**

mtime 13:18(백엔드 사이클) vs 프론트 변경 13:37~13:50 — 변경되지 않았다. 기존 방어 그대로 유효:
검증(`parseMessages` role/content 타입·공백·길이·개수·마지막 발화 role), 레이트리밋(IP당 60초 10회), 하드코딩 키 0건.
클라이언트 계약도 일치한다(`HISTORY_LIMIT 12` = `MAX_MESSAGES 12`, `INPUT_LIMIT 1000` = `MAX_CONTENT_LENGTH 1000`).
신규 `isError` 히스토리 필터링은 서버로 `{role, content}`만 매핑해 보내므로 스키마 회귀 없음.

참고(보안 아님, 기존 계약 이슈): 서버 `maxOutputTokens: 800`으로 생성된 assistant 답변이 1000자를 넘으면
다음 턴에 그 답변이 히스토리로 되돌아가 `MAX_CONTENT_LENGTH` 검증에 걸려 400이 되고, 대화가 그 지점에서 막힌다.
이번 변경이 만든 문제는 아니나 후속 확인 권장.

**레이트리밋 구조 한계 (기존)**: `hits` Map이 인스턴스 로컬이라 서버리스 다중 인스턴스에서 실효 한도가 인스턴스 수만큼 배증한다.
LLM 호출 비용 남용 완화가 목적이라면 후속으로 공유 스토어 기반 리밋 검토 권장.

## 키·시크릿 점검

- `src/components/agent/**`, `src/data/agent-knowledge.ts`, `src/app/api/agent/**`, `src/types/**` 전수 스캔 — **하드코딩 시크릿 0건**.
- 유일한 자격증명 참조는 `process.env.AGENT_MODEL`(모델명, 비밀 아님)이며, Google API 키는 SDK가 환경변수에서 읽어 코드에 노출되지 않는다.
- `.env*`가 `.gitignore:34`로 제외되어 있고 추적 중인 env 파일 0건. `.env.example` 실값 유출 해당 없음.
- `agent-knowledge.ts:15`의 이메일은 사이트에 이미 공개된 소유자 본인 연락처 — PII 유출 아님. 제3자 개인정보·시드 실사용자 데이터 없음.
- 로그: `route.ts:104` `console.error("[agent:chat]", error)` — 서버 사이드 전용이고 응답 본문에는 `{error: "agent_unavailable"}` 상수만 반환. 토큰·비밀번호 노출 없음.

## 프론트엔드 체크

- `AgentChat.tsx:74-83` 외부 링크: `target="_blank"` + `rel="noopener noreferrer"` **정상**. 리포지토리 내 나머지 `_blank` 6곳도 전부 rel 보유 확인.
- 토큰·비밀값의 `localStorage`/`sessionStorage` 저장 없음. 인증 기능 자체가 없는 공개 엔드포인트.
- CSRF: 인증·상태변경 없는 stateless 공개 엔드포인트로 CSRF 영향 없음(공격자가 얻을 권한 상승 없음). 남용 방어는 레이트리밋이 담당.

## 판정: PASS

CRITICAL 0건, HIGH 0건 — 머지 차단 사유 없음.
MEDIUM 1건(오픈 리다이렉트 우회)은 짧은 수정으로 해소 가능하므로 이번 사이클 내 또는 즉시 후속 처리 권장.

## 알려진 제약 / 후속 작업
- MEDIUM 오픈 리다이렉트 수정(`isInternalHref` 제어문자·역슬래시 차단) — 요구사항을 막지는 않으나 우선 처리 권장.
- CSP/보안 헤더 도입, draco 디코더 self-host, 공유 스토어 레이트리밋 — 각각 별도 태스크.

---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-12
tags:
  - design-system
  - ui-library
  - react
  - ai-interface
  - open-source
  - ai-ready
---

# Ant Design X 디자인 시스템

> 한 줄 정의
> Ant Design의 대형 범용 컴포넌트·Design Token 위에 대화, 입력, 사고 과정, 출처, streaming Markdown, AI SDK, A2UI 카드를 얹은 AI 인터페이스 전용 React 시스템. 문서: https://x.ant.design

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 npm 기준 `antd` 6.5.0, `@ant-design/x` 2.8.0, `@ant-design/x-skill` 2.8.0은 모두 **MIT**. 핵심 UI·SDK·Agent Skills는 개인·상업 프로젝트에서 무료로 사용할 수 있다.

## 예시 화면

![[preview-ant-design-x.png]]

> 공식 홈페이지의 RICH 패러다임 기반 AI 인터페이스 예시. 2026-07-12 캡처. 출처: https://x.ant.design

## Astryx와 닮은 점

- 범용 React 디자인 시스템 위에 AI Chat 전용 컴포넌트 스위트 제공
- 대화 목록, 메시지 버블, 입력 composer, 첨부, 사고 과정, 도구성 결과 UI를 조합
- 전역 token과 컴포넌트 token으로 테마 제어
- AI 코딩 도구가 올바른 컴포넌트·SDK 패턴을 쓰도록 공식 Agent Skills 제공
- API 연결, streaming Markdown, 동적 Agent UI까지 한 생태계에서 처리

[[Astryx 디자인 시스템|Astryx]] 대안 중 **AI 채팅 제품 기능만 보면 가장 직접적으로 겹친다**. 대신 범용 UI는 `antd`, AI UI는 `@ant-design/x`를 함께 사용하므로 더 큰 생태계와 강한 Ant Design 시각 언어를 받아들여야 한다.

## 설치

```bash
npm install antd @ant-design/x
```

```tsx
import { Bubble, Sender, XProvider } from '@ant-design/x';

const messages = [
  { key: 'user-1', role: 'user', content: 'Summarize this report.' },
];

export function Chat() {
  return (
    <XProvider>
      <Bubble.List items={messages} />
      <Sender placeholder="Ask anything" />
    </XProvider>
  );
}
```

## AI 컴포넌트 인벤토리

공식 분류 기준 17개 핵심 UI가 있다.

| 단계 | 컴포넌트 | 역할 |
|---|---|---|
| 공통 | Bubble, Conversations, Notification | 메시지·대화 목록·시스템 알림 |
| Wake | Welcome, Prompts | 첫 화면과 추천 프롬프트 |
| Express | Attachments, Sender, Suggestion | 입력·파일·빠른 명령 |
| Confirm | Think, ThoughtChain | 처리 중 상태와 단계 표시 |
| Feedback | Actions, CodeHighlighter, FileCard, Folder, Mermaid, Sources | 결과 적용·코드·파일·도표·출처 |
| 전역 | XProvider | theme, locale, direction, 컴포넌트 기본 설정 |

## 주변 패키지

| 패키지 | 역할 |
|---|---|
| `@ant-design/x` | AI 대화 React 컴포넌트 |
| `@ant-design/x-sdk` | streaming 요청, 메시지 상태, provider 연결 |
| `@ant-design/x-markdown` | streaming Markdown, 수식, 코드 하이라이트, Mermaid |
| `@ant-design/x-card` | A2UI JSON stream으로 검증된 동적 UI 렌더링 |
| `@ant-design/x-skill` | 컴포넌트·SDK·Markdown·A2UI Agent Skills |

`x-card`는 Agent가 임의 HTML을 실행하는 대신 사전에 허용한 컴포넌트 catalog를 구조화된 데이터로 지정하게 해 동적 UI의 통제 범위를 좁힌다.

## 테마와 token

`XProvider`는 Ant Design의 `ConfigProvider`를 완전히 확장한다.

```tsx
import { XProvider } from '@ant-design/x';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <XProvider
      theme={{
        token: {
          colorPrimary: '#315C55',
          borderRadius: 6,
        },
        components: {
          Button: { controlHeight: 38 },
        },
      }}
    >
      {children}
    </XProvider>
  );
}
```

- global token: color, type, size, radius, motion 등
- component token: Sender, Button 등 특정 컴포넌트의 세부 시각 값
- algorithm: light/dark·compact 같은 테마 알고리즘 조합
- locale·RTL·단축키·컴포넌트 기본 props도 XProvider에서 통합

## Agent Skills

```bash
npm i -g @ant-design/x-skill
npx x-skill
```

공식 skill 범위는 다음과 같다.

- `x-components`: 17개 AI UI 컴포넌트 API와 패턴
- `use-x-chat`, `x-chat-provider`, `x-request`: 대화 상태와 API 연결
- `x-markdown`: streaming Markdown과 커스텀 렌더러
- `x-card`: A2UI command, data binding, catalog, action

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| AI 챗·에이전트·copilot UI | 가장 적합 — Astryx Chat 스위트의 직접 대안 |
| 출처·사고 단계·파일·코드·Mermaid 결과 | 매우 적합 — 전용 피드백 컴포넌트 |
| Agent가 안전한 동적 폼·카드를 생성 | 적합 — A2UI 기반 `x-card` |
| 기존 Ant Design 업무 앱에 AI를 추가 | 매우 적합 — 같은 Provider·token 사용 |
| 작은 마케팅 사이트·가벼운 위젯 | 과함 — antd와 X 생태계가 필요 |
| 모바일 우선 AI 앱 | 주의 — 공식 FAQ는 현재 주 대상이 데스크톱이라고 설명 |
| Ant Design의 시각 언어를 크게 벗어나야 함 | 주의 — token 커스텀은 가능하지만 구조와 기본 인상이 강함 |

## 비용 경계

- UI 패키지와 Agent Skills: MIT, 무료
- OpenAI 등 모델·Agent API 호출료: 별도
- 서드파티 아이콘·템플릿·서비스: 각 라이선스와 요금 확인
- Ant Design 상표·로고 사용: 코드 라이선스와 별개

## 공식 출처

- 전체 도구 체계: https://x.ant.design/docs/react/introduce/
- 컴포넌트·설치: https://x.ant.design/components/introduce/ · https://x.ant.design/components/overview/
- XProvider·테마: https://x.ant.design/components/x-provider/ · https://ant.design/docs/react/customize-theme/
- Agent Skills: https://x.ant.design/x-skills/introduce/ · https://x.ant.design/x-skills/skills/
- A2UI Card: https://x.ant.design/x-cards/introduce/
- 라이선스·저장소: https://github.com/ant-design/x · https://github.com/ant-design/ant-design

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[디자인 시스템]]
- [[UI 시각 체계]]

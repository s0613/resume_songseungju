---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-12
tags:
  - design-system
  - ui-library
  - react
  - open-source
  - ai-ready
---

# Chakra UI 디자인 시스템

> 한 줄 정의
> 접근성 높은 React 컴포넌트, semantic token·recipe 테마 엔진, CLI, MCP, Agent Skills를 함께 제공하는 관리형 디자인 시스템. 문서: https://chakra-ui.com

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 npm 기준 `@chakra-ui/react` 3.36.0과 `@chakra-ui/react-mcp` 2.1.1은 모두 **MIT**. 개인·상업 프로젝트에서 무료로 사용할 수 있다. 단, **Chakra UI Pro** 블록과 MCP의 Pro 템플릿 조회는 유료 라이선스가 필요하다.

## 예시 화면

![[preview-chakra-ui.png]]

> 공식 홈페이지의 레이아웃·입력·탭 컴포넌트 조합 예시. 2026-07-12 캡처. 출처: https://chakra-ui.com

## Astryx와 닮은 점

- NPM으로 버전 관리되는 완성형 React 컴포넌트 라이브러리
- 원시 token → semantic token → component recipe 구조와 자동 다크 모드
- CLI로 snippet과 테마 타입을 생성
- 공식 MCP가 컴포넌트 props·예제·토큰·마이그레이션 정보를 에이전트에 제공
- Claude Code용 builder·migrate·refactor Agent Skills 제공

가장 큰 차이는 [[Astryx 디자인 시스템|Astryx]]의 Chat 전용 스위트와 공식 다중 테마 팩이 Chakra 코어에는 없다는 점이다.

## 설치

공식 문서는 Node.js 20 이상을 요구한다.

```bash
npm i @chakra-ui/react @emotion/react
npx @chakra-ui/cli snippet add
```

생성된 Provider를 앱 루트에 둔다.

```tsx
import { Provider } from '@/components/ui/provider';

export function App({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
```

## 컴포넌트 범위

공식 Agent Skill 문서는 약 114개 컴포넌트를 기준으로 선택 가이드를 제공한다.

| 그룹 | 예 |
|---|---|
| 레이아웃 | Box, Container, Flex, Grid, Stack, Splitter, ScrollArea |
| 입력 | Checkbox, Combobox, DatePicker, FileUpload, PasswordInput, Select, Slider, TagsInput |
| 오버레이 | Dialog, Drawer, FloatingPanel, Menu, Popover, Tooltip |
| 데이터·피드백 | Card, DataList, Table, Timeline, TreeView, EmptyState, Progress, Toast |
| 고급 | RichTextEditor, CodeBlock, Charts, ColorPicker, QRCode |

## 토큰과 테마

`defineConfig`와 `createSystem`으로 토큰, semantic token, recipe를 정의한다.

```tsx
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens: {
      colors: {
        brand: { value: '#315C55' },
      },
    },
    semanticTokens: {
      colors: {
        action: {
          value: { base: '{colors.brand}', _dark: '#8FC7B9' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
```

- 토큰 영역: color, spacing, font, radius, shadow, animation 등
- `recipe`: Button처럼 단일 슬롯 컴포넌트의 variant·size
- `slotRecipe`: Dialog처럼 여러 슬롯을 가진 컴포넌트
- `strictTokens`: 정의되지 않은 raw 값을 TypeScript 오류로 막음
- `chakra typegen`: 커스텀 토큰과 recipe 타입 자동 생성

## AI 연동

### MCP

```bash
claude mcp add chakra-ui -- npx -y @chakra-ui/react-mcp
```

주요 무료 도구는 `list_components`, `get_component_props`, `get_component_example`, `get_theme`, `theme_customization`, `v2_to_v3_code_review`다. Pro 템플릿 도구 두 개는 API 키가 있어야 한다.

### Agent Skills

```bash
npx skills add https://github.com/chakra-ui/chakra-ui/tree/main/skills
```

설치되는 역할은 `chakra-ui-builder`, `chakra-ui-migrate`, `chakra-ui-refactor`다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| 범용 SaaS·대시보드·내부 도구 | 적합 — 넓은 컴포넌트와 빠른 조합 |
| AI 에이전트가 자주 UI 코드를 생성 | 매우 적합 — MCP·Skills·llms.txt가 모두 공식 제공 |
| 강한 브랜드 테마가 필요 | 적합 — semantic token·recipe로 시스템 차원의 커스텀 가능 |
| AI 채팅 화면을 즉시 완성 | 보완 필요 — [[Ant Design X 디자인 시스템]] 또는 shadcn 채팅 프리미티브 병용 검토 |
| 런타임 CSS-in-JS를 피해야 함 | 주의 — 현재 Emotion 런타임 사용, 공식 로드맵은 zero-runtime 방향 |

## 공식 출처

- 설치·버전: https://chakra-ui.com/docs/get-started/installation
- 컴포넌트 목록: https://chakra-ui.com/docs/components/concepts/overview
- 테마·semantic token: https://chakra-ui.com/docs/theming/overview · https://chakra-ui.com/docs/theming/semantic-tokens
- CLI: https://chakra-ui.com/docs/get-started/cli
- MCP: https://chakra-ui.com/docs/get-started/ai/mcp-server
- Agent Skills: https://chakra-ui.com/docs/get-started/ai/skills
- 라이선스: https://github.com/chakra-ui/chakra-ui/blob/main/LICENSE

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[디자인 시스템]]
- [[UI 시각 체계]]

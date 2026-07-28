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

# Mantine 디자인 시스템

> 한 줄 정의
> 120개 이상의 React 컴포넌트와 70개 이상의 훅, 폼·날짜·차트·알림 확장, theme object·CSS 변수, llms.txt·Skills·MCP를 제공하는 대형 범용 UI 시스템. 문서: https://mantine.dev

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 기준 `@mantine/core` 9.4.1과 `@mantine/mcp-server` 9.4.1은 **MIT**. 공식 홈페이지는 Mantine UI의 공개 반응형 블록도 모두 무료라고 명시한다.

## 예시 화면

![[preview-mantine.png]]

> 공식 홈페이지의 대시보드·데이터 표시·입력 컴포넌트 조합 예시. 2026-07-12 캡처. 출처: https://mantine.dev

## Astryx와 닮은 점

- NPM으로 버전 관리되는 완성형 React 컴포넌트 라이브러리
- 테마 객체가 색·타입·간격·radius·shadow·컴포넌트 기본값을 통제
- light/dark/auto 색상 모드와 CSS 변수
- llms.txt, 공식 Agent Skills, 컴포넌트 문서를 조회하는 MCP
- AppShell·폼·날짜·오버레이·데이터 표시가 한 생태계 안에 있음

Astryx의 Chat 스위트나 공식 테마 팩보다는 **범용 업무 앱의 기능 폭**에 집중한다.

## 설치

```bash
npm install @mantine/core @mantine/hooks
```

```tsx
import '@mantine/core/styles.css';
import { Button, MantineProvider } from '@mantine/core';

export function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Button>Save</Button>
    </MantineProvider>
  );
}
```

## 생태계 범위

| 패키지·영역 | 역할 |
|---|---|
| `@mantine/core` | AppShell, 입력, 오버레이, 탐색, 데이터 표시, 타이포그래피 |
| `@mantine/hooks` | 브라우저·상태·이벤트·레이아웃 관련 70개 이상 훅 |
| `@mantine/form` | 중첩 필드, 검증, controlled/uncontrolled 폼 |
| `@mantine/dates` | Calendar, DatePicker, DateTimePicker 등 |
| 확장 | Notifications, Modals, Spotlight, Charts, Carousel, RichTextEditor |
| Mantine UI | 공식·커뮤니티가 만든 반응형 페이지 블록 |

복잡한 Select 계열은 `Combobox` 합성 API를 기반으로 Autocomplete, MultiSelect, TagsInput, TreeSelect까지 제공한다.

## 테마와 스타일

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'forest',
  colors: {
    forest: [
      '#edf8f4', '#d8eee7', '#b0ddce', '#85c9b4', '#65b99f',
      '#52af92', '#479f84', '#38806a', '#2d6656', '#234f43',
    ],
  },
  fontFamily: 'Pretendard, sans-serif',
  defaultRadius: 'sm',
  respectReducedMotion: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
```

- theme object: colors, font, heading, spacing, radius, shadow, breakpoint, component defaults
- CSS variables: theme 값을 CSS·CSS Module에서도 사용
- Styles API: 컴포넌트 내부 slot별 class·style·variable 재정의
- native CSS: 공식 설명상 런타임 스타일 계산 없이 CSS 파일로 제공
- color scheme: light, dark, auto와 SSR용 초기 스크립트 지원

## AI 연동

### 문서

- compact: `https://mantine.dev/llms.txt`
- full: `https://mantine.dev/llms-full.txt`

### Agent Skills

```bash
npx skills add https://github.com/mantinedev/skills --skill mantine-combobox
npx skills add https://github.com/mantinedev/skills --skill mantine-form
npx skills add https://github.com/mantinedev/skills --skill mantine-custom-components
```

### MCP

```json
{
  "mcpServers": {
    "mantine": {
      "command": "npx",
      "args": ["-y", "@mantine/mcp-server"]
    }
  }
}
```

MCP는 `list_items`, `get_item_doc`, `get_item_props`, `search_docs`를 제공한다. 공식 문서에서 아직 **experimental**로 표시한다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| SaaS·어드민·복잡한 업무 폼 | 매우 적합 — 넓은 입력·폼·날짜 범위 |
| 의존성 하나의 스타일보다 기능 완결성이 중요 | 매우 적합 |
| AI가 공식 API를 자주 조회 | 적합 — llms.txt·Skills·실험적 MCP |
| 전용 AI 채팅 UI가 핵심 | 보완 필요 — [[Ant Design X 디자인 시스템]] 또는 [[shadcn-ui 디자인 시스템]] 병용 검토 |
| 완전히 무색무취한 headless 프리미티브만 필요 | 부적합 — 기본 시각 언어와 API가 있는 완성형 라이브러리 |
| 중앙 디자인 시스템을 소스째 소유해야 함 | 주의 — [[Park UI 디자인 시스템]]이나 shadcn/ui가 더 직접적 |

## 공식 출처

- 규모·AI 도구: https://mantine.dev/
- Core·설치·라이선스: https://mantine.dev/core/package/
- 테마: https://mantine.dev/theming/theme-object/ · https://mantine.dev/styles/css-variables/
- LLM·Skills·MCP: https://mantine.dev/guides/llms/
- 저장소 라이선스: https://github.com/mantinedev/mantine/blob/master/LICENSE

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[디자인 시스템]]
- [[UI 시각 체계]]

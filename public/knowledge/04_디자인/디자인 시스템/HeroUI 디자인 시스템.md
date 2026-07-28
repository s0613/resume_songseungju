---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-12
tags:
  - design-system
  - ui-library
  - react
  - tailwind
  - open-source
  - ai-ready
---

# HeroUI 디자인 시스템

> 한 줄 정의
> React Aria의 접근성 동작과 Tailwind CSS v4·CSS 변수 테마를 결합하고, MCP·llms.txt·Agent Skills까지 제공하는 관리형 React UI 라이브러리. 문서: https://heroui.com

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 기준 `@heroui/react` 3.2.2와 `@heroui/styles` 3.2.2의 **배포 tarball에 포함된 LICENSE는 Apache-2.0**, `@heroui/react-mcp` 1.1.0은 MIT다. 모두 개인·상업 프로젝트에서 무료로 사용할 수 있다. **HeroUI Pro**의 고급 컴포넌트와 템플릿은 별도 유료 상품이다.

> [!WARNING] 라이선스 표기 불일치
> `@heroui/react@3.2.2`와 `@heroui/styles@3.2.2`의 npm 메타데이터는 MIT로 표시되지만 실제 tarball의 `package/LICENSE`와 저장소 기본 `v3` 브랜치는 Apache-2.0이다. 재배포 시 메타데이터가 아니라 **설치한 버전에 동봉된 Apache-2.0 LICENSE**를 기준으로 보관·준수한다.

## 예시 화면

![[preview-heroui.png]]

> 공식 홈페이지의 폼·인증·버튼·색상 컴포넌트 조합 예시. 2026-07-12 캡처. 출처: https://heroui.com

## Astryx와 닮은 점

- NPM 관리형 컴포넌트와 별도 스타일 패키지
- 75개 이상의 Web 컴포넌트와 React Native 계열
- CSS 변수 기반 light/dark 테마와 커스텀 테마
- 컴포넌트 문서·소스·스타일·테마 변수를 조회하는 공식 MCP
- llms.txt, Agent Skills, AI 설치 프롬프트를 공식 워크플로로 취급

Astryx보다 Tailwind·React Aria 생태계에 가깝고, Chat 전용 컴포넌트보다는 범용 UI와 접근성에 강하다.

## 설치

HeroUI v3는 React 19 이상과 Tailwind CSS v4를 요구한다.

```bash
npm i @heroui/styles @heroui/react
```

```css
@import 'tailwindcss';
@import '@heroui/styles';
```

```tsx
import { Button } from '@heroui/react';

export function SaveButton() {
  return <Button>Save</Button>;
}
```

v3는 기본 사용에 Provider가 필요하지 않는다. 스타일 임포트를 제거하면 접근성 동작만 유지하는 headless 방식으로도 쓸 수 있다.

## 설계 구조

| 층 | 구현 |
|---|---|
| 동작·접근성 | React Aria Components — 키보드, 포커스, 스크린리더 동작 |
| 스타일 | `@heroui/styles` — Tailwind v4, BEM 클래스, CSS layer |
| 토큰 | semantic CSS 변수, OKLCH 색상, radius·spacing 등 |
| 컴포넌트 API | compound component와 표준 `className` |
| AI 컨텍스트 | MCP, llms.txt, Agent Skills, AGENTS.md 생성 |

## 테마

Provider나 JavaScript theme object 대신 CSS 변수를 교체한다.

```css
@layer base {
  [data-theme='forest'] {
    --accent: oklch(0.48 0.12 165);
    --background: oklch(0.98 0.01 155);
    --foreground: oklch(0.19 0.02 155);
    --radius: 0.5rem;
  }

  [data-theme='forest-dark'] {
    color-scheme: dark;
    --accent: oklch(0.74 0.13 165);
    --background: oklch(0.14 0.01 155);
    --foreground: oklch(0.95 0.01 155);
  }
}
```

- BEM 클래스(`.button`, `.button--primary`)로 전역 컴포넌트 스타일 재정의
- 전체 스타일 또는 컴포넌트별 CSS 선택 임포트
- `@heroui/styles`만 일반 HTML이나 다른 프레임워크에 사용 가능
- Theme Builder에서 색, radius, font를 조정해 CSS 내보내기

## AI 연동

### MCP

```bash
claude mcp add heroui-react -- npx -y @heroui/react-mcp@latest
```

MCP는 컴포넌트 목록·문서·소스 코드·소스 스타일·테마 변수를 직접 조회한다. Node.js 22 이상이 필요하다.

### 에이전트 문서

```bash
npx heroui-cli agents-md
```

공식 npm 안내 기준으로 Agent Skills와 `https://heroui.com/llms.txt`도 제공한다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| Tailwind v4 기반 React 19 프로젝트 | 매우 적합 |
| 접근성과 기본 시각 완성도를 함께 원함 | 매우 적합 — React Aria 기반 |
| AI 에이전트가 테마·소스까지 읽어야 함 | 매우 적합 — MCP가 소스와 CSS까지 반환 |
| React 18 또는 Tailwind v3 유지 프로젝트 | 부적합 — v3 요구사항과 충돌 |
| AI 채팅 스위트를 즉시 사용 | 보완 필요 — [[Ant Design X 디자인 시스템]]이나 [[shadcn-ui 디자인 시스템]] 검토 |
| 고급 DataGrid·Kanban·템플릿을 무료로 기대 | 주의 — 일부는 HeroUI Pro 영역 |

## 공식 출처

- 소개·요구사항: https://heroui.com/en/docs/react/getting-started · https://heroui.com/en/docs/react/getting-started/quick-start
- v3 구조: https://heroui.com/en/docs/react/releases/v3-0-0
- 테마: https://heroui.com/en/docs/react/getting-started/theming
- 컴포넌트: https://heroui.com/en/docs/react/components
- MCP: https://heroui.com/en/docs/react/getting-started/mcp-server
- npm 패키지: https://www.npmjs.com/package/@heroui/react
- v3 저장소 라이선스: https://github.com/heroui-inc/heroui/blob/v3/LICENSE

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[디자인 시스템]]
- [[UI 시각 체계]]

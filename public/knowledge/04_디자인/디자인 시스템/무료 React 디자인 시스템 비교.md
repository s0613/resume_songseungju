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

# Astryx와 비슷한 무료 React 디자인 시스템

> [!NOTE] 한 줄 결론
> [[Astryx 디자인 시스템]]처럼 **토큰 + 완성형 컴포넌트 + AI 코딩 지원**을 한 번에 원하면 [[Chakra UI 디자인 시스템]] 또는 [[HeroUI 디자인 시스템]], AI 채팅 화면이 핵심이면 [[Ant Design X 디자인 시스템]], 소스 소유권이 중요하면 [[shadcn-ui 디자인 시스템]] 또는 [[Park UI 디자인 시스템]], 가장 넓은 범용 컴포넌트가 필요하면 [[Mantine 디자인 시스템]]이 우선 후보다.

## 무료 판정 기준

2026-07-12 기준 아래 세 조건을 모두 확인했다.

1. 공식 npm 패키지 메타데이터 또는 공식 저장소 `LICENSE`에 MIT 등 오픈소스 라이선스가 명시돼 있다.
2. 핵심 컴포넌트와 테마 기능을 구독 없이 설치할 수 있다.
3. 유료 템플릿·Pro 블록은 핵심 시스템과 분리되어 있다.

> [!WARNING] 무료와 무조건 무제한은 다르다
> MIT 계열도 재배포 시 저작권·허가 고지를 유지해야 한다. 코드 라이선스가 상표, 로고, 유료 Figma 자산, 서드파티 레지스트리까지 자동으로 허용하는 것도 아니다. 실제 도입 시 설치된 패키지 버전의 `LICENSE`를 함께 보관한다.

## 비교표

| 시스템 | 배포 방식 | 범위 | 테마·토큰 | AI 도구 | AI 채팅 UI | 확인한 무료 라이선스 |
|---|---|---|---|---|---|---|
| [[Chakra UI 디자인 시스템\|Chakra UI]] 3.36 | NPM 관리형 | 약 114개 범용 컴포넌트 | semantic token, recipe, 다크 모드 | MCP, llms.txt, Agent Skills, CLI | 전용 스위트 없음 | MIT |
| [[HeroUI 디자인 시스템\|HeroUI]] 3.2 | NPM 관리형 | 75개 이상, Web + Native | CSS 변수, Tailwind v4, OKLCH, 다크 모드 | MCP, llms.txt, Agent Skills | 전용 스위트 없음 | Apache-2.0 코어 / MIT MCP |
| [[shadcn-ui 디자인 시스템\|shadcn/ui]] CLI 4.13 | 소스 복사형 | 범용 + Bubble·Message·Attachment | semantic CSS 변수, Tailwind, 다크 모드 | MCP, llms.txt, Skills, Registry CLI | 기본 채팅 프리미티브 제공 | MIT, 기본 레지스트리 기준 |
| [[Mantine 디자인 시스템\|Mantine]] 9.4 | NPM 관리형 | 120개 이상 + 70개 훅 | theme object, CSS 변수, 다크 모드 | 실험적 MCP, llms.txt, Agent Skills | 전용 스위트 없음 | MIT |
| [[Park UI 디자인 시스템\|Park UI]] CLI 1.0 | 소스 복사형 | 범용 컴포넌트 | Panda recipe, Radix Colors, light/dark | 오픈 코드 기반 AI-ready | 전용 스위트 없음 | MIT |
| [[Ant Design X 디자인 시스템\|Ant Design + X]] 6.5 / 2.8 | NPM 관리형 | 대형 범용 시스템 + AI 전용 17종 | Design Token, XProvider, 컴포넌트 토큰 | 전용 Agent Skills | 가장 강함: 대화·입력·사고·출처·스트리밍 | MIT |

버전은 비교 시점의 npm `latest`이며 선택 근거이지 고정 권장 버전이 아니다.

## Astryx와의 유사도

| Astryx의 강점 | 가장 가까운 대안 | 차이 |
|---|---|---|
| 관리형 React 패키지 + 넓은 컴포넌트 | Chakra UI, HeroUI, Mantine | Astryx의 공식 테마 팩·Chat 스위트와 구성 방식이 다름 |
| CLI·MCP·에이전트 문서 | Chakra UI, HeroUI, shadcn/ui | 세 시스템 모두 공식 MCP가 있고, Chakra·HeroUI는 관리형 패키지라 특히 가까움 |
| AI 채팅 컴포넌트 | Ant Design X, shadcn/ui | Ant Design X는 가장 완성도가 높고, shadcn/ui는 코드를 직접 소유하는 방식 |
| 테마 교체와 의미 토큰 | Chakra UI, HeroUI, Park UI | Park UI는 Panda CSS 설정과 코드 생성이 선행됨 |
| 빠른 내부 도구 개발 | Mantine, Chakra UI | Mantine은 폼·날짜·오버레이·훅 범위가 특히 넓음 |

## 상황별 선택

아래 표로 기능과 프로젝트 조건에 맞는 시스템을 고른다.

| 상황 | 1순위 | 이유 |
|---|---|---|
| AI 에이전트·챗 제품 | [[Ant Design X 디자인 시스템]] | Bubble, Sender, ThoughtChain, Sources, streaming Markdown, SDK가 한 생태계에 있음 |
| Astryx와 가장 비슷한 일반형 대체재 | [[Chakra UI 디자인 시스템]] | 관리형 컴포넌트·semantic token·CLI·MCP·Agent Skills 조합 |
| Tailwind 기반 관리형 라이브러리 | [[HeroUI 디자인 시스템]] | Tailwind v4 + React Aria + MCP, 소스 복사 없이 업데이트 가능 |
| 제품 코드 안에 컴포넌트를 소유 | [[shadcn-ui 디자인 시스템]] | CLI가 실제 소스를 설치하고 MCP가 레지스트리를 검색·설치 |
| 자체 디자인 시스템의 기반 | [[Park UI 디자인 시스템]] | Ark UI 동작 계층과 Panda recipe를 편집 가능한 소스로 가져옴 |
| SaaS·어드민을 가장 빨리 완성 | [[Mantine 디자인 시스템]] | 120+ 컴포넌트, 폼·날짜·차트·알림·모달·70+ 훅 |

## 무료 범위 주의

| 시스템 | 무료 코어에 포함 | 별도 확인 또는 유료 |
|---|---|---|
| Chakra UI | React 컴포넌트, 테마, CLI, 기본 MCP 도구, Skills | Chakra UI Pro 블록·MCP 템플릿 도구 |
| HeroUI | Apache-2.0 React/Styles, MIT MCP, 기본 컴포넌트, llms.txt | HeroUI Pro 컴포넌트·템플릿 |
| shadcn/ui | 공식 레지스트리와 CLI/MCP | 서드파티·사설 레지스트리는 각 라이선스 확인 |
| Mantine | Core, Hooks, 공식 확장, Mantine UI 공개 블록 | 서드파티 확장·템플릿은 개별 확인 |
| Park UI | CLI, 컴포넌트 소스, Panda preset | Figma 등 별도 디자인 자산은 자산별 약관 확인 |
| Ant Design + X | antd, X, X SDK/Markdown/Card/Skills | 서드파티 템플릿·아이콘·모델 API 비용은 별도 |

## 공식 출처

- Chakra UI: https://chakra-ui.com/docs/get-started/installation · https://chakra-ui.com/docs/get-started/ai/mcp-server · https://github.com/chakra-ui/chakra-ui/blob/main/LICENSE
- HeroUI: https://heroui.com/en/docs/react/getting-started · https://heroui.com/en/docs/react/getting-started/mcp-server · https://www.npmjs.com/package/@heroui/react
- shadcn/ui: https://ui.shadcn.com/docs · https://ui.shadcn.com/docs/mcp · https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
- Mantine: https://mantine.dev/ · https://mantine.dev/guides/llms/ · https://github.com/mantinedev/mantine/blob/master/LICENSE
- Park UI: https://park-ui.com/docs/introduction · https://park-ui.com/docs/theming · https://github.com/chakra-ui/park-ui/blob/main/LICENSE
- Ant Design X: https://x.ant.design/docs/react/introduce/ · https://x.ant.design/x-skills/introduce/ · https://github.com/ant-design/x

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[Astryx 디자인 시스템]]
- [[디자인 시스템]]
- [[UI 시각 체계]]

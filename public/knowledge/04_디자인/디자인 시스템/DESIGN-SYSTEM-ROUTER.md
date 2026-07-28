---
type: router
domain: design
status: active
last-reviewed: 2026-07-27
aliases:
  - 디자인 시스템 라우터
  - Design System Router
tags:
  - design-system
  - router
  - ui-library
  - react
  - open-source
---

# Design System Router

> [!IMPORTANT] 목적
> UI 설계·구현을 시작하기 전에 **기존 프로젝트 조건 → 제외 조건 → 제품 유형** 순서로 검사해 주 디자인 시스템 하나를 고른다. 선택한 시스템이 제공하는 공식 디자인을 그대로 활용하고, 세부 비교가 필요할 때 [[무료 React 디자인 시스템 비교]]를 확인한다.

## 라우팅 우선순위

아래 순서는 바꾸지 않는다.

1. **기존 시스템 유지** — 이미 쓰는 디자인 시스템이 있으면 명시적 마이그레이션 요청 없이 새 시스템을 추가하지 않는다.
2. **하드 조건 검사** — React·Tailwind·Panda 버전, CSS 런타임, 소스 소유 방식으로 불가능한 후보를 제외한다.
3. **제품 유형 매칭** — AI 채팅, 업무 앱, 자체 디자인 시스템 등 핵심 화면을 기준으로 선택한다.
4. **주 시스템 하나 선택** — 완성형 디자인 시스템 두 개를 동시에 채택하지 않는다.
5. **제공 디자인 우선** — 공식 컴포넌트·기본 테마·variant·패턴·예제를 먼저 사용한다.
6. **무료 범위 확인** — 실제 설치 버전의 `LICENSE`와 유료 부가 상품 경계를 확인한다.

## Step 0 — 기존 시스템 감지

`package.json`과 설정 파일을 먼저 본다.

| 감지 신호 | 유지할 시스템 | 읽을 문서 |
|---|---|---|
| `@astryxdesign/core` | Astryx | [[Astryx 디자인 시스템]] |
| `@chakra-ui/react` | Chakra UI | [[Chakra UI 디자인 시스템]] |
| `@heroui/react` | HeroUI | [[HeroUI 디자인 시스템]] |
| `components.json` + `components/ui` | shadcn/ui 가능성 확인 | [[shadcn-ui 디자인 시스템]] |
| `@mantine/core` | Mantine | [[Mantine 디자인 시스템]] |
| `panda.config.*` + `@ark-ui/*` + Park UI recipe | Park UI | [[Park UI 디자인 시스템]] |
| `antd` 또는 `@ant-design/x` | Ant Design / X | [[Ant Design X 디자인 시스템]] |
| `@seed-design/react` 또는 `seed-design.json` | SEED (당근) | [[SEED 디자인 시스템]] |

> [!WARNING] 둘 이상 감지될 때
> 새 시스템을 더하지 않는다. 기존 사용 범위와 중복 원인을 먼저 조사하고, 하나를 주 시스템으로 지정하거나 마이그레이션 계획을 만든다.

## Step 1 — 하드 제외 조건

| 조건 | 제외·우선 규칙 |
|---|---|
| React가 아님 | 이 목록에서는 Solid를 지원하는 Park UI만 후보. 그 외 프레임워크는 별도 조사 |
| React 19 미만 또는 Tailwind v4 미도입 | HeroUI v3 제외 |
| 런타임 CSS-in-JS 금지 | 현재 Emotion을 쓰는 Chakra UI 제외. Ant Design/X도 zero-runtime 구성을 검증하지 못하면 제외 |
| 컴포넌트 소스를 프로젝트에 복사하면 안 됨 | shadcn/ui, Park UI 제외 |
| 컴포넌트 소스를 직접 소유·수정해야 함 | shadcn/ui 또는 Park UI 우선 |
| Panda CSS를 도입할 수 없음 | Park UI 제외 |
| 장기 안정성이 최우선 | v0.1.x인 Astryx는 실험·파일럿 외에는 주의 |
| 모바일 우선 AI 앱 | 데스크톱 중심인 Ant Design X는 별도 모바일 검증 전까지 주의 |
| 무료만 허용 | Chakra UI Pro, HeroUI Pro, 미검증 서드파티 Registry·Figma 자산 제외 |

## Step 2 — 제품 유형 라우팅

| 만들려는 것 | 1순위 | 대안 | 선택 이유 |
|---|---|---|---|
| AI 챗·에이전트 제품 전체 UI | [[Ant Design X 디자인 시스템]] | [[Astryx 디자인 시스템]] | 대화·입력·사고 단계·출처·파일·streaming Markdown·SDK가 한 생태계에 있음 |
| Tailwind 기반 AI 채팅, 소스 직접 소유 | [[shadcn-ui 디자인 시스템]] | Astryx | Bubble·Message·Attachment를 코드로 가져와 깊게 수정 가능 |
| 범용 SaaS·대시보드, 공식 MCP 중요 | [[Chakra UI 디자인 시스템]] | HeroUI | 넓은 관리형 컴포넌트 + semantic token + CLI + MCP + Agent Skills |
| React 19 + Tailwind v4, 접근성과 기본 완성도 중요 | [[HeroUI 디자인 시스템]] | Chakra UI | React Aria 동작, CSS 변수 테마, MCP·Skills, 관리형 업데이트 |
| 폼·날짜·오버레이가 많은 업무 앱·어드민 | [[Mantine 디자인 시스템]] | Chakra UI | 120+ 컴포넌트, 70+ 훅, Form·Dates·Notifications·Modals 생태계 |
| Tailwind 프로젝트의 자체 컴포넌트 체계 | [[shadcn-ui 디자인 시스템]] | Park UI | 레지스트리로 실제 소스를 배포하고 팀이 코드 전체를 소유 |
| Panda CSS 기반 자체 디자인 시스템 | [[Park UI 디자인 시스템]] | shadcn/ui | Ark UI 동작 + Panda token·recipe, React·Solid 공통 시각 체계 |
| 교체 가능한 테마와 Chat 스위트를 빠르게 시험 | [[Astryx 디자인 시스템]] | Ant Design X | 7개 공식 테마, 149개 컴포넌트, Chat 스위트, CLI·MCP |
| 기존 Ant Design 업무 앱에 AI 기능 추가 | [[Ant Design X 디자인 시스템]] | 없음 | `XProvider`가 `ConfigProvider`를 확장해 기존 token과 UI를 유지 |
| 모바일 웹뷰·하이브리드 앱, 네이티브 감각 내비게이션 | [[SEED 디자인 시스템]] | shadcn/ui | BottomSheet·PullToRefresh 등 모바일 1급 컴포넌트 + Stackflow 공식 연동 + 한국어 UX 라이팅 가이드 |

## 시스템별 언제 쓰나

| 시스템 | 쓰기 좋은 때 | 피하거나 재검토할 때 |
|---|---|---|
| [[Astryx 디자인 시스템\|Astryx]] | 새 AI 에이전트 UI를 빠르게 만들고 여러 공식 테마를 시험할 때 | v0.1.x 변경 위험을 감당할 수 없거나 장기 안정성이 최우선일 때 |
| [[Chakra UI 디자인 시스템\|Chakra UI]] | 범용 React 앱, semantic token, 공식 MCP·Agent Skills가 필요할 때 | 전용 Chat 스위트가 필요하거나 런타임 Emotion을 허용하지 않을 때 |
| [[HeroUI 디자인 시스템\|HeroUI]] | React 19·Tailwind v4에서 접근성 높은 관리형 UI가 필요할 때 | React 18·Tailwind v3를 유지하거나 Pro 전용 고급 블록이 필수일 때 |
| [[shadcn-ui 디자인 시스템\|shadcn/ui]] | 브랜드에 맞춰 구조까지 수정하고 AI가 실제 소스를 읽게 할 때 | 중앙 패키지 업데이트를 자동으로 받고 싶거나 Registry 라이선스를 검토할 수 없을 때 |
| [[Mantine 디자인 시스템\|Mantine]] | 복잡한 SaaS, 폼, 날짜, 데이터 입력을 가장 빨리 완성할 때 | 전용 AI 채팅 UI나 컴포넌트 소스 전체 소유가 핵심일 때 |
| [[Park UI 디자인 시스템\|Park UI]] | Panda CSS로 팀 전용 시스템을 만들고 React·Solid에 공유할 때 | Panda 도입이 어렵거나 공식 MCP, 완성된 DatePicker·ColorPicker가 즉시 필요할 때 |
| [[Ant Design X 디자인 시스템\|Ant Design X]] | AI 대화·도구 결과·출처·사고 단계·동적 Agent UI를 완성형으로 만들 때 | 작은 마케팅 사이트, 모바일 우선 앱, 강한 Ant 스타일을 피해야 할 때 |
| [[SEED 디자인 시스템\|SEED]] | 모바일 웹뷰·하이브리드 앱, Stackflow 내비게이션, 한국어 라이팅 기준이 필요할 때 | 데스크톱 대시보드·폼 헤비 업무 앱(DatePicker·Table 부재)이거나 당근 시각 언어를 피해야 할 때 |

## 동률일 때 결정 규칙

| 비교 | 선택 |
|---|---|
| Chakra UI vs HeroUI | Tailwind v4·React Aria 선호면 HeroUI, 스타일 props·recipe·성숙한 MCP 흐름이면 Chakra UI |
| Chakra UI vs Mantine | 기능 폭·폼·날짜가 우선이면 Mantine, 토큰 엄격성·recipe·에이전트 리팩터링이면 Chakra UI |
| shadcn/ui vs Park UI | Tailwind·Registry 생태계면 shadcn/ui, Panda의 타입 안전 token·recipe면 Park UI |
| Astryx vs Ant Design X | 테마 교체·범용 컴포넌트·Meta 계열 감각이면 Astryx, AI 대화 기능 완결성과 안정된 Ant 생태계면 Ant Design X |
| HeroUI vs shadcn/ui | 관리형 업데이트면 HeroUI, 코드 소유와 구조 변경 자유면 shadcn/ui |
| SEED vs shadcn/ui | 모바일 웹뷰·Stackflow·완성된 모바일 컴포넌트면 SEED, 데스크톱 겸용·Tailwind Registry 생태계면 shadcn/ui |

## 조합 규칙

- **허용:** `antd` + `@ant-design/x` — 공식적으로 같은 시스템이다.
- **조건부:** Chakra UI·HeroUI·Mantine에 Chat 전용 headless 프리미티브만 추가 — token과 reset 충돌을 검증한다.
- **주의:** shadcn/ui·Park UI 소스를 다른 전체 스타일 시스템과 섞기 — 주 token 소스를 하나로 정하고 컴포넌트별로 이관한다.
- **금지 기본값:** 페이지마다 다른 완성형 디자인 시스템 사용 — reset, portal, focus, theme, bundle이 충돌한다.

## 에이전트 실행 계약

디자인 또는 프론트엔드 에이전트는 다음 순서로 실행한다.

1. `package.json`, 전역 CSS, UI 설정 파일을 확인한다.
2. Step 0과 Step 1로 후보를 줄인다.
3. Step 2에서 **주 시스템 하나**를 선택한다.
4. 선택한 시스템 문서와 [[디자인 시스템]] 일반 원칙을 읽는다.
5. 공식 예시와 기본 테마를 출발점으로 삼고, 제공되는 컴포넌트·variant·패턴으로 화면을 조합한다.
6. 임의 CSS로 외형을 다시 만들거나 별도 미감 체계를 덧씌우지 않는다. 명시적인 브랜드 요구가 있을 때만 공식 token·theme API 안에서 최소 변경한다.
7. 아래 선언을 설계·구현 산출물에 남긴다.

```text
[DESIGN-SYSTEM ROUTE]
선택: {시스템}
근거: {기존 스택 / 제품 유형 / 핵심 요구}
제외: {후보: 제외 이유}
기본 디자인: {공식 theme / 사용한 component·variant·pattern}
무료 범위: {라이선스와 제외한 Pro·서드파티 항목}
참조: {선택한 시스템 문서}
```

## 파일 지도

| 파일 | 역할 |
|---|---|
| [[디자인 시스템]] | token → component → pattern 일반 원칙 |
| [[무료 React 디자인 시스템 비교]] | 버전·배포 방식·기능·라이선스 상세 비교 |
| [[Astryx 디자인 시스템]] | Astryx 설치·테마·Chat·CLI·MCP |
| [[Chakra UI 디자인 시스템]] | Chakra UI 컴포넌트·token·MCP·Skills |
| [[HeroUI 디자인 시스템]] | HeroUI 접근성·Tailwind·MCP·라이선스 주의 |
| [[shadcn-ui 디자인 시스템]] | 오픈 코드·Registry·AI 채팅 프리미티브 |
| [[Mantine 디자인 시스템]] | 대형 컴포넌트·훅·폼·확장·MCP |
| [[Park UI 디자인 시스템]] | Ark UI·Panda CSS·오픈 코드 구조 |
| [[Ant Design X 디자인 시스템]] | AI 대화·SDK·Markdown·A2UI·Skills |
| [[SEED 디자인 시스템]] | 당근 SEED — 모바일 우선·Stackflow·MCP·Skill·llms.txt |

## 유지보수

- 새 프로젝트 도입 직전 npm 최신 버전과 실제 tarball `LICENSE`를 다시 확인한다.
- 유료 범위, React·Node 요구사항, experimental·WIP 표시는 분기마다 재검토한다.
- 시스템을 추가할 때 Step 0·1, 제품 유형, 동률 규칙, 파일 지도를 함께 갱신한다.

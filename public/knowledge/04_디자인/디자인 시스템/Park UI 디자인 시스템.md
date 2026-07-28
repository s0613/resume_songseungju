---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-12
tags:
  - design-system
  - ui-library
  - react
  - panda-css
  - open-source
  - ai-ready
---

# Park UI 디자인 시스템

> 한 줄 정의
> Ark UI의 접근성 동작과 Panda CSS의 token·recipe를 결합해, 완성된 컴포넌트 소스를 프로젝트에 설치하는 React·Solid용 오픈 코드 디자인 시스템. 문서: https://park-ui.com

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 기준 `@park-ui/cli` 1.0.1과 공식 저장소는 **MIT**. 핵심 의존성 `@ark-ui/react`와 `@pandacss/dev`도 npm 기준 MIT이며, 기본 아이콘 `lucide-react`는 ISC다. 모두 상업적 무료 사용이 가능한 오픈소스 라이선스다.

## 예시 화면

![[preview-park-ui.png]]

> 공식 홈페이지의 회원가입·결제·알림·상품 컴포넌트 조합 예시. 2026-07-12 캡처. 출처: https://park-ui.com

## Astryx와 닮은 점

- token·컴포넌트·패턴을 갖춘 완성된 시스템
- CLI로 초기 테마와 필요한 컴포넌트를 설치
- light/dark 색상, 의미 token, 일관된 size·variant
- AI가 컴포넌트 소스와 recipe를 직접 읽고 수정할 수 있는 구조
- React뿐 아니라 Solid 구현도 동일한 시각 체계로 제공

차이는 NPM 컴포넌트를 임포트하는 Astryx와 달리 Park UI가 shadcn/ui처럼 **소스를 프로젝트에 복사**하며, Panda CSS 설정이 필수라는 점이다.

## 설치

먼저 Panda CSS 프로젝트가 준비되어 있어야 한다.

```bash
npm install @ark-ui/react lucide-react
npx @park-ui/cli init
npx @park-ui/cli add button
npx panda codegen
```

```tsx
import { Button } from '@/components/ui';

export function SaveButton() {
  return <Button>Save</Button>;
}
```

## 구조

| 층 | 역할 |
|---|---|
| Ark UI | headless 상태 머신, 키보드·포커스·ARIA 동작 |
| Panda CSS | build-time CSS, token, semantic token, recipe |
| Park UI | 기본 시각 언어, 컴포넌트 recipe, CLI 배포 |
| 프로젝트 코드 | 설치된 컴포넌트와 recipe를 팀이 직접 소유 |

## 컴포넌트 범위

Button·Card·Table 같은 기본 요소부터 Combobox, FileUpload, NumberInput, RatingGroup, TagsInput, Dialog, Drawer, Menu, Popover, Carousel, Splitter, Toast까지 제공한다.

> [!WARNING] WIP 확인
> 2026-07-12 공식 컴포넌트 목록에서 Color Picker와 Date Picker는 WIP로 표시된다. 이 둘이 핵심이면 Mantine·Chakra·HeroUI를 함께 비교한다.

## 테마 규칙

Park UI는 컴포넌트 간 정렬을 강하게 표준화한다.

- 기본 size: `xs` 32px, `sm` 36px, `md` 40px, `lg` 44px, `xl` 48px, `2xl` 64px
- 공통 variant: `solid`, `subtle`, `surface`, `outline`, `plain`
- 색: Radix Colors의 색상별 light 12단계 + dark 12단계
- 조합: accent 한 색 + gray 한 계열을 선택
- radius: 중첩 가능한 `l1`, `l2`, `l3` semantic radius
- shadow: light/dark에 적응하는 `xs`~`2xl`

이 규칙 덕분에 같은 size의 Button과 Input 높이가 정확히 맞고, 컴포넌트를 섞어도 variant 의미가 유지된다.

## AI 연동

공식 문서는 다음을 AI-ready의 근거로 든다.

- 모든 컴포넌트 구현과 recipe가 프로젝트 코드에 노출됨
- Ark UI 기반의 일관된 합성 API
- React와 Solid 사이에서도 예측 가능한 구조
- LLM이 읽고 새 컴포넌트를 같은 시스템에 맞춰 생성 가능

검토 시점 공식 문서에서는 Astryx·Chakra·HeroUI 같은 **전용 MCP 서버 설정은 확인하지 못했다**. AI 도구 통합 깊이보다 오픈 코드와 타입 안전한 recipe가 핵심이다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| Panda CSS로 자체 디자인 시스템 구축 | 매우 적합 |
| 컴포넌트 동작과 스타일 소스를 직접 소유 | 매우 적합 |
| React와 Solid에 같은 시각 언어 적용 | 적합 |
| 설치 즉시 NPM 컴포넌트만 임포트하고 싶음 | 부적합 — 초기 Panda 설정·codegen 필요 |
| upstream 업데이트를 자동으로 받고 싶음 | 주의 — 로컬 수정과 새 버전을 직접 병합 |
| 전용 AI 채팅 UI 또는 공식 MCP 필요 | 부적합 — [[Ant Design X 디자인 시스템]], Chakra, HeroUI 우선 검토 |

## 공식 출처

- 소개·AI-ready: https://park-ui.com/docs/introduction
- 설치: https://park-ui.com/docs/installation
- 테마·size·variant·색: https://park-ui.com/docs/theming
- 컴포넌트 목록: https://park-ui.com/docs/introduction
- 라이선스: https://github.com/chakra-ui/park-ui/blob/main/LICENSE

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[shadcn-ui 디자인 시스템]]
- [[디자인 시스템]]

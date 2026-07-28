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

# shadcn/ui 디자인 시스템

> 한 줄 정의
> NPM 컴포넌트를 감추는 대신 실제 컴포넌트 소스를 프로젝트에 설치하는 오픈 코드 디자인 시스템·레지스트리 플랫폼. CLI, MCP, Skills, llms.txt와 AI 채팅 프리미티브까지 제공한다. 문서: https://ui.shadcn.com

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-12 기준 공식 저장소와 `shadcn` CLI 4.13.0은 **MIT**. 공식 기본 레지스트리 코드는 개인·상업 프로젝트에서 무료로 사용할 수 있다.

> [!WARNING] 레지스트리별 라이선스
> shadcn 호환 레지스트리라고 해서 모두 MIT는 아니다. 공식 기본 레지스트리가 아닌 커뮤니티·사설 레지스트리 항목은 설치 전에 해당 항목의 라이선스를 별도로 확인한다.

## 예시 화면

![[preview-shadcn-ui.png]]

> 공식 Dashboard 예제의 사이드바·지표·차트·테이블 조합. 2026-07-12 캡처. 출처: https://ui.shadcn.com/examples/dashboard

## Astryx와 닮은 점

- 토큰·컴포넌트·패턴을 일관된 API로 배포
- CLI로 필요한 컴포넌트만 설치
- 공식 MCP가 레지스트리를 탐색·검색하고 자연어로 컴포넌트를 설치
- Skills와 llms.txt를 포함한 AI 친화 문서
- 현재 공식 목록에 `Attachment`, `Bubble`, `Message`, `MessageScroller`, `Marker` 등 AI 대화 UI가 포함됨

가장 큰 차이는 [[Astryx 디자인 시스템|Astryx]]가 버전 관리되는 NPM 라이브러리인 반면, shadcn/ui는 **설치 시 소스가 프로젝트 코드가 된다**는 점이다.

## 설치

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog input
```

AI 대화 화면에서는 필요한 항목을 골라 추가한다.

```bash
npx shadcn@latest add attachment bubble message message-scroller
```

설치된 파일은 보통 프로젝트의 `components/ui` 아래에 생기며 이후부터 팀이 직접 소유·수정한다.

## 설계 원칙

| 원칙 | 의미 |
|---|---|
| Open Code | 최상위 컴포넌트 구현을 직접 읽고 수정 |
| Composition | 공통 합성 API로 새 컴포넌트도 예측 가능하게 구성 |
| Distribution | JSON schema + CLI + Registry로 코드 배포 |
| Beautiful Defaults | 설치 즉시 쓸 수 있는 기본 스타일 |
| AI Ready | LLM이 라이브러리 내부가 아니라 실제 프로젝트 소스를 읽음 |

전통적인 라이브러리의 업데이트 편의 대신 소스 통제권과 깊은 커스텀 가능성을 얻는 구조다.

## 컴포넌트 범위

| 그룹 | 예 |
|---|---|
| 범용 | Button, Dialog, Drawer, Form Field, Select, Tabs, Table, Sidebar |
| 데이터 | Chart, DataTable, Calendar, DatePicker, Pagination, Resizable |
| 탐색·명령 | Command, Menubar, NavigationMenu, ContextMenu |
| AI 대화 | Attachment, Bubble, Marker, Message, MessageScroller |
| 배포 단위 | Component, Block, Template, Rule, Hook, 설정 파일 |

공식 디렉터리의 서드파티 컴포넌트는 기능 보강에 유용하지만 품질과 라이선스가 균일하지 않다.

## 테마와 토큰

CSS 변수를 기본으로 권장하며 `components.json`의 `cssVariables`가 기본 활성화된다.

```css
:root {
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.205 0 0);
  --primary: oklch(0.35 0.09 165);
  --primary-foreground: oklch(0.985 0 0);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

`background/foreground`, `card/card-foreground`, `primary/primary-foreground`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, chart·sidebar 토큰처럼 의미 역할을 기준으로 구성된다.

## AI 연동

### MCP 자동 설정

```bash
npx shadcn@latest mcp init --client claude
```

수동 설정은 다음과 같다.

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

MCP는 공식·서드파티·사설 레지스트리를 함께 검색하고 항목을 프로젝트에 설치할 수 있다. 레지스트리는 `components.json`에 namespace로 등록한다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| 브랜드에 맞춰 컴포넌트 구조까지 바꿔야 함 | 매우 적합 — 소스를 직접 소유 |
| AI가 기존 컴포넌트를 읽고 확장해야 함 | 매우 적합 — 프로젝트 코드로 노출 |
| 가벼운 AI 채팅 UI | 적합 — 기본 대화 프리미티브 제공 |
| 라이브러리 업그레이드를 한 줄로 끝내고 싶음 | 주의 — 로컬 수정과 upstream 변경을 직접 병합 |
| 여러 프로젝트의 UI를 중앙 패키지로 엄격히 통제 | 보완 필요 — 사내 Registry·검증 파이프라인 설계가 필요 |
| 서드파티 항목을 무검토로 설치 | 부적합 — 코드·접근성·라이선스 감사 필요 |

## 공식 출처

- 소개: https://ui.shadcn.com/docs
- 컴포넌트: https://ui.shadcn.com/docs/components
- 테마: https://ui.shadcn.com/docs/theming
- Registry: https://ui.shadcn.com/docs/registry
- MCP: https://ui.shadcn.com/docs/mcp
- 라이선스: https://github.com/shadcn-ui/ui/blob/main/LICENSE.md

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[Astryx 디자인 시스템]]
- [[Park UI 디자인 시스템]]
- [[디자인 시스템]]

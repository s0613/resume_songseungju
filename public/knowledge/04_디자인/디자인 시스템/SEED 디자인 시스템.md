---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-27
tags:
  - design-system
  - ui-library
  - react
  - mobile-first
  - open-source
  - ai-ready
  - mcp
---

# SEED 디자인 시스템

> 한 줄 정의
> 당근(당근마켓)의 통합 디자인 언어. 디자인 토큰·컴포넌트 스펙·모션까지 하나의 소스로 정리하고, React는 CLI 스니펫으로 소스를 프로젝트에 설치하는 모바일 우선 오픈소스 디자인 시스템. 문서: https://seed-design.io

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마(light/dark), 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 공식 token·theming API 안에서 최소 변경한다.

> [!SUCCESS] 무료 사용 확인
> 2026-07-27 기준 공식 문서가 **Apache-2.0** 라이선스를 명시한다 — 상업적 사용·수정·배포 자유. 단 저작권 고지·라이선스 사본 포함, 변경 사항 명시가 조건이며, **당근 로고·브랜드 자산은 별도 가이드라인** 대상이고 당근 사칭 용도는 금지다.

## 핵심 성격 — 무엇이 다른가

- **모바일 우선**: BottomSheet·PullToRefresh·Snackbar·SwipeableMenuSheet·FloatingActionButton 등 모바일 웹뷰·하이브리드 앱에 필요한 컴포넌트가 1급 시민이다.
- **Stackflow 연동**: 당근이 만든 스택 내비게이션 라이브러리 [Stackflow](https://stackflow.so)와 공식 통합(AppScreen·BottomSheet·AlertDialog) — 웹뷰에서 네이티브 앱 같은 화면 전환을 만든다.
- **스니펫 배포**: shadcn/ui처럼 CLI(`@seed-design/cli`)가 컴포넌트 **소스를 `seed-design/` 폴더에 복사**한다. 코어 패키지(`@seed-design/react`, `@seed-design/css`)는 npm으로 받고, 화면 컴포넌트는 소스를 소유·수정한다.
- **디자인 스펙과 코드 분리 문서화**: Components 섹션은 디자인 스펙(Anatomy·Properties·Guidelines), React 섹션은 코드 API — 디자이너·개발자가 같은 정본을 본다.
- **당근 도메인 컴포넌트 포함**: MannerTemp(매너온도) 같은 당근 고유 컴포넌트도 있다 — 범용 프로젝트에서는 무시하면 된다.

## 설치 (Vite 기준)

```bash
npm install @seed-design/react @seed-design/css
npx @seed-design/cli@latest init        # seed-design.json 생성
npm install -D @seed-design/vite-plugin  # vite.config에 seedDesignPlugin() 추가
npx @seed-design/cli@latest add ui:action-button
```

```ts
// index.tsx
import "@seed-design/css/base.css";
```

- `tsconfig`에 `"seed-design/*": ["./seed-design/*"]` paths 별칭 필요.
- Rsbuild·Webpack·수동 설치 가이드 별도 제공. Tailwind CSS 병용·Cascade Layers(실험) 문서 있음.
- CLI 명령: `init` / `add` / `add-all` / `compat` / `docs` / `upgrade`.

## 컴포넌트 범위

ActionButton·Checkbox·RadioGroup·Switch·TextField·SelectBox·Slider 같은 기본 입력, Tabs·ChipTabs·SegmentedControl·Menu, AlertDialog·BottomSheet·Snackbar·Callout·HelpBubble 피드백, Avatar·Badge·Skeleton·ImageFrame 표시, Box·Flex·Grid·HStack·VStack 레이아웃까지 제공. Blocks(Footer·Layout·SideNavigation)도 있다.

> [!WARNING] Deprecated 주의
> 문서 목록에 ActionSheet·FAB·Stack·Inline·ErrorState 등 **(Deprecated) 표기가 많다**. 컴포넌트 선택 전 React llms.txt에서 deprecated 여부를 확인하고 대체 컴포넌트(예: ActionSheet→ExtendedActionSheet도 deprecated, MenuSheet→SwipeableMenuSheet)를 쓴다. SEED React 2로 올라가며 세대 교체가 진행 중이다.

## AI 연동 — 이 문서의 핵심 활용법

### 1. 공식 MCP 서버 (권장)

```bash
claude mcp add seed-docs -- npx -y @seed-design/docs-mcp
```

AI가 React 컴포넌트 API·디자인 가이드라인·토큰(Rootage 원본 데이터)·아이콘 검색에 직접 접근한다. Figma 연결 없이 독립 실행. 별도로 **Figma MCP**(디자인 파일 연동)도 제공.

### 2. Agent Skill

```bash
npx skills add https://github.com/daangn/seed-design --skill seed-design
```

프로젝트 상태(seed-design.json·번들러·패키지 매니저) 자동 감지 후 셋업→컴포넌트→토큰→업그레이드까지 분기 안내하는 공식 스킬.

### 3. llms.txt (URL만 컨텍스트에 투입)

| 섹션 | 진입점 | 전체 문서 |
|------|--------|-----------|
| Get Started | https://seed-design.io/get-started/llms.txt | - |
| Foundations (토큰·색·타이포) | https://seed-design.io/foundations/llms.txt | - |
| Components (디자인 스펙) | https://seed-design.io/components/llms.txt | - |
| Patterns | https://seed-design.io/patterns/llms.txt | - |
| **React Library (코드 구현용)** | https://seed-design.io/react/llms.txt | https://seed-design.io/react/llms-full.txt |
| Breeze Utilities | https://seed-design.io/breeze/llms.txt | https://seed-design.io/breeze/llms-full.txt |
| Lynx | https://seed-design.io/lynx/llms.txt | https://seed-design.io/lynx/llms-full.txt |
| AI Integration | https://seed-design.io/ai-integration/llms.txt | https://seed-design.io/ai-integration/llms-full.txt |
| Changelog | https://seed-design.io/llms/react/updates/changelog.txt | - |

사용 규칙: 구현 작업이면 **React llms.txt를 먼저 읽히고** 필요한 컴포넌트 `.txt`만 따라가게 한다. llms-full.txt는 크므로 전체 마이그레이션·감사 때만.

## Foundations 요약

색상(역할 기반 Role + Palette)·디자인 토큰(전체 Reference 제공)·타이포그래피·Spacing·Radius·Elevation·Gradient(AI 기능 표현용 포함)·Motion·State·아이콘 라이브러리, 그리고 Inclusive/International Design과 한국어 Voice & Tone·Writing 가이드까지 포함 — **UX 라이팅 가이드가 딸린 흔치 않은 시스템**이다 → [[UX 라이팅 원리]]와 비교해 읽기 좋다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|---|---|
| 모바일 웹뷰·하이브리드 앱 (Stackflow 내비게이션) | 매우 적합 |
| 한국형 로컬 서비스·커뮤니티 감성 + 한국어 UX 라이팅 기준 필요 | 매우 적합 |
| 컴포넌트 소스를 직접 소유·수정 (shadcn식) | 적합 |
| AI 도구 연동 (공식 MCP + Skill + llms.txt 삼중 제공) | 적합 |
| 데스크톱 중심 대시보드·폼 헤비 업무 앱 | 부적합 — DatePicker·Table 등 부재, [[Mantine 디자인 시스템]] 우선 |
| AI 채팅 전용 UI | 부적합 — [[Ant Design X 디자인 시스템]] 우선 |
| 중앙 패키지 자동 업데이트 선호 | 주의 — 스니펫 소스는 `compat`·`upgrade` CLI로 직접 관리 |
| 당근과 무관한 강한 자체 브랜드 | 주의 — 당근 시각 언어가 기본값, 브랜드 자산 가이드라인 별도 |

## 공식 출처

- 시작·라이선스: https://seed-design.io/get-started
- React 설치(Vite): https://seed-design.io/react/getting-started/installation/vite
- Docs MCP: https://seed-design.io/ai-integration/docs-mcp
- Agent Skill: https://seed-design.io/ai-integration/skill
- GitHub: https://github.com/daangn/seed-design

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]]
- [[shadcn-ui 디자인 시스템]] — 같은 스니펫 배포 방식
- [[디자인 시스템]]
- [[UX 라이팅 원리]]

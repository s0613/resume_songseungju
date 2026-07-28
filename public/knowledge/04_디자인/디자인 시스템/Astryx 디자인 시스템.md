---
type: knowledge
domain: design
status: active
last-reviewed: 2026-07-12
tags:
  - design-system
  - ui-library
  - meta
  - react
---

# Astryx 디자인 시스템

> 한 줄 정의
> Meta의 오픈소스 React 디자인 시스템 — 토큰 기반 테마 + 149개 컴포넌트 + AI 코딩 도구 연동(CLI·MCP)이 내장된 실전 UI 킷. 문서: https://astryx.atmeta.com

> [!IMPORTANT] 제공 디자인 우선
> 공식 컴포넌트, 기본 테마, 공식 variant·패턴·예제를 그대로 출발점으로 사용한다. 다른 미감 체계를 덧씌우거나 임의 CSS로 외형을 다시 만들지 않는다. 브랜드 조정이 명시적으로 필요할 때만 이 시스템의 공식 token·theme API 안에서 최소 변경한다.

> [!SUCCESS] 로컬 설치 완료 (2026-07-07)
> `~/astryx-playground/`에 v0.1.3 설치됨. **주의: Node ≥22.13 필요** — nvm 기본(22.12.0)으로는 CLI가 거부하므로 Homebrew Node 24 사용:
> ```bash
> cd ~/astryx-playground
> PATH="/opt/homebrew/bin:$PATH" node_modules/.bin/astryx component
> ```
> 에이전트 문서는 `~/astryx-playground/.claude/CLAUDE.md`에 생성돼 있음.

## 예시 화면

![[preview-astryx.png]]

> 공식 홈페이지의 Matcha 테마·컴포넌트 조합 예시. 2026-07-12 캡처. 출처: https://astryx.atmeta.com

## 무엇인가

- [[디자인 시스템]]의 3층(토큰 → 컴포넌트 → 패턴)을 모두 제공하는 완성형 시스템
- React 컴포넌트 **149개** (`@astryxdesign/core`) + 교체 가능한 테마 패키지
- Next.js·Vite 지원, 스타일링은 일반 CSS·Tailwind·StyleX·CSS-in-JS 모두 호환
- 차별점: **AI 시대 설계** — CLI가 에이전트용 문서를 뽑아주고 MCP 서버까지 제공

## 설치

```bash
npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
npx astryx init                                # 설정 마법사
npx astryx init --features agents --agent claude   # + CLAUDE.md 생성
```

전역 CSS에 임포트:

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

## 기본 사용

컴포넌트는 카테고리별 서브경로에서 임포트한다:

```tsx
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/Layout';

export default function Page() {
  return (
    <VStack gap={2}>
      <Button label="Hello Astryx" onClick={() => alert('Hi!')} />
    </VStack>
  );
}
```

## 컴포넌트 인벤토리 (149개, 주요 그룹)

| 그룹 | 구성 |
|------|------|
| 레이아웃·셸 | AppShell, VStack/Layout, AspectRatio, Toolbar |
| 액션 | Button, IconButton, ToggleButton(+Group), ButtonGroup |
| 입력 | TextInput, TextArea, TimeInput, Slider, Switch, Selector/MultiSelector, Typeahead, Tokenizer, Calendar |
| 표시 | Avatar(+Group·StatusDot), Badge, Banner, Card(+Clickable·Selectable), Table, Tabs, TreeList, Breadcrumbs, Carousel, Thumbnail, Timestamp, Blockquote |
| 피드백 | Toast, Spinner, Skeleton, Tooltip, StatusDot |
| **Chat 스위트** | ChatLayout, ChatComposer(+Input·Drawer), ChatMessage(+List·Bubble·Metadata), ChatToolCalls, ChatDictationButton 등 — AI 챗 UI 풀세트 |
| 유틸리티 | Theme, MediaTheme, LinkProvider, VisuallyHidden |

> [!TIP] Chat 스위트
> AI 채팅 인터페이스(메시지 리스트·컴포저·툴콜 표시·딕테이션)가 1급 컴포넌트로 들어있다. 에이전트 프론트엔드를 만들 때 처음부터 안 만들어도 된다.

## 테마 시스템

7개 공식 테마: `neutral` · `butter` · `chocolate` · `gothic` · `matcha` · `stone` · `y2k`

커스텀 테마는 `defineTheme`으로 선언하고, 기존 테마는 `extends`로 확장:

```tsx
const myTheme = defineTheme({
  name: 'my-theme',
  color: { accent: '#7B61FF', neutralStyle: 'cool' },
  typography: { scale: { base: 14, ratio: 1.2 } },
  radius: { base: 4, multiplier: 1 },
  components: { button: { 'variant:primary': { color: 'white' } } },
});
```

- 토큰 카테고리: `--color-*`, `--text-*`, `--font-family-*`, `--spacing-*`, `--radius-*`, `--duration-*`
- **다크모드**: 토큰 값을 `[라이트, 다크]` 배열로 주면 자동 전환. `<Theme mode="system">`이 기본
- 공개 CSS 변수는 덮어써도 되지만 `--_` 접두사(비공개)는 건드리지 않는다
- 컴포넌트 오버라이드는 raw CSS 셀렉터가 아니라 의미 키(`variant:primary` 등)로 한다

인스턴스 단위 미세 조정은 StyleX `xstyle`:

```tsx
const overrides = stylex.create({ save: { alignSelf: 'flex-end', marginTop: 16 } });
<Button label="Save" xstyle={overrides.save} />
```

## CLI — 에이전트 친화 문서 조회

```bash
npx astryx component              # 전체 컴포넌트 색인
npx astryx component Button       # 개별 컴포넌트 props·사용법
npx astryx component Dialog --dense   # 토큰 절약 압축 출력
npx astryx docs                   # 문서 주제 목록
npx astryx docs tokens            # 토큰 레퍼런스
npx astryx template --list        # 페이지 템플릿
```

## AI 연동

| 방식 | 명령/설정 |
|------|-----------|
| Claude Code | `npx astryx init --features agents --agent claude` → `CLAUDE.md` |
| Cursor | `--agent cursor` → `.cursorrules` (또는 `~/.cursor/rules/xds.mdc`) |
| Codex | `--agent codex` → `AGENTS.md` |
| MCP 서버 | `{"mcpServers": {"xds": {"type": "url", "url": "https://astryx.atmeta.com/mcp"}}}` |

생성되는 에이전트 문서에는 컴포넌트 색인 + 동작 규칙(raw div 금지, 토큰 사용 강제) + CLI 참조가 들어간다.

## 언제 쓰나 / 안 쓰나

| 상황 | 판단 |
|------|------|
| AI 챗/에이전트 프론트엔드 | ✅ Chat 스위트가 그대로 해결 |
| 브랜드 개성 없는 내부 도구·어드민 | ✅ 테마만 고르면 즉시 생산성 |
| 강한 브랜드 아이덴티티가 핵심인 랜딩 | ⚠️ 관리형 테마와 완성형 컴포넌트의 커스텀 한계를 먼저 검증 |
| v0.1.x 초기 버전 | ⚠️ breaking change 각오, 프로덕션 장기 의존은 신중히 |

## 관련 문서

- [[DESIGN-SYSTEM-ROUTER|디자인 시스템 라우터]]
- [[무료 React 디자인 시스템 비교]] — Chakra UI·HeroUI·shadcn/ui·Mantine·Park UI·Ant Design X 비교
- [[디자인 시스템]] — 토큰→컴포넌트→패턴 일반론과 승격 조건
- [[UI 시각 체계]] — 시각 토큰 설계 원리

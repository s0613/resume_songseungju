export type Block =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "cardNews"; cards: { num: string; title: string; body: string; tag: string }[] }
    | { type: "harnessRefs"; refs: { name: string; desc: string; tag: string }[] }
    | { type: "cta"; text: string; btnText: string; btnHref: string }

export interface Article {
    slug: string
    num: string
    title: string
    titleBreak?: string
    date: string
    tag: string
    lead: string
    blocks: Block[]
}

export const articles: Article[] = [
    {
        slug: "start-with-harness",
        num: "01",
        title: "1인 개발, 클로드 코드로 시작하나요?",
        titleBreak: "이 하네스로 시작하세요!",
        date: "2026 · June",
        tag: "Getting Started",
        lead: "Claude Code를 켰는데 뭘 시켜야 할지 막막하다면, 수백 시간의 1인 개발 경험이 녹아있는 하네스가 있습니다. 카파시 하네스·gstack·Hermes에서 핵심만 뽑아 1인 개발 현실에 맞게 재조합했습니다. 설치 한 줄로 PM부터 QA까지 팀이 생깁니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "01",
                        title: "설치부터 시작",
                        body: "터미널을 열고 한 줄만 입력하세요. 플러그인이 설치되면 어느 프로젝트에서나 /sj-company로 바로 팀이 생깁니다.",
                        tag: "claude plugin install s0613/S-skills",
                    },
                    {
                        num: "02",
                        title: "태스크를 말로",
                        body: '"로그인 기능 만들어줘" — 이 한 마디면 됩니다. PM이 복잡도를 판단하고, Tech Lead가 필요한 전문가를 자동으로 투입합니다.',
                        tag: "/sj-company 로그인 기능 만들어줘",
                    },
                    {
                        num: "03",
                        title: "병렬 에이전트",
                        body: "Database → Backend + Security 병렬 → Frontend. 혼자 개발하면서도 팀처럼 동시에 여러 역할이 작업합니다.",
                        tag: "4 agents · parallel dispatch",
                    },
                    {
                        num: "04",
                        title: "QA까지 자동",
                        body: "구현이 끝나면 독립 QA가 PM 브리프와 실제 파일만 보고 검증합니다. 구현자 편향 없이, 진짜 버그를 잡아냅니다.",
                        tag: "/sj-qa · independent verification",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "Claude Code를 처음 쓰면 빈 터미널 앞에서 멈추게 됩니다. \"어디서부터 시작하지?\", \"이걸 어떻게 나눠야 하지?\". 하네스는 그 공백을 채워줍니다. 수백 시간의 1인 개발 경험을 바탕으로 만들어진 워크플로우가 첫 번째 Claude Code 팀을 즉시 구성해줍니다.",
            },
            {
                type: "paragraph",
                content: "핵심은 __의도 기반 라우팅__입니다. \"디자인 만들어줘\", \"보안 점검해줘\", \"회고해줘\" — 의도를 입력하면 하네스가 적절한 전문가를 자동으로 투입합니다. 여러분은 제품에만 집중하면 됩니다.",
            },
            { type: "heading", content: "유명 하네스에서 뭘 배웠나" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "Karpathy Harness",
                        desc: "Karpathy가 공개한 Claude Code 워크플로우. 컨텍스트를 최소화하고 작은 단위로 태스크를 쪼개 모델에게 명확한 목표를 주는 것이 핵심입니다. 루프를 짧게, 반복을 빠르게.",
                        tag: "Iteration · Context Control",
                    },
                    {
                        name: "gstack",
                        desc: "멀티에이전트 오케스트레이션의 실전 구현. 에이전트들이 채널로 직접 소통하고 Tech Lead가 병렬 디스패치와 수렴을 조율하는 구조를 그대로 채택했습니다.",
                        tag: "Multi-Agent Orchestration",
                    },
                    {
                        name: "Hermes",
                        desc: "컨텍스트를 절대 자동 삭제하지 않고 archive만 하는 불변식. 과거 결정과 학습을 누적해 다음 사이클에 활용하는 context.md 시스템은 Hermes의 memory curator 철학입니다.",
                        tag: "Memory · Context",
                    },
                ],
            },
            { type: "heading", content: "1인 개발의 현실" },
            {
                type: "paragraph",
                content: "혼자 개발하면 PM도 나, 디자이너도 나, 개발자도 나, QA도 나입니다. 역할 전환마다 컨텍스트가 끊기고, 집중력이 분산됩니다. 하네스는 각 역할을 전문 에이전트가 맡아 그 전환 비용을 없애줍니다. 카파시 하네스의 통찰처럼 — 실력보다 루프 속도가 이깁니다. 기획→설계→구현→검증 루프가 자동화되면 아이디어에서 동작하는 코드까지의 시간이 극적으로 줄어듭니다.",
            },
            {
                type: "paragraph",
                content: "가장 놓치기 쉬운 것이 독립적인 검증입니다. 내가 만든 것을 내가 검증하면 편향이 생깁니다. S-Skills의 QA 에이전트는 구현자 산출물을 참조하지 않습니다. PM 브리프와 실제 파일만 보고 검증합니다. __혼자서도 팀의 품질__을 낼 수 있는 이유입니다.",
            },
            {
                type: "cta",
                text: "__claude plugin install s0613/S-skills__ — 이 한 줄로 PM, 디자이너, 개발자, QA, 보안 전문가가 Claude Code 안에 생깁니다.",
                btnText: "GitHub에서 설치 →",
                btnHref: "https://github.com/s0613/S-skills",
            },
        ],
    },
    {
        slug: "context-is-everything",
        num: "02",
        title: "세션이 끝나도 기억하는 AI 팀",
        titleBreak: "— 컨텍스트 누적의 힘",
        date: "2026 · June",
        tag: "Deep Dive",
        lead: "Claude Code의 가장 큰 약점은 기억력입니다. 세션이 끊기면 지난번 결정도, 거부한 디자인도, 학습한 도메인 지식도 사라집니다. S-Skills 하네스는 이 문제를 구조적으로 해결합니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "PM",
                        title: "pm-context.md",
                        body: "PM이 매 사이클마다 새로 알게 된 요구사항·리스크·도메인 인사이트를 날짜와 함께 누적합니다. 다음 세션에서 PM은 이 파일부터 읽습니다.",
                        tag: "docs/sj-company/pm-context.md",
                    },
                    {
                        num: "디자인",
                        title: "design-context.md",
                        body: "거부된 방향은 design-banned.md에 봉인되고, 승인된 방향은 누적됩니다. 실행할수록 브랜드 정체성이 선명해집니다.",
                        tag: "docs/sj-company/design-context.md",
                    },
                    {
                        num: "개발",
                        title: "dev-context.md",
                        body: "아키텍처 결정, 놓쳤던 엣지케이스, 반복된 버그 패턴이 쌓입니다. 새 에이전트가 투입돼도 프로젝트 히스토리를 즉시 파악합니다.",
                        tag: "docs/sj-company/dev-context.md",
                    },
                    {
                        num: "QA",
                        title: "qa-context.md",
                        body: "이전 사이클에서 놓친 검증 항목이 다음 QA에 자동 반영됩니다. 같은 버그는 두 번 통과하지 못합니다.",
                        tag: "docs/sj-company/qa-context.md",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "대부분의 AI 코딩 도구는 매 세션이 백지에서 시작합니다. 지난번에 왜 그 구조를 선택했는지, 어떤 방향을 거부했는지, 어디서 막혔는지 — 모두 다시 설명해야 합니다. 혼자 개발할수록 이 반복 설명 비용이 쌓입니다.",
            },
            {
                type: "paragraph",
                content: "S-Skills 하네스는 Hermes의 __\"절대 삭제하지 않고 archive만 한다\"__ 불변식을 채택합니다. 각 역할 에이전트(PM·디자인·개발·QA)는 사이클이 끝날 때 새로 배운 인사이트 1~3줄을 자기 context.md에 날짜와 함께 남깁니다. 다음 세션에서 그 파일을 읽는 것이 첫 번째 액션입니다.",
            },
            { type: "heading", content: "PROJECT.md — 프로젝트의 단일 진실" },
            {
                type: "paragraph",
                content: "각 context.md가 역할별 기억이라면, PROJECT.md는 프로젝트 전체의 현재 상태입니다. goal, 지난 세션 요약, 다음 태스크, 블로커가 단 하나의 파일에 담깁니다. /sj-company를 인자 없이 실행하면 이 파일을 읽고 브리핑부터 시작합니다.",
            },
            {
                type: "paragraph",
                content: "200줄이 넘어가는 context.md는 자동으로 큐레이션됩니다. 오래된 항목은 요약 1~3줄로 압축되고, 중복은 통합됩니다. __기억은 무한히 쌓이지 않고, 밀도가 높아집니다.__",
            },
            { type: "heading", content: "실전에서 느끼는 차이" },
            {
                type: "paragraph",
                content: "처음 한두 사이클은 하네스 없이 쓰는 것과 크게 다르지 않습니다. 차이는 열 번째 사이클부터 납니다. PM은 이미 도메인을 알고 있고, 디자인 에이전트는 거부된 방향을 반복하지 않으며, QA는 이전 사이클의 놓친 항목을 기억하고 있습니다. 프로젝트가 오래될수록 팀이 더 정교해집니다.",
            },
            {
                type: "cta",
                text: "세션이 끊겨도 기억하는 AI 팀. __context.md 시스템__은 S-Skills 하네스를 설치하는 순간 자동으로 시작됩니다.",
                btnText: "S-SKILLS 시작하기 →",
                btnHref: "/s-skills",
            },
        ],
    },
    {
        slug: "fable5-broke-my-reviewers",
        num: "04",
        title: "Fable 5 이후 하네스에",
        titleBreak: "생긴 일들 — 이번 주 커밋 전부",
        date: "2026 · June",
        tag: "Harness Update",
        lead: "Fable 5가 나온 주에 S-Skills 하네스는 22개 커밋이 쌓였습니다. 리뷰어 프롬프트가 망가졌다 고쳐졌고, 설계 스킬은 v3.0에서 v3.2까지 올라갔으며, gstack 영감을 받은 5개 스킬이 한꺼번에 추가됐습니다. 모델이 강해진 주에 하네스가 가장 많이 바뀌었습니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "5개",
                        title: "gstack 영감 신규 스킬",
                        body: "sj-spec·sj-investigate·sj-cso·sj-ship·sj-retro. 스펙 정밀화부터 보안 감사, 주간 회고까지 — 개발 사이클 전 구간이 커버됩니다.",
                        tag: "6a359c2 · Jun 8",
                    },
                    {
                        num: "3→2.1",
                        title: "sj-design 전면 재설계",
                        body: "v3.0 DNA 거부 프로토콜 → v3.1 URL 스크린샷 → v3.2 3시안 브라우저 선택까지. 3일에 걸쳐 레퍼런스에서 구현까지 단계적 수렴 파이프라인이 완성됐습니다.",
                        tag: "bb27fdb → 9f5a6a2 → 00662ec",
                    },
                    {
                        num: "7→10",
                        title: "에이전트 설계 축 확장",
                        body: "메모리 계층·평가·자기반성·그래프 토폴로지 3개 축이 추가됐습니다. CLAUDE.md 불일치도 동기화했습니다.",
                        tag: "29355eb · Jun 10",
                    },
                    {
                        num: "3종",
                        title: "리뷰어 프롬프트 긴급 수정",
                        body: "Fable 5가 '무조건 비판적' 지시를 문자 그대로 실행해 억지 결함을 생성. '거짓 비판 금지' 탈출구를 추가해 해결했습니다.",
                        tag: "6b880e6 · Jun 10",
                    },
                ],
            },
            { type: "heading", content: "리뷰어가 거짓말을 시작했다" },
            {
                type: "paragraph",
                content: "기존 프롬프트는 이랬습니다. '무조건 비판적이다. 문제 없이 끝나는 리뷰는 없다.' Opus 4.6까지는 이 지시가 의도대로 동작했습니다. '너무 가볍게 통과시키지 마라'는 의도로 읽었습니다. Fable 5는 달랐습니다. 문제가 없는 코드에서도 반드시 결함을 찾아냈습니다. 정확히는 __만들어냈습니다__. 존재하지 않는 보안 리스크, 이미 처리된 엣지 케이스 재지적, 근거 없는 성능 우려.",
            },
            {
                type: "paragraph",
                content: "수정은 단 두 가지였습니다. '무조건'을 '철저히'로 바꾸고, 탈출구를 열었습니다. __'철저히 탐색한 후에도 실질적 문제가 없으면 트집을 만들지 말고, 중대한 문제 없음과 잔여 리스크를 정직하게 보고한다.'__ 이 한 줄이 억지 비판을 막으면서 엄격함은 유지했습니다. sj-dev-si 스킬도 같은 이유로 다음 커밋에서 동기화했습니다(`3da9b12`).",
            },
            {
                type: "paragraph",
                content: "더 강한 모델에는 더 정밀한 지시가 필요합니다. '의도가 있으니 알아서 해줄 것'이라는 가정이 깨집니다. __모델이 강해질수록 프롬프트의 허점이 더 크게 드러납니다.__ 이전 모델은 허술한 지시를 의도로 메꿨지만, Fable 5는 그 허술함을 그대로 실행합니다.",
            },
            { type: "heading", content: "디자인 스킬: 3일에 v3.0 → v3.2" },
            {
                type: "paragraph",
                content: "같은 주에 sj-design은 세 번 버전이 올랐습니다. v3.0에서 DNA 기반 생성과 거부 프로토콜이 들어왔습니다. 레퍼런스를 보면 컬러·폰트·레이아웃 DNA를 먼저 추출하고, 커밋 선언(hex·font·layout 명시)을 코드 작성 전에 출력해야 합니다. 거부된 방향은 design-banned.md에 영구 봉인되고, __같은 방향을 다시 생성하는 것이 구조적으로 금지__됩니다.",
            },
            {
                type: "paragraph",
                content: "v3.1에서는 URL을 주면 Playwright로 스크린샷을 찍어 DNA를 추출하는 분기가 생겼습니다. v3.2에서는 3개 시안을 모두 브라우저에 열어 사용자가 선택한 뒤에야 구현으로 넘어가는 흐름이 추가됐습니다. 그 사이 시각적 승인 게이트(`6698a4d`)도 붙었습니다. 목업 HTML을 열고 명시적 승인 없이 구현을 시작하는 것이 금지됩니다. sj-dev-frontend도 V-1~V-3 시각적 검증 섹션을 얻어, __스크린샷 확인 없이 '완성'을 선언할 수 없게__ 됐습니다.",
            },
            { type: "heading", content: "gstack에서 온 5개 스킬" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "sj-spec — 모호함 제거",
                        desc: "\"로그인 만들어줘\"처럼 모호한 의도를 why·scope·technical·draft·file 5단계로 정밀 스펙화합니다. 스펙 없이 구현으로 넘어가는 것을 구조적으로 막습니다.",
                        tag: "/sj-spec",
                    },
                    {
                        name: "sj-investigate — 가설 강제 디버깅",
                        desc: "버그를 보자마자 수정하는 것을 금지합니다. 가설 → 검증 순서를 강제하고, 조사 없는 수정은 허용하지 않습니다. 근본 원인을 찾기 전까지 코드를 바꿀 수 없습니다.",
                        tag: "/sj-investigate",
                    },
                    {
                        name: "sj-cso + sj-ship + sj-retro",
                        desc: "sj-cso는 OWASP Top 10 + STRIDE 보안 감사 (8/10 확신 이상만 보고). sj-ship은 테스트·커버리지·PR 릴리즈 자동화. sj-retro는 커밋·테스트·QA 지표를 읽어 Keep/Improve/Try 주간 회고를 작성합니다.",
                        tag: "/sj-cso · /sj-ship · /sj-retro",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "같은 기간 sj-automation이 sj-ui-auto를 흡수해 v2.0이 됐고(`43eb210`), macOS·Linux·Windows를 자동 감지해 launchd·systemd·Task Scheduler로 분기합니다. sj-outsource가 신설돼(`13a1571`) 막혔을 때 전문가에게 위임하고 메일 초안을 자동으로 작성하는 탈출구가 생겼습니다. sj-company 라우팅도 트리거 오탐 6건을 수정하고 design·agent-dev·pw-loop 직접 트리거를 추가했습니다(`18330a4`).",
            },
            {
                type: "paragraph",
                content: "이번 주 커밋 패턴은 명확합니다. Fable 5 출시 → 실전 사용 → 깨진 부분 발견 → 수정 → 다시 실전. __하네스는 모델 업그레이드와 함께 진화합니다.__ 설계 축 7개가 10개가 되고, 스킬이 5개 늘고, 프롬프트가 더 정밀해지는 것 — 이것이 하네스가 살아있다는 증거입니다.",
            },
            {
                type: "cta",
                text: "S-Skills 하네스는 매주 커밋됩니다. __모델이 바뀔 때마다 프롬프트도 같이 업데이트__됩니다.",
                btnText: "GitHub에서 보기 →",
                btnHref: "https://github.com/s0613/S-skills",
            },
        ],
    },
    {
        slug: "claude-fable-5-harness-impact",
        num: "03",
        title: "Claude Fable 5 등장 —",
        titleBreak: "하네스는 어떻게 달라지나",
        date: "2026 · June",
        tag: "Model Analysis",
        lead: "2026년 6월 9일, Anthropic이 가장 강력한 공개 모델 Claude Fable 5를 출시했습니다. SWE-Bench Pro 80.3%, FrontierCode Diamond 29.3%. GPT-5.5와 Gemini 3.1 Pro를 압도하는 수치입니다. 그런데 이 숫자가 에이전트 하네스 설계에 무엇을 의미하는지는 아직 아무도 정확히 말하지 않았습니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "80.3%",
                        title: "SWE-Bench Pro",
                        body: "GPT-5.5는 58.6%, Gemini 3.1 Pro는 54.2%. Fable 5는 실제 GitHub 이슈 해결 벤치마크에서 경쟁 모델을 20포인트 이상 앞질렀습니다.",
                        tag: "vs GPT-5.5 58.6% · vs Gemini 54.2%",
                    },
                    {
                        num: "29.3%",
                        title: "FrontierCode Diamond",
                        body: "최상위 난이도 코딩 벤치마크. GPT-5.5가 5.7%에 그친 것과 달리 Fable 5는 다섯 배 이상의 격차를 벌렸습니다.",
                        tag: "vs GPT-5.5 5.7% · 5× gap",
                    },
                    {
                        num: "95.0%",
                        title: "SWE-Bench Verified",
                        body: "Opus 4.8의 88.6%, Claude Mythos Preview의 93.9%를 넘어섰습니다. 단일 세대 내 6.4포인트 도약은 이례적입니다.",
                        tag: "vs Opus 4.8 88.6%",
                    },
                    {
                        num: "90%",
                        title: "Hex Analytics Benchmark",
                        body: "서드파티 데이터 분석 벤치마크에서 90%를 기록한 최초의 AI 모델. Opus 4.8 대비 10포인트 상승이며 유일하게 독립 기관 수치입니다.",
                        tag: "First AI · +10pt over Opus 4.8",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "수치만 보면 명확합니다. __Fable 5는 코딩 에이전트 벤치마크를 새로 썼습니다.__ API ID는 `claude-fable-5`, 컨텍스트 윈도우 1M 토큰, 최대 출력 128k 토큰, 가격은 입력 $10/출력 $50 per MTok — Opus 4.8 바로 위 티어에 위치합니다. Anthropic이 \"Opus 위의 새로운 레이어\"라고 설명한 만큼, 이전까지 최상위였던 Opus가 이제 중간 포지션이 됩니다.",
            },
            {
                type: "paragraph",
                content: "실제 사례도 있습니다. Stripe는 Fable 5를 활용해 __5천만 줄 Ruby 코드베이스를 하루 만에 마이그레이션__했습니다. 엔지니어링 팀이 작업했다면 두 달 이상 걸렸을 작업입니다. 단순 코드 생성이 아니라 대규모 코드베이스 이해, 의존성 분석, 점진적 마이그레이션 계획 실행을 Fable 5가 오케스트레이션했다는 의미입니다.",
            },
            { type: "heading", content: "벤치마크 수치를 그대로 믿어도 될까" },
            {
                type: "paragraph",
                content: "여기서 중요한 반론이 있습니다. arxiv 프리프린트(SWE-ABS, 2026.02)는 __SWE-Bench Verified의 심각한 인플레이션 문제__를 지적합니다. 상위 30개 에이전트의 패치를 적대적 테스트로 검증한 결과, 약 5건 중 1건은 의미상 잘못된 패치였습니다. 1위 에이전트의 점수는 78.8%에서 62.2%로 하락하며 순위도 5위로 밀렸습니다.",
            },
            {
                type: "paragraph",
                content: "Fable 5의 95.0% 역시 Anthropic 자체 테스트 결과입니다. 독립 기관의 재현 검증은 아직 나오지 않았습니다. 유일하게 서드파티 수치인 Hex Analytics 90%가 오히려 더 신뢰할 만한 데이터 포인트일 수 있습니다. 즉, __수치의 방향성은 맞지만 절대값은 과장됐을 가능성__이 있다는 점을 감안해야 합니다.",
            },
            { type: "heading", content: "하네스 설계에 미치는 실질적 영향" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "오케스트레이터 모델 업그레이드",
                        desc: "S-Skills 하네스에서 Tech Lead(오케스트레이터)에 Fable 5를 투입하면 서브에이전트 태스크 분해 품질이 상승합니다. 컨텍스트 1M 토큰은 대형 코드베이스 전체를 한 번에 보며 설계 결정을 내릴 수 있다는 뜻입니다. 단, $50/MTok 출력 비용은 실질적 제약입니다.",
                        tag: "Tech Lead · Orchestrator",
                    },
                    {
                        name: "워커 모델은 분리 유지",
                        desc: "General AgentBench에서 Claude Sonnet 4.5가 48.0점으로 범용 에이전트 최상위를 기록했습니다. 일반화 성능 저하도 0.2%에 불과합니다. 반복 실행이 많은 워커 레이어는 Sonnet 4.5나 Haiku 4.5를 유지하고, Fable 5는 판단이 필요한 결정 지점에만 투입하는 라우팅이 경제적입니다.",
                        tag: "Worker · Haiku / Sonnet",
                    },
                    {
                        name: "MCP 생태계가 임계점",
                        desc: "2025 AI Agent Index에 따르면 배포된 에이전트 시스템 30개 중 20개가 MCP를 지원합니다. 도구 통합 표준이 수렴되고 있다는 신호입니다. Fable 5 투입보다 MCP 기반 툴링 구조를 먼저 정립하는 것이 하네스 확장성에 더 근본적 영향을 줍니다.",
                        tag: "MCP · 20/30 systems",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "결론적으로 하네스의 설계 철학은 바뀌지 않습니다. __오케스트레이터는 강하게, 워커는 저렴하게, 컨텍스트는 구조적으로__ — 이 원칙은 Fable 5가 나와도 유효합니다. 바뀌는 것은 오케스트레이터 자리에 앉힐 수 있는 모델의 역량 상한선이 올라갔다는 점입니다. 하네스를 잘 설계해뒀다면, 오케스트레이터 모델 ID 한 줄만 바꾸면 됩니다.",
            },
            {
                type: "paragraph",
                content: "Stripe 사례처럼 대형 코드베이스 마이그레이션, 장기 멀티턴 에이전트 루프, 복잡한 추론이 필요한 PM/아키텍트 역할 — 이 세 곳이 Fable 5가 즉각적인 ROI를 만들어낼 포인트입니다. 반면 반복적 코드 생성, 단순 QA 체크, 문서 요약은 여전히 하위 모델이 더 합리적입니다.",
            },
            {
                type: "cta",
                text: "S-Skills 하네스는 이미 모델 라우팅 구조를 내장하고 있습니다. __Tech Lead에 Fable 5를 연결하는 순간__, 하네스 전체가 업그레이드됩니다.",
                btnText: "S-SKILLS 시작하기 →",
                btnHref: "/s-skills",
            },
        ],
    },
]

export function getArticle(slug: string) {
    return articles.find((a) => a.slug === slug) ?? null
}

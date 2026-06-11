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
    {
        slug: "marketing-automation-channels",
        num: "05",
        title: "마케팅 자동화가",
        titleBreak: "가능한 채널",
        date: "2026 · June",
        tag: "Marketing Automation",
        lead: "\"인스타에 올려줘\" 한 마디로 발행까지 도는 채널과, 글은 자동으로 써주지만 발행만은 사람이 직접 붙여넣어야 하는 채널은 다릅니다. 진짜 '자동 발행'은 공식 발행 API가 살아있는 채널에서만 가능합니다. S-Skills 하네스의 sj-marketing은 API가 열린 글로벌 SNS는 승인 한 번으로 끝까지, API가 막힌 한국 블로그는 작성·검수까지 돕습니다 — 전 과정을 자동화한다고 말하지 않습니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "발행 O",
                        title: "API 열린 글로벌 SNS",
                        body: "Threads·Instagram·Facebook(Meta Graph), LinkedIn, X, Reddit, Bluesky, Mastodon, Pinterest는 공식 발행 API가 열려 있어 휴먼 승인 후 채널에 바로 올라갑니다.",
                        tag: "official publish API",
                    },
                    {
                        num: "발행 X",
                        title: "한국 블로그는 API가 막혔다",
                        body: "네이버 블로그 글쓰기 OpenAPI는 종료됐고, 티스토리 오픈 API도 닫혔습니다. 브런치는 공식 발행 API 자체가 없습니다. 코드로 누르는 자동 발행은 불가능합니다.",
                        tag: "naver · tistory · brunch",
                    },
                    {
                        num: "작성",
                        title: "발행 안 돼도 글까지는 자동",
                        body: "발행 경로가 막힌 블로그도 알고리즘별 SEO 본문·이미지·태그까지는 자동으로 완성합니다. 사람은 결과물을 복사해 붙여넣기만 하면 됩니다.",
                        tag: "draft → copy & paste",
                    },
                    {
                        num: "게이트",
                        title: "휴먼 승인은 공통",
                        body: "발행이 되든 안 되든 마지막 판단은 항상 사람입니다. 미리보기와 브랜드 검수 결과를 보고 Y/S/N으로 승인합니다.",
                        tag: "Y / Skip / No",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "마케팅 자동화라고 하면 보통 \"버튼 누르면 알아서 다 올라간다\"를 떠올립니다. 하지만 실제로 '발행'까지 자동으로 되는 채널은 __공식 발행 API가 열려 있는 곳뿐__입니다. 플랫폼이 API를 닫아두면, 아무리 좋은 카피를 만들어도 코드가 대신 게시 버튼을 누를 방법이 없습니다. 그래서 sj-marketing은 채널을 두 부류로 나눠 다르게 돕습니다 — 발행까지 가는 채널과, 작성까지만 가는 채널.",
            },
            {
                type: "paragraph",
                content: "공통점은 __채널마다 다르게 쓴다__는 것입니다. 하나의 주제를 던지면 copywriter와 image-director 에이전트가 각 채널 규격에 맞춰 따로 결과물을 만듭니다. Instagram은 150~300자에 후킹 첫 줄과 해시태그 5~15개, LinkedIn은 500~1300자의 스토리와 데이터, Threads는 200~500자, X는 280자 이내. 같은 메시지를 복사해 붙여넣는 게 아니라, 채널 성격에 맞게 재작성됩니다.",
            },
            { type: "heading", content: "발행까지 자동화되는 채널 — API가 열린 곳" },
            {
                type: "paragraph",
                content: "공식 발행 API가 살아있는 채널은 승인 후 끝까지 자동으로 돕니다. __Threads·Instagram·Facebook__은 Meta Graph, __LinkedIn·X·Reddit·Pinterest__는 각 플랫폼의 공식 API, __Bluesky__는 AT Protocol, __Mastodon__은 인스턴스 토큰으로 게시합니다. 플로우는 환경 점검 → 브랜드 프로필 확인 → 카피·이미지 생성 → 미리보기 → __휴먼 게이트__ → API 발행 → 슬롯 저장. 주제 한 줄만 입력하면 됩니다.",
            },
            {
                type: "paragraph",
                content: "채널마다 제약은 정직하게 둡니다. Instagram은 텍스트 단독 게시가 안 되고 이미지·카루셀이 필수, X는 이미지 첨부에 OAuth1이 필요합니다. 실제로 올리기 전에 결과물만 보고 싶다면 `--dry-run`으로 카피·이미지·브랜드 검수까지 전부 생성하되 발행은 건너뜁니다. 특정 채널만 노리려면 `--channels=linkedin,threads`로 좁힙니다.",
            },
            { type: "heading", content: "발행이 막힌 채널 — 한국 블로그 3종" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "네이버 블로그 — 글쓰기 API 종료",
                        desc: "네이버 블로그 글쓰기 OpenAPI(writePost)는 더 이상 제공되지 않습니다. 그래서 하네스는 C-Rank·DAN25 RCON·홈피드 추천 알고리즘별 SEO 본문(2,000자+, 헤더 이미지·ALT 포함)까지 완성하되, 발행은 사람이 직접 붙여넣습니다.",
                        tag: "API 종료 · 수동 게시",
                    },
                    {
                        name: "티스토리 — 오픈 API 종료",
                        desc: "카카오가 티스토리 오픈 API를 닫으면서 자동 발행 경로가 사라졌습니다. ALT 텍스트·표·구조화 본문으로 네이버와 구글 검색을 동시에 노리는 글까지는 자동 작성, 게시는 수동입니다.",
                        tag: "API 종료 · 수동 게시",
                    },
                    {
                        name: "브런치 — 공식 API 없음",
                        desc: "브런치는 공식 발행 API가 없어 브라우저 자동화에만 의존합니다. 카카오 SSO·페이지 구조 변경에 취약해 신뢰할 수 있는 자동 발행으로 보기 어렵습니다. 에디토리얼 카피까지 자동, 게시는 사람 손.",
                        tag: "공식 API 없음 · browser",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "발행이 막혔다고 자동화의 가치가 사라지는 건 아닙니다. 블로그에서 시간이 가장 많이 드는 일은 게시 버튼이 아니라 __알고리즘에 맞는 본문을 쓰는 것__이기 때문입니다. 기술적 SEO(색인 등록, Search Console·네이버 서치어드바이저 제출)는 별도의 sj-seo 스킬로 라우팅되고, sj-marketing은 콘텐츠 SEO에 집중합니다. 완성된 글을 붙여넣는 마지막 한 단계만 사람의 몫으로 남습니다.",
            },
            { type: "heading", content: "왜 발행만큼은 사람이 누르나" },
            {
                type: "paragraph",
                content: "발행을 사람이 누르는 이유는 두 가지입니다. 하나는 __구조적 제약__ — 한국 블로그는 API가 막혀 코드가 누를 수 없습니다. 다른 하나는 __의도적 안전장치__ — API가 열린 SNS도 마지막은 휴먼 게이트를 거칩니다. 금기어 하나, 광고법 위반 하나가 브랜드 신뢰를 무너뜨리기 때문입니다. 하네스는 발행 전에 미리보기와 브랜드 검수 결과(금기어·과장 표현·광고 표시 여부)를 보여주고, 사람이 Y(승인)·S(건너뛰기)·N(거부)을 입력해야만 넘어갑니다.",
            },
            {
                type: "paragraph",
                content: "브랜드 톤도 누적됩니다. company-profile.yaml에 브랜드명·타겟·톤·금기어·채널을 정의해두면 매 캠페인이 같은 정체성으로 작성됩니다. 프로필이 없으면 첫 실행에서 5가지를 인터뷰해 임시 프로필을 만듭니다. __실행할수록 브랜드의 목소리가 일관되게 학습__됩니다.",
            },
            {
                type: "cta",
                text: "하네스가 돕는 건 '전 과정'이 아닙니다. __발행 API가 열린 채널은 승인 한 번으로 끝까지, 막힌 채널은 붙여넣기 직전까지__ — 각 채널이 실제로 허락하는 지점까지 정확히 돕습니다.",
                btnText: "S-SKILLS 시작하기 →",
                btnHref: "/s-skills",
            },
        ],
    },
    {
        slug: "why-giants-build-agent-platforms",
        num: "06",
        title: "대기업이 앞다퉈",
        titleBreak: "에이전트 플랫폼을 만드는 이유",
        date: "2026 · June",
        tag: "Industry Analysis",
        lead: "2025년 10월 AWS가 Bedrock AgentCore를 정식 출시했고, 2026년 6월 LG CNS가 AIND를 공개했으며, 같은 시기 구글은 Vertex AI를 Gemini Enterprise Agent Platform으로 재편했습니다. 세 회사가 거의 동시에 만든 것은 더 똑똑한 모델이 아닙니다. 모델을 '돌리는 판' — 에이전트 플랫폼입니다. 왜 모두가 같은 곳으로 달려가고 있을까요.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "AWS",
                        title: "Bedrock AgentCore",
                        body: "2025년 10월 정식 출시. Runtime·Gateway·Memory·Identity·Observability 5개 서비스로 분리됩니다. 8시간 실행, 세션 격리, A2A 프로토콜. 모델과 프레임워크는 가리지 않습니다.",
                        tag: "GA 2025.10 · 5 services",
                    },
                    {
                        num: "Google",
                        title: "Gemini Enterprise Agent Platform",
                        body: "Cloud Next 2026에서 Vertex AI를 재편. ADK(Python·Go·Java·TS) + Agent Engine 런타임 + 200개 이상 모델. 그 200개 안에 Anthropic Claude도 들어 있습니다.",
                        tag: "구 Vertex AI · ADK v1.0",
                    },
                    {
                        num: "LG CNS",
                        title: "AIND",
                        body: "2026년 6월 8일 공개. 요구사항 분석·설계·코딩·검증을 역할별 에이전트가 분담하고, 개발 표준·보안 규정·소스코드를 구조화한 'Knowledge Foundation' 온톨로지가 핵심입니다. Cline과 공동 개발.",
                        tag: "2026.06.08 · w/ Cline",
                    },
                    {
                        num: "공통",
                        title: "모델은 갈아끼운다",
                        body: "AgentCore는 어떤 파운데이션 모델이든, Vertex는 200개 중 무엇이든, LG CNS는 Claude Enterprise 위에서. 세 플랫폼 모두 모델을 부품으로 취급합니다.",
                        tag: "model-agnostic",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "세 회사가 만든 것을 한 겹 벗겨보면 공통점이 선명합니다. __아무도 모델 그 자체를 팔지 않습니다.__ AgentCore는 \"어떤 파운데이션 모델이든\" 돌아간다고 못 박고, Gemini Enterprise Agent Platform은 자사 Gemini 옆에 경쟁사 Claude를 포함한 200개 모델을 나란히 올렸으며, LG CNS AIND는 앤트로픽 Claude Enterprise와 오픈소스 Cline 위에 얹혔습니다. 모델은 언제든 교체 가능한 부품이고, 진짜 제품은 그 부품을 둘러싼 __판__입니다.",
            },
            { type: "heading", content: "왜 모델이 아니라 플랫폼인가" },
            {
                type: "paragraph",
                content: "첫 번째 이유는 모델이 너무 빠르게 상향평준화되기 때문입니다. 6개월마다 SOTA가 바뀝니다. 모델 한 개에 회사의 운명을 걸면 다음 분기에 처음부터 다시 만들어야 합니다. 반대로 그 위에 깔린 __오케스트레이션·거버넌스·통합 레이어__는 한 번 구축하면 모델만 갈아끼우며 계속 씁니다. 가치는 빠르게 낡는 모델에서 천천히 쌓이는 플랫폼으로 이동합니다. 거대 기업이 베팅하는 곳은 당연히 후자입니다.",
            },
            {
                type: "paragraph",
                content: "두 번째 이유가 더 본질적입니다. __엔터프라이즈가 원하는 것은 지능이 아니라 통제입니다.__ 은행 코어뱅킹, 사내 API, 고객 데이터를 실제로 건드리는 에이전트에는 권한 관리, 감사 로그, 관측 가능성, 신원 인증이 반드시 필요합니다. 모델 API 호출 한 줄에는 이런 것이 전혀 없습니다. 그래서 AgentCore는 Identity를 OAuth·Okta·Auth0와 붙이고 Observability를 별도 서비스로 떼어냈으며, LG CNS는 보안 규정과 개발 표준을 온톨로지로 구조화했습니다. 똑똑한 모델은 시작점일 뿐, 기업이 돈을 내는 지점은 통제 레이어입니다.",
            },
            { type: "heading", content: "세 플랫폼이 똑같이 그린 레이어" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "런타임 — 에이전트를 안전하게 돌리는 자리",
                        desc: "AgentCore Runtime은 세션을 격리하고 최대 8시간 장시간 실행을 보장합니다. Vertex Agent Engine은 관리형 런타임에 평가·세션·코드 실행을 묶었습니다. 에이전트를 '어디서 어떻게 돌리느냐'가 첫 번째 레이어입니다.",
                        tag: "Runtime · isolation",
                    },
                    {
                        name: "도구 게이트웨이 — 통합이 진짜 병목",
                        desc: "AgentCore Gateway는 기존 MCP 서버, REST API, Lambda를 전부 에이전트 도구로 변환합니다. Vertex는 Apigee를 API-투-에이전트 다리로 쓰는 관리형 MCP를 내놨습니다. 모델은 똑똑한데 사내 시스템에 못 붙는 것 — 그 간극을 메우는 레이어가 락인의 핵심입니다.",
                        tag: "MCP · tool integration",
                    },
                    {
                        name: "메모리 — 세션이 끊겨도 남는 컨텍스트",
                        desc: "AgentCore Memory는 단기(세션 내)와 장기(세션 간) 기억을 관리형으로 제공하고, Vertex는 Memory Bank를 별도로 둡니다. 에이전트가 지난 상호작용을 기억하는 것은 옵션이 아니라 기본 레이어가 됐습니다.",
                        tag: "short-term + long-term",
                    },
                    {
                        name: "거버넌스 — 휴먼 게이트의 엔터프라이즈판",
                        desc: "신원 인증, 도구 사용 권한, 감사, 관측. 개인 하네스가 발행 직전 'Y/S/N' 승인으로 막는 그 게이트를, 대기업은 OAuth·VPC·PrivateLink·도구 거버넌스로 제도화합니다. 규모만 다를 뿐 원리는 같습니다.",
                        tag: "Identity · Observability",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "특히 도구 게이트웨이가 결정적입니다. 세 플랫폼이 약속이라도 한 듯 __MCP(Model Context Protocol)로 수렴__하고 있습니다. AgentCore Gateway가 기존 MCP 서버를 그대로 연결하고, 구글이 관리형 MCP 서버를 내놓고, A2A 프로토콜 v1.0에 이미 150개 이상의 조직이 참여하고 있습니다. 모델이 아무리 똑똑해도 사내 시스템에 못 붙으면 쓸모가 없습니다. 그래서 통합 표준을 먼저 장악하는 쪽이 생태계를 가져갑니다. 클라우드 벤더에게는 자사 컴퓨트 위에서 에이전트가 돌며 다른 서비스를 소비하게 만드는 분배 채널이고, SI 기업에게는 고객사 지식을 온톨로지로 묶어두는 락인입니다.",
            },
            { type: "heading", content: "결국 모두가 만드는 건 '하네스'다" },
            {
                type: "paragraph",
                content: "이 인사이트 시리즈에서 계속 말해온 것을 떠올려 보세요. 오케스트레이션, 컨텍스트 누적, 역할 분리, 모델 라우팅, 휴먼 게이트, 관측 가능성. __구글과 AWS와 LG CNS가 수십억을 들여 만들고 있는 것이 정확히 이 목록입니다.__ 1인 개발용 S-Skills 하네스가 수백 시간의 시행착오로 도달한 결론과, 대기업이 엔터프라이즈 스케일로 제품화하는 결론이 같은 곳을 가리킵니다. 한쪽이 다른 쪽을 베낀 게 아니라, 모델을 실제로 일하게 만들려면 누구든 같은 레이어에 도착하기 때문입니다 — 모델 위에 판이 필요하다는 것.",
            },
            {
                type: "paragraph",
                content: "그래서 \"에이전트 플랫폼을 왜 만드는가\"라는 질문의 답은 단순합니다. __모델은 갈아끼우는 부품이 됐고, 남는 것은 판이기 때문__입니다. 모델 경쟁은 6개월짜리지만, 그 위에 깔린 오케스트레이션·메모리·거버넌스 레이어는 한 번 표준이 되면 오래 갑니다. 거대 기업이 플랫폼으로 달려가는 이유도, 1인 개발자가 하네스부터 갖춰야 하는 이유도 같은 곳을 가리킵니다. 하네스가 제품입니다.",
            },
            {
                type: "cta",
                text: "대기업이 수십억으로 만드는 그 레이어를, 1인 개발은 __설치 한 줄로__ 갖춥니다. 오케스트레이션·컨텍스트·역할 분리·휴먼 게이트 — 원리는 같습니다.",
                btnText: "S-SKILLS 시작하기 →",
                btnHref: "/s-skills",
            },
        ],
    },
    {
        slug: "loop-engineering",
        num: "07",
        title: "이제 에이전트에 프롬프트하지 않는다",
        titleBreak: "— 루프 엔지니어링의 시대",
        date: "2026 · June",
        tag: "Loop Engineering",
        lead: "2026년 6월 7일, Peter Steinberger가 X에 한 줄을 남겼습니다. \"더 이상 코딩 에이전트에 프롬프트하지 마라. 에이전트에 프롬프트하는 루프를 설계하라.\" 같은 주에 Claude Code를 만든 Boris Cherny는 \"내 일은 루프를 작성하는 것\"이라고 말했고, Addy Osmani가 이 흐름을 'Loop Engineering'이라는 이름으로 정리했습니다. 지난 2년간의 방식 — 좋은 프롬프트를 쓰고 한 턴씩 주고받는 것 — 이 끝나가고 있습니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "루프",
                        title: "프롬프트가 아니라 시스템",
                        body: "루프는 목적을 정의하면 AI가 완료될 때까지 반복하는 재귀적 목표입니다. 사람이 매 턴 프롬프트하던 자리를, 작업을 찾고 분배하고 검증하고 기록하는 작은 시스템이 대체합니다.",
                        tag: "recursive goal",
                    },
                    {
                        num: "5+1",
                        title: "루프의 구성 요소",
                        body: "Automations(스케줄 발동) · Worktrees(병렬 격리) · Skills(프로젝트 지식) · Plugins/Connectors(도구 연결) · Sub-agents(생성과 검증 분리), 그리고 메모리. 단일 대화 밖에 사는 상태 저장소가 척추입니다.",
                        tag: "automations · worktrees · skills · connectors · sub-agents",
                    },
                    {
                        num: "/goal",
                        title: "만드는 쪽 ≠ 채점하는 쪽",
                        body: "Claude Code의 /goal은 조건이 참이 될 때까지 돌고, 매 턴 후 별도의 작은 모델이 완료 여부를 판정합니다. 코드를 쓴 에이전트가 자기 숙제를 채점하지 못하게 — 정지 조건 자체에 maker·checker 분리가 들어 있습니다.",
                        tag: "verifier ≠ maker",
                    },
                    {
                        num: "사람",
                        title: "루프가 못 해주는 것",
                        body: "검증은 여전히 본인 몫이고, 읽지 않은 코드는 이해 부채로 쌓이며, 루프가 좋아질수록 판단을 내려놓기 쉬워집니다. 루프는 일을 바꿀 뿐 엔지니어를 지우지 않습니다.",
                        tag: "verification · comprehension · judgment",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "지난 약 2년간 코딩 에이전트와 일하는 방식은 하나였습니다. 좋은 프롬프트와 충분한 컨텍스트를 주고, 결과를 읽고, 다음 프롬프트를 쓰는 것. 에이전트를 도구로 직접 손에 쥐는 방식입니다. 루프 엔지니어링은 그 손의 자리를 시스템으로 바꿉니다. __작업을 찾아 분배하고, 검증하고, 완료된 것을 기록하고, 다음 작업을 결정하는 작은 시스템__을 만들어, 그 시스템이 에이전트를 찌르게 하는 것입니다. Cherny의 표현을 빌리면 \"이제 Claude에 프롬프트하지 않는다. 루프가 Claude에 프롬프트하고 무엇을 할지 정한다. 내 일은 루프를 작성하는 것\"입니다.",
            },
            {
                type: "paragraph",
                content: "중요한 변화는 이것이 __더 이상 도구의 문제가 아니라는 점__입니다. 1년 전엔 루프를 원하면 bash 스크립트 더미를 직접 작성하고 유지해야 했습니다. 지금은 구성 요소가 제품 안에 그대로 탑재돼 있습니다. Steinberger가 나열한 목록이 OpenAI의 Codex 앱과 거의 정확히 일치하고, Claude Code와도 거의 동일합니다. 어느 도구가 낫냐를 다툴 이유가 없습니다 — __어느 쪽에서도 동작하는 루프를 설계__하면 됩니다.",
            },
            { type: "heading", content: "다섯 가지 구성 요소, 그리고 메모리" },
            {
                type: "harnessRefs",
                refs: [
                    {
                        name: "Automations — 루프의 심장 박동",
                        desc: "스케줄에 따라 발동해 스스로 발견과 분류를 수행합니다. Codex는 Automations 탭에서 프로젝트·프롬프트·주기를 정하고, 발견이 있으면 Triage 인박스로, 없으면 자동 아카이브됩니다. Claude Code는 /loop(주기 재실행)·cron·hooks로 같은 지점에 도달하고, 노트북을 닫은 뒤에도 돌리려면 GitHub Actions로 넘깁니다.",
                        tag: "schedule · triage inbox",
                    },
                    {
                        name: "Worktrees — 병렬이 혼돈이 되지 않도록",
                        desc: "에이전트를 둘 이상 돌리는 순간 파일이 충돌합니다. git worktree는 같은 repo 히스토리를 공유하면서 각자 별도 작업 디렉터리를 주므로, 한 에이전트의 편집이 다른 쪽에 닿을 수 없습니다. 단, 실제로 돌릴 수 있는 수는 도구가 아니라 본인의 리뷰 대역폭이 정합니다.",
                        tag: "isolation · parallel",
                    },
                    {
                        name: "Skills + Connectors — 지식과 손발",
                        desc: "Skill은 컨벤션·빌드 단계·'그 사건 때문에 이렇게는 안 한다'를 한 번 적어두면 에이전트가 매 실행마다 읽는 외부화된 의도입니다. 없으면 루프가 매 사이클 프로젝트를 0에서 재학습합니다. MCP 기반 connector는 루프가 이슈 트래커를 읽고 PR을 열고 Slack에 핑을 보내게 — 가능성을 말하는 데서 그치지 않고 실제로 행동하게 합니다.",
                        tag: "SKILL.md · MCP",
                    },
                    {
                        name: "Sub-agents — 생성과 검증의 분리",
                        desc: "코드를 쓴 모델은 자기 숙제를 채점할 때 너무 관대합니다. 다른 지시문, 때로는 다른 모델을 가진 두 번째 에이전트가 첫 번째가 스스로 납득해 버린 것을 잡아냅니다. 루프는 보지 않는 동안 돌기 때문에, 신뢰할 수 있는 검증자가 있어야 자리를 떠날 수 있습니다.",
                        tag: "maker · checker",
                    },
                ],
            },
            {
                type: "paragraph",
                content: "여섯 번째 요소는 __메모리__입니다. markdown 파일이든 Linear 보드든, 단일 대화 밖에 살면서 완료된 것과 다음 할 것을 보관하는 곳. 너무 단순해 보이지만 모든 장기 실행 에이전트가 의존하는 동일한 트릭입니다. 모델은 실행 사이에 모든 것을 잊기 때문에 메모리는 컨텍스트가 아니라 __디스크에__ 있어야 합니다. 에이전트는 잊어도 repo는 잊지 않습니다.",
            },
            { type: "heading", content: "하나의 루프는 어떻게 생겼는가" },
            {
                type: "paragraph",
                content: "Osmani가 그리는 전형적인 루프는 이렇습니다. automation이 매일 아침 repo에서 실행되고, 그 프롬프트가 triage skill을 호출해 어제의 CI 실패·열린 이슈·최근 커밋을 읽어 결과를 상태 파일에 기록합니다. 할 가치가 있는 항목마다 격리된 worktree가 열리고, sub-agent 하나가 수정 초안을 만들면 두 번째 sub-agent가 프로젝트 skill과 기존 테스트 대비로 리뷰합니다. connector가 PR을 열고 티켓을 갱신하며, 루프가 처리하지 못한 것은 triage 인박스로 들어옵니다. __상태 파일이 전체의 척추__입니다 — 무엇을 시도했고 통과했고 아직 열려 있는지를 기억해, 다음 날 아침 실행이 오늘 멈춘 지점에서 이어갑니다. 핵심은 그 단계들 중 어느 것도 사람이 프롬프트하지 않았다는 것. __한 번 설계했을 뿐__입니다.",
            },
            {
                type: "paragraph",
                content: "낯설지 않을 겁니다. 이 시리즈에서 다뤄온 S-Skills 하네스가 정확히 이 구조이기 때문입니다. PROJECT.md와 context.md가 상태 파일(메모리), 역할별 서브에이전트 병렬 디스패치가 worktree 위의 분업, 구현자 산출물을 보지 않는 독립 QA가 maker·checker 분리입니다. 루프 엔지니어링은 새로운 발명이라기보다, __장기 실행 에이전트를 굴려본 사람들이 각자 도달한 같은 결론에 이름이 붙은 것__에 가깝습니다.",
            },
            { type: "heading", content: "루프가 여전히 대신해 주지 않는 것" },
            {
                type: "paragraph",
                content: "루프는 일을 바꿀 뿐 사람을 지우지 않습니다. 오히려 루프가 좋아질수록 더 날카로워지는 문제가 셋 있습니다. 첫째, __검증은 여전히 본인 몫__입니다. 무인으로 도는 루프는 무인으로 실수하는 루프이기도 합니다. verifier를 분리하는 이유는 루프의 '끝났다'에 의미를 부여하기 위해서지만, 그래도 'done'은 증명이 아니라 주장입니다. 둘째, __이해는 방치하면 썩습니다.__ 직접 쓰지 않은 코드를 빨리 출하할수록, 존재하는 것과 실제로 이해하는 것 사이의 간극 — comprehension debt — 이 커집니다. 매끄러운 루프는 산출물을 읽지 않으면 그 간극을 더 빨리 키웁니다.",
            },
            {
                type: "paragraph",
                content: "셋째가 가장 미묘합니다. __편안한 자세가 위험한 자세__입니다. 루프가 스스로 돌면 의견 갖기를 멈추고 돌려받은 것을 그대로 받기 쉽습니다. 루프 설계는 판단을 갖고 하면 치료제고, 사고를 피하려고 하면 가속제입니다 — 같은 행동, 정반대의 결과. 같은 루프를 만든 두 사람 중 한 명은 깊이 이해한 일을 더 빨리 해내고, 다른 한 명은 일을 이해하지 않기 위해 씁니다. 루프는 그 차이를 모르지만, 당신은 압니다. 이것이 루프 설계가 프롬프트 엔지니어링보다 쉬운 게 아니라 __더 어려운__ 이유입니다. Cherny의 요점은 일이 쉬워졌다는 게 아니라, 레버리지 지점이 옮겨졌다는 것입니다.",
            },
            {
                type: "cta",
                text: "루프를 만들되, 그저 시작 버튼을 누르는 사람이 아니라 __엔지니어로 남을 사람처럼__ 만드세요. S-Skills 하네스는 상태 파일·역할 분리·독립 검증 — 루프의 뼈대를 이미 갖추고 있습니다.",
                btnText: "S-SKILLS 시작하기 →",
                btnHref: "/s-skills",
            },
        ],
    },
]

export function getArticle(slug: string) {
    return articles.find((a) => a.slug === slug) ?? null
}

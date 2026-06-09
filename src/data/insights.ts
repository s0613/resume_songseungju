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
]

export function getArticle(slug: string) {
    return articles.find((a) => a.slug === slug) ?? null
}

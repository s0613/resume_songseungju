export type Block =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "divider" }
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
        slug: "s-skills-in-one",
        num: "01",
        title: "혼자 만드는 AI 팀은",
        titleBreak: "어떻게 기억하고 검증하는가",
        date: "2026 · July",
        tag: "Harness",
        lead: "S-Skills는 Claude Code에 역할 몇 개를 덧붙인 프롬프트 모음이 아닙니다. 혼자 개발할 때 사라지기 쉬운 맥락을 남기고, 구현과 검증을 분리하며, 반복 작업을 끝까지 닫는 역할 기반 하네스입니다. 모델이 바뀌고 자동화 범위가 넓어질수록 중요한 것은 더 긴 지시가 아니라 기억·검증·정지 조건을 갖춘 운영 구조였습니다. 이 글은 S-Skills가 그 구조에 도달한 과정을 네 가지 흐름으로 정리합니다.",
        blocks: [
            {
                type: "cardNews",
                cards: [
                    {
                        num: "01",
                        title: "구조 — 역할이 있는 팀",
                        body: "설치 한 줄이면 PM·디자인·개발·QA가 생깁니다. 의도를 읽어 적절한 역할로 라우팅하고, QA는 구현자 산출물을 보지 않고 독립 검증합니다.",
                        tag: "/sj-company · intent routing",
                    },
                    {
                        num: "02",
                        title: "기억 — 세션 너머로",
                        body: "PROJECT.md와 역할별 context.md에 판단을 누적하고, 옵시디언 볼트를 장기 기억으로 씁니다. 삭제 없이 archive만 — 과거 결정이 남습니다.",
                        tag: "PROJECT.md · Obsidian vault",
                    },
                    {
                        num: "03",
                        title: "진화 — 모델과 함께",
                        body: "Fable 5 출시 주에 22개 커밋. 모델이 강해지면 리뷰어를 재보정하고, 하네스의 중심은 지시에서 가드레일과 검증으로 이동합니다.",
                        tag: "Fable 5 · 22 commits",
                    },
                    {
                        num: "04",
                        title: "루프 — 끝나는 자동화",
                        body: "에이전트가 아니라 루프를 프롬프트합니다. 기계 검증 가능한 정지 조건으로 반복을 닫고, 발행 같은 최종 판단은 사람 게이트로 남깁니다.",
                        tag: "/sj-loop · human gate",
                    },
                ],
            },
            { type: "heading", content: "프롬프트 모음이 아니라 혼자 일하는 방식을 설계하다" },
            {
                type: "paragraph",
                content:
                    "S-Skills는 카파시의 하네스 관점, gstack의 실전적인 작업 흐름, Hermes의 기억 관리 방식에서 출발했습니다. 그대로 복제하기보다 1인 개발에 필요한 부분만 골라 다시 조립했습니다. 한 줄로 설치하면 PM부터 QA까지 역할이 생기지만, 목적은 여러 에이전트를 늘어놓는 데 있지 않습니다. 요청의 __의도를 읽고 적절한 역할과 절차로 연결하는 것__이 핵심입니다.",
            },
            {
                type: "paragraph",
                content:
                    "혼자 개발하면 요구사항을 정한 사람과 구현한 사람, 검수하는 사람이 모두 같아집니다. 이 구조에서는 처음 내린 판단이 이후의 검토까지 지배하기 쉽습니다. 그래서 S-Skills의 QA는 구현자의 산출물을 참조하지 않고 요구사항과 실제 결과를 독립적으로 확인합니다. 에이전트의 순간적인 실력보다 발견과 수정이 빠르게 이어지는 __루프의 속도__를 우선한 설계입니다.",
            },
            {
                type: "paragraph",
                content:
                    "AWS Bedrock AgentCore, LG CNS AIND, Google Gemini Enterprise Agent Platform이 공통으로 만드는 것도 새로운 모델 자체보다 모델을 안전하게 돌리는 판입니다. 역할, 상태, 도구, 검증을 연결하는 레이어가 있어야 모델의 능력이 실제 업무로 이어지기 때문입니다. 규모는 다르지만 S-Skills도 같은 질문에서 출발합니다. 혼자 만드는 프로젝트에도 결국 필요한 것은 모델 한 개가 아니라 __모델이 일하는 방식을 통제하는 하네스__입니다.",
            },
            { type: "divider" },
            { type: "heading", content: "세션은 끝나도 프로젝트의 기억은 남아야 합니다" },
            {
                type: "paragraph",
                content:
                    "대화 세션이 끝나면 결정한 방향, 거부한 디자인, 어렵게 익힌 도메인 지식도 함께 사라지기 쉽습니다. 다음 세션은 같은 질문을 반복하고, 이미 폐기한 선택지를 다시 제안합니다. S-Skills는 PROJECT.md를 프로젝트의 단일 진실로 두고, pm-context 같은 역할별 context.md에 판단과 작업 맥락을 누적합니다. 기억을 모델의 대화창이 아니라 __프로젝트가 소유하는 파일__로 옮긴 것입니다.",
            },
            {
                type: "paragraph",
                content:
                    "누적만큼 중요한 것은 기억을 다루는 규칙입니다. Hermes에서 가져온 불변식에 따라 기존 맥락은 조용히 삭제하지 않고 archive로 이동합니다. 현재 정보는 간결하게 유지하되, 과거의 판단 근거와 변경 과정은 추적할 수 있어야 합니다. 그래야 오래된 정보가 방해가 되지 않으면서도 같은 실수를 반복하지 않습니다.",
            },
            {
                type: "paragraph",
                content:
                    "최근 개편에서는 이 흐름을 옵시디언까지 확장했습니다. 작업 전에는 볼트에 쌓인 도메인 지식을 읽고, 작업 후에는 보고서 정리본을 다시 볼트에 저장합니다. MCP를 거치지 않고 파일 도구로 직접 접근하며, 볼트가 없거나 접근할 수 없다면 성공한 척하지 않고 '미수행'으로 기록합니다. __하네스가 실행하고, 옵시디언이 기억하는__ 양방향 순환입니다.",
            },
            { type: "divider" },
            { type: "heading", content: "모델이 강해질수록 하네스는 더 많이 검증해야 합니다" },
            {
                type: "paragraph",
                content:
                    "Claude Fable 5 출시 주에 S-Skills에는 22개 커밋이 쌓였습니다. 모델의 성능이 좋아졌는데도 리뷰어 프롬프트는 오히려 흔들렸습니다. 새 모델이 보이는 아첨과 과신의 양상이 달라지면서, 충분히 검증하지 않은 결과를 그럴듯하게 승인하는 문제가 나타났기 때문입니다. 리뷰어는 한 번 잘 만들어 두는 역할이 아니라 __모델의 행동 변화에 맞춰 계속 보정해야 하는 장치__였습니다.",
            },
            {
                type: "paragraph",
                content:
                    "같은 시기에 디자인 스킬은 3일 동안 v3.0에서 v3.2로 바뀌었고, gstack에서 영감을 얻은 스킬 5개가 추가됐습니다. 이 변화는 기능 수를 늘리는 작업만은 아니었습니다. 모델이 더 넓은 일을 맡을수록 요청을 구체적으로 쪼개는 방식, 결과를 반박하는 기준, 실패했을 때 되돌아갈 지점을 함께 다시 설계해야 했습니다.",
            },
            {
                type: "paragraph",
                content:
                    "SWE-Bench Pro 80.3% 같은 수치는 모델의 가능성을 보여주지만 개별 프로젝트의 성공률을 보장하지는 않습니다. 실제 저장소에는 불완전한 요구사항, 누적된 결정, 자동화할 수 없는 승인 과정이 함께 존재합니다. 따라서 모델이 강해질수록 하네스의 중심은 세세한 지시에서 __가드레일과 독립 검증__으로 이동합니다. 더 잘 지시하는 것보다 잘못된 확신을 발견하는 구조가 중요해집니다.",
            },
            { type: "divider" },
            { type: "heading", content: "에이전트가 아니라 끝나는 루프를 설계합니다" },
            {
                type: "paragraph",
                content:
                    "Peter Steinberger의 한 줄에서 출발한 루프 엔지니어링은 프롬프트의 대상을 바꿉니다. 에이전트에게 한 번의 정답을 요구하는 대신 목적, 한 번의 반복 단위, 기계로 확인할 수 있는 정지 조건, 상태 파일, 가드레일을 설계합니다. S-Skills의 /sj-loop은 이 구조를 실행 가능한 흐름으로 옮긴 것입니다. 상태를 남기고 검증을 통과할 때까지 반복하되, 멈춰야 할 때는 명확히 멈춥니다.",
            },
            {
                type: "paragraph",
                content:
                    "자동화의 완성도는 모든 단계를 없애는 데서 나오지 않습니다. 마케팅 작업은 API가 열린 채널이라면 발행까지 연결할 수 있지만, 발행이 막힌 한국 블로그 3종에서는 초안 생성까지만 자동화합니다. 최종 발행 버튼은 사람이 누르는 게이트로 남깁니다. 루프가 대신할 수 없는 판단을 인정하고 __자동화와 책임의 경계__를 분명히 한 것입니다.",
            },
            {
                type: "paragraph",
                content:
                    "SI 문서 자동화도 같은 원리로 설계했습니다. 개요, 제안서, 요구사항, WBS, 데모, 결과보고서의 6종 문서를 한 번의 흐름에서 만들지만 핵심은 글을 그럴듯하게 쓰는 능력이 아닙니다. 앱이 그대로 읽고 다음 단계에 사용할 수 있도록 구조화된 데이터를 만드는 일이 더 중요합니다. 기억을 파일로 남기고, 반복을 검증으로 닫고, 사람의 승인이 필요한 지점은 보존하는 것. 이것이 S-Skills가 여러 기능을 하나의 하네스로 묶는 방식입니다.",
            },
            {
                type: "cta",
                text: "혼자 개발해도 기억과 검증을 갖춘 팀처럼 일할 수 있습니다. Claude Code에 __S-Skills 하네스__를 설치해 보세요.",
                btnText: "GitHub에서 설치 →",
                btnHref: "https://github.com/s0613/S-skills",
            },
        ],
    },
]

export function getArticle(slug: string) {
    return articles.find((a) => a.slug === slug) ?? null
}

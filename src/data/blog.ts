// 송승주의 AI 블로그 — 전용 콘텐츠 데이터
// 이력서의 S-Skills 인사이트와는 분리된, 친근한 톤의 개인 블로그 글 모음입니다.

export type BlogBlock =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "quote"; content: string; author?: string }
    | { type: "list"; items: string[] }
    | { type: "tip"; title: string; content: string }
    | { type: "figure"; emoji: string; caption?: string }
    | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string }

export interface BlogPost {
    slug: string
    category: string
    title: string
    date: string // "2026. 6. 17."
    readTime: string // "5분"
    excerpt: string
    tags: string[]
    blocks: BlogBlock[]
}

export interface BlogProfile {
    nickname: string
    handle: string
    intro: string
    links: { label: string; href: string }[]
}

export const blogProfile: BlogProfile = {
    nickname: "승주",
    handle: "songseungju",
    intro: "AI 에이전트 개발 일기",
    links: [
        { label: "이력서", href: "/" },
        { label: "GitHub", href: "https://github.com/s0613" },
        { label: "S-Skills", href: "/s-skills" },
    ],
}

export interface Category {
    name: string
    slug: string
    count: number
}

// 글의 category 값과 매칭됩니다.
export const categories: Category[] = [
    { name: "전체보기", slug: "all", count: 2 },
    { name: "소개", slug: "intro", count: 1 },
    { name: "에이전트 경험", slug: "experience", count: 1 },
    { name: "AI 학습노트", slug: "learning", count: 0 },
    { name: "인사이트", slug: "insight", count: 0 },
]

export const posts: BlogPost[] = [
    {
        slug: "making-my-own-harness",
        category: "에이전트 경험",
        title: "요즘 하네스 만드는 게 재밌더라고요",
        date: "2026. 6. 17.",
        readTime: "6분",
        excerpt:
            "유명한 하네스들과 좋은 로직을 짬뽕해서, 제 개발 환경과 작업에 맞춘 하네스를 만들고 있습니다. 나만의 자산이 쌓인다는 생각에 요즘 이 작업이 꽤 즐겁습니다.",
        tags: ["하네스", "AI에이전트", "오케스트레이션", "개발환경"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "요즘 하네스 만드는 게 재밌더라고요. 거창한 프레임워크를 새로 짜는 건 아니고, __여러 유명한 하네스와 좋은 로직들을 짬뽕해서__ 제 개발 환경과 작업 방식에 맞게 다듬는 일이에요.",
            },
            {
                type: "paragraph",
                content:
                    "남이 만든 걸 그대로 쓰는 게 아니라, 제 손에 맞는 도구를 조금씩 쌓아 올리는 거라 __나만의 자산을 만든다__는 느낌이 듭니다. 그 감각이 좋아서 자꾸 만지게 돼요.",
            },
            { type: "heading", content: "그대로 안 쓰고 직접 만드는 이유" },
            {
                type: "paragraph",
                content:
                    "기성 하네스를 그대로 가져오면, 꼭 제 작업 흐름과 어긋나는 지점이 생기더라고요. 1인 개발이라 역할을 자주 바꿔야 하고, 외주와 자체 프로젝트가 섞여 있고, 쓰는 스택도 정해져 있으니까요. 그래서 좋은 아이디어만 골라 와서 __제 환경에 맞게 조립__합니다. 그러면 확실히 손에 붙습니다.",
            },
            {
                type: "image",
                src: "/harness-demo.webp",
                alt: "sj-company 하네스가 PM, Tech Lead, 병렬 에이전트, QA를 거쳐 작업을 수행하는 터미널 화면",
                width: 2000,
                height: 1080,
                caption:
                    "명령 한 줄이면 PM이 복잡도를 판단하고, Tech Lead가 전문 에이전트를 병렬로 디스패치한 뒤, 독립 QA까지 돌아갑니다.",
            },
            {
                type: "paragraph",
                content:
                    '위 화면처럼 "/sj-company 로그인 기능 만들어줘" 한 줄이면, 기획부터 검증까지 한 흐름으로 굴러갑니다. 이 흐름을 처음부터 제가 발명한 건 아니고, 여러 하네스에서 좋은 부분을 가져와 엮은 거예요.',
            },
            { type: "heading", content: "무엇을 참고했나" },
            {
                type: "list",
                items: [
                    "__Karpathy 하네스__ — 컨텍스트를 최소화하고 태스크를 작게 쪼개는 방식. 실력보다 루프 속도가 이긴다는 관점이 좋아서, 짧은 루프와 명확한 목표 설정을 가져왔습니다.",
                    "__gstack__ — 멀티에이전트 오케스트레이션의 실전 구현. 에이전트들이 채널로 소통하고 Tech Lead가 병렬 디스패치·수렴을 조율하는 구조를, 혼자서도 팀처럼 일하려고 채택했습니다.",
                    "__Hermes (Nous Research)__ — 컨텍스트를 지우지 않고 archive만 하는 불변식. 세션이 끊겨도 과거 결정과 학습을 잃지 않으려고 메모리/컨텍스트 누적 방식을 빌려왔습니다.",
                    "__Claude Code의 서브에이전트·스킬 구조__ — 역할별 서브에이전트와 슬래시 스킬로 의도를 라우팅하는 방식. 매번 직접 지시하는 대신 적절한 전문가를 부르려고 참고했습니다.",
                ],
            },
            { type: "heading", content: "지금 갖춰진 스킬들" },
            {
                type: "paragraph",
                content:
                    "이렇게 모은 아이디어를 제 작업에 맞는 스킬들로 정리해 두었습니다. 의도를 입력하면 그에 맞는 역할이 움직이는 식이에요.",
            },
            {
                type: "list",
                items: [
                    "__/sj-company__ — 태스크 크기를 판단해 적절한 흐름으로 오케스트레이션",
                    "__/sj-pm__ — 요구사항·리스크·우선순위 정리",
                    "__/sj-tech-lead__ — 전문 개발 서브에이전트를 병렬로 디스패치하고 리뷰까지 집계",
                    "__전문 서브에이전트__ — frontend · backend · database · devops · security · data · SI 문서",
                    "__/sj-qa__ — 구현자 산출물을 보지 않고 독립적으로 검증",
                    "__/sj-design__ — 시안 여러 개를 먼저 보여주고 방향을 고른 뒤 구현",
                    "__/sj-loop__ — 반복 작업을 정지 조건이 있는 루프로 설계",
                    "__/pw-loop__ — Playwright로 기능 단위 테스트를 반복",
                ],
            },
            {
                type: "paragraph",
                content:
                    "아직 완성이라고 할 단계는 아니고, 작업하다 불편한 게 보이면 그때그때 고치고 더합니다. 그렇게 쌓인 게 결국 제 작업 방식 그 자체가 되는 것 같아서, 당분간은 계속 만지게 될 것 같아요.",
            },
        ],
    },
    {
        slug: "hello-im-songseungju",
        category: "소개",
        title: "블로그를 시작하며",
        date: "2026. 6. 17.",
        readTime: "3분",
        excerpt:
            "AI와 AI 에이전트를 만들며 배운 것들을 정리하려고 블로그를 시작합니다. 첫 글에서는 그동안 해온 일과 앞으로 쓸 글에 대해 적어 둡니다.",
        tags: ["소개", "AI에이전트", "개발", "기록"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "송승주입니다. AI와 AI 에이전트를 만들고, 그 과정에서 알게 된 것들을 정리하려고 이 블로그를 시작합니다. 첫 글에서는 그동안 어떤 일을 해왔는지, 그리고 앞으로 어떤 글을 쓸지 적어 둡니다.",
            },
            { type: "heading", content: "걸어온 길" },
            {
                type: "paragraph",
                content:
                    "개발은 외주 프로젝트로 시작했습니다. 여러 도메인의 클라이언트와 일하며 요구사항을 코드로 옮기고, 기획부터 배포까지 혼자 책임지는 과정을 익혔습니다.",
            },
            {
                type: "paragraph",
                content:
                    "이후 자체 프로젝트도 여럿 진행했습니다. 직접 정한 문제를 제품으로 만들면서, 주어진 일을 처리하는 것과 끝까지 끌고 가는 것의 차이를 배웠습니다.",
            },
            {
                type: "paragraph",
                content:
                    "지금은 대기업에서 AI 에이전트를 개발하고 있습니다. 실제 업무에 에이전트를 적용하는 과정에서 데모와 현장의 거리를 자주 확인합니다. 잘 만든 데모와 실제로 동작하는 시스템은 다른 문제입니다.",
            },
            { type: "heading", content: "앞으로 다룰 것" },
            {
                type: "paragraph",
                content:
                    "이 블로그에는 AI 에이전트와 AI를 직접 다루며 경험하고 공부한 내용을 정리합니다. 잘된 부분뿐 아니라 막혔던 지점도 가능한 한 그대로 적으려 합니다.",
            },
            {
                type: "list",
                items: [
                    "에이전트를 실무에 적용하며 겪은 시행착오",
                    "AI 관련해 새로 공부하고 정리한 내용",
                    "외주·자체 프로젝트·1인 개발에서 얻은 경험",
                    "현장에서 통한 방법과 그렇지 않은 방법",
                ],
            },
            { type: "heading", content: "연락" },
            {
                type: "paragraph",
                content:
                    "글에 대해 궁금한 점이나 의견이 있으면 댓글이나 메일(farchicken00@naver.com)로 남겨 주세요. 꾸준히 기록하겠습니다.",
            },
        ],
    },
]

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug)
}

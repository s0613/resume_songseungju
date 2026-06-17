// 송승주의 AI 블로그 — 전용 콘텐츠 데이터
// 이력서의 S-Skills 인사이트와는 분리된, 친근한 톤의 개인 블로그 글 모음입니다.

export type BlogBlock =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "quote"; content: string; author?: string }
    | { type: "list"; items: string[] }
    | { type: "tip"; title: string; content: string }
    | { type: "figure"; emoji: string; caption?: string }

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
    { name: "전체보기", slug: "all", count: 1 },
    { name: "소개", slug: "intro", count: 1 },
    { name: "에이전트 경험", slug: "experience", count: 0 },
    { name: "AI 학습노트", slug: "learning", count: 0 },
    { name: "인사이트", slug: "insight", count: 0 },
]

export const posts: BlogPost[] = [
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

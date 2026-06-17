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
    { name: "전체보기", slug: "all", count: 0 },
    { name: "에이전트 경험", slug: "experience", count: 0 },
    { name: "AI 학습노트", slug: "learning", count: 0 },
    { name: "인사이트", slug: "insight", count: 0 },
]

export const posts: BlogPost[] = []

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug)
}

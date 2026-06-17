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
        title: "블로그를 시작하며 — 안녕하세요, 송승주입니다",
        date: "2026. 6. 17.",
        readTime: "4분",
        excerpt:
            "AI와 AI 에이전트를 만들고, 거기서 배운 것들을 기록하려고 이 블로그를 열었습니다. 첫 글이니 제가 걸어온 길과 앞으로 나눌 이야기를 짧게 소개할게요.",
        tags: ["자기소개", "AI에이전트", "개발일기", "첫글"],
        blocks: [
            {
                type: "paragraph",
                content:
                    "안녕하세요, __송승주__입니다. AI와 AI 에이전트를 만들고, 그 과정에서 배운 것들을 차곡차곡 기록하려고 이 블로그를 열었어요. 첫 글이니 거창한 내용보다, 제가 어떤 사람이고 앞으로 이곳에 어떤 이야기를 담을지 가볍게 소개해 보겠습니다.",
            },
            { type: "heading", content: "어떤 길을 걸어왔나" },
            {
                type: "paragraph",
                content:
                    "저는 __외주 프로젝트__로 개발을 시작했어요. 여러 도메인의 클라이언트와 일하면서 요구사항을 코드로 옮기고, 기획부터 배포까지 혼자 책임지는 법을 배웠습니다. '돌아가는 것'을 넘어 '실제로 쓰이는 것'을 만드는 감각은 이때 익혔습니다.",
            },
            {
                type: "paragraph",
                content:
                    "그 경험을 바탕으로 __자체 프로젝트__도 여럿 만들었어요. 남의 요구사항이 아니라 제 아이디어를 직접 제품으로 만들어 보면서, 외주와는 또 다른 '내 것을 끝까지 끌고 가는' 근육을 길렀습니다. 실패도 있었고, 그만큼 배운 것도 많았어요.",
            },
            {
                type: "paragraph",
                content:
                    "그리고 지금은 __대기업에서 AI 에이전트를 개발__하고 있습니다. 실제 업무 현장에 에이전트를 투입하면서 데모와 현실 사이의 간극을 매일 마주하고 있어요. 멋진 데모를 만드는 것과 현장에서 진짜로 일하는 에이전트를 만드는 것은 완전히 다른 일이더라고요. 어렵지만, 그래서 더 재미있습니다.",
            },
            { type: "heading", content: "이 블로그에서 다룰 이야기" },
            {
                type: "paragraph",
                content:
                    "앞으로 이곳에는 __AI 에이전트와 AI에 대해 직접 경험하고 공부한 것__들을 솔직하게 풀어볼 생각이에요. 잘된 것뿐 아니라 헤맨 것까지, 가능한 한 있는 그대로 적으려 합니다.",
            },
            {
                type: "list",
                items: [
                    "에이전트를 실제 업무에 붙이며 겪은 시행착오",
                    "AI 관련해서 새로 배우고 정리한 것들",
                    "외주·자체 프로젝트·1인 개발에서 얻은 노하우",
                    "현장에서 통한 것과 통하지 않은 것",
                ],
            },
            { type: "heading", content: "편하게 소통해요" },
            {
                type: "paragraph",
                content:
                    "혼자 쓰는 일기보다, 같이 이야기 나누는 공간이면 좋겠어요. 글을 읽다가 __궁금한 점이나 나누고 싶은 생각__이 있으면 언제든 댓글을 남기거나 메일(farchicken00@naver.com)로 연락 주세요. 천천히, 그리고 꾸준히 찾아오겠습니다. 잘 부탁드려요.",
            },
        ],
    },
]

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug)
}

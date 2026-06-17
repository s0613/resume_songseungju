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
    emoji: string // 목록 썸네일용 이모지
    excerpt: string
    tags: string[]
    likes: number
    comments: number
    blocks: BlogBlock[]
}

export interface BlogProfile {
    nickname: string
    handle: string
    intro: string
    emoji: string
    neighbors: number
    todayVisitors: number
    totalVisitors: number
    links: { label: string; href: string }[]
}

export const blogProfile: BlogProfile = {
    nickname: "승주",
    handle: "songseungju",
    intro: "AI랑 에이전트한테 일 시키는 1인 개발자예요. 오늘도 터미널이랑 대화 중 🤖",
    emoji: "🦊",
    neighbors: 1284,
    todayVisitors: 137,
    totalVisitors: 92418,
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
    { name: "전체보기", slug: "all", count: 3 },
    { name: "에이전트 경험", slug: "experience", count: 1 },
    { name: "AI 학습노트", slug: "learning", count: 1 },
    { name: "인사이트", slug: "insight", count: 1 },
]

export const posts: BlogPost[] = [
    {
        slug: "first-month-with-agents",
        category: "에이전트 경험",
        title: "AI 에이전트한테 진짜 일을 시켜봤습니다 — 첫 한 달 후기",
        date: "2026. 6. 14.",
        readTime: "6분",
        emoji: "🤖",
        excerpt:
            "\"에이전트가 알아서 코드 짜준다\"는 말, 반신반의했거든요. 한 달 동안 실제 프로젝트에 붙여보니 환상도 깨지고 진짜 쓸모도 보였어요. 솔직한 후기 남깁니다.",
        tags: ["AI에이전트", "클로드코드", "1인개발", "후기"],
        likes: 213,
        comments: 41,
        blocks: [
            {
                type: "paragraph",
                content:
                    "안녕하세요, 승주예요 🙌 요즘 제 일상의 절반은 터미널 앞에서 에이전트랑 대화하는 거예요. 처음엔 저도 \"에이전트가 알아서 다 해준다고? 에이~ 설마\" 했거든요. 그런데 한 달 동안 실제 프로젝트에 제대로 붙여봤더니, __환상이 깨지는 부분__도 있고 __진짜 쓸모 있는 부분__도 확실히 보이더라고요. 오늘은 그 솔직한 후기를 남겨볼게요.",
            },
            { type: "heading", content: "1. 기대 vs 현실" },
            {
                type: "paragraph",
                content:
                    "처음 일주일은 솔직히 좀 실망했어요. \"로그인 기능 만들어줘\" 한 마디 던지면 뚝딱 나올 줄 알았는데, 막상 받아보면 제가 원하던 거랑 미묘하게 다른 거예요. 그런데 이게 에이전트가 못해서가 아니라, __제가 설명을 대충 했기 때문__이더라고요.",
            },
            {
                type: "quote",
                content:
                    "에이전트는 마법사가 아니라, 엄청 빠르고 성실한 신입이에요. 잘 알려주면 잘하고, 대충 알려주면 대충 합니다.",
                author: "한 달 써보고 내린 결론",
            },
            { type: "heading", content: "2. 진짜 달라진 순간" },
            {
                type: "paragraph",
                content:
                    "전환점은 제가 일을 __쪼개서 시키기 시작한 때__였어요. 통으로 던지지 않고 \"먼저 DB 스키마부터\", \"그다음 API\", \"이제 화면\" 이렇게 단계로 나누니까 결과물이 확 좋아지더라고요. 혼자 개발할 때 머릿속으로만 하던 설계 과정을 말로 꺼내놓는 느낌이었어요.",
            },
            {
                type: "figure",
                emoji: "🧩",
                caption: "큰 일을 작은 조각으로 — 에이전트랑 일할 때 제일 중요한 습관이에요",
            },
            {
                type: "tip",
                title: "오늘의 팁 💡",
                content:
                    "에이전트가 자꾸 엉뚱한 걸 만든다면, 에이전트 탓하기 전에 내 요청이 한 문장으로 명확한지 먼저 봐주세요. 십중팔구 제 설명이 모호했더라고요.",
            },
            { type: "heading", content: "3. 한 달 뒤, 솔직한 점수" },
            {
                type: "list",
                items: [
                    "반복 작업(보일러플레이트, 테스트 코드): ⭐⭐⭐⭐⭐ — 여기서 시간 진짜 많이 아꼈어요",
                    "처음 보는 라이브러리 붙이기: ⭐⭐⭐⭐ — 문서 읽는 시간이 확 줄었어요",
                    "복잡한 도메인 설계: ⭐⭐⭐ — 같이 고민하는 파트너 정도, 최종 결정은 제 몫",
                    "\"알아서 다 해줘\": ⭐ — 이건 아직 환상이에요 😅",
                ],
            },
            {
                type: "paragraph",
                content:
                    "정리하면, 에이전트는 __나를 대체하는 도구가 아니라 나를 증폭시키는 도구__였어요. 혼자인데 팀이 생긴 느낌? 다음 글에서는 한 달 동안 제가 정리한 \"에이전트랑 일 잘하는 법\"을 학습노트로 풀어볼게요. 공감 ❤️ 눌러주시면 힘납니다!",
            },
        ],
    },
    {
        slug: "five-things-working-with-claude-code",
        category: "AI 학습노트",
        title: "클로드 코드랑 일하면서 배운 5가지",
        date: "2026. 6. 16.",
        readTime: "7분",
        emoji: "📓",
        excerpt:
            "삽질도 많이 했고 그만큼 배운 것도 많았어요. 에이전트랑 협업하면서 \"아 이건 진짜 알아두면 좋겠다\" 싶었던 5가지를 정리했습니다.",
        tags: ["클로드코드", "AI학습", "생산성", "개발팁"],
        likes: 156,
        comments: 28,
        blocks: [
            {
                type: "paragraph",
                content:
                    "지난 글에서 에이전트 한 달 후기를 남겼더니 \"구체적으로 뭘 어떻게 해야 잘 쓰는 거냐\"는 댓글이 많았어요 😄 그래서 오늘은 제가 직접 부딪히면서 배운 __5가지__를 학습노트로 정리해봤습니다. 거창한 이론 말고, 진짜 써먹는 것들로요.",
            },
            { type: "heading", content: "① 맥락은 짧게, 목표는 명확하게" },
            {
                type: "paragraph",
                content:
                    "에이전트한테 배경 설명을 길게 늘어놓을수록 오히려 헷갈려 하더라고요. 핵심 맥락만 주고 __\"무엇을 해야 하는지\"__를 또렷하게 말하는 게 훨씬 나았어요. 사람한테 일 부탁할 때랑 똑같죠?",
            },
            { type: "heading", content: "② 검증 기준을 먼저 정한다" },
            {
                type: "paragraph",
                content:
                    "\"이거 만들어줘\"보다 \"이 테스트를 통과하게 만들어줘\"가 백배 낫더라고요. 성공의 기준을 미리 정해두면 에이전트가 알아서 거기까지 도달할 때까지 반복하거든요. 이게 제일 큰 깨달음이었어요.",
            },
            {
                type: "tip",
                title: "이렇게 바꿔보세요 ✏️",
                content:
                    "❌ \"입력값 검증 추가해줘\"  →  ⭕ \"잘못된 입력에 대한 테스트를 먼저 쓰고, 그 테스트를 통과시켜줘\"",
            },
            { type: "heading", content: "③ 한 번에 하나씩" },
            {
                type: "paragraph",
                content:
                    "욕심내서 다섯 가지를 한꺼번에 시키면 꼭 하나가 어긋나요. 그러면 어디서 틀렸는지 찾느라 더 오래 걸려요. __작게 시키고, 확인하고, 다음으로__ — 이 리듬이 결국 제일 빨랐습니다.",
            },
            { type: "heading", content: "④ 틀렸을 땐 고치라고 하지 말고, 같이 디버깅" },
            {
                type: "paragraph",
                content:
                    "버그가 나면 \"고쳐줘\"라고만 하지 않고, \"이 증상이 왜 나는지 먼저 가설을 세워보자\"고 해요. 그러면 무작정 코드를 바꾸는 대신 원인을 찾아가더라고요. 사람이랑 페어 프로그래밍 하는 느낌이에요.",
            },
            { type: "heading", content: "⑤ 기록을 남기게 한다" },
            {
                type: "paragraph",
                content:
                    "세션이 끊기면 에이전트는 다 까먹어요. 그래서 중요한 결정이나 배운 점은 __문서로 남기게__ 시켜요. 다음에 다시 켰을 때 그 파일부터 읽으면 어제의 나(와 에이전트)랑 이어서 일할 수 있거든요.",
            },
            {
                type: "quote",
                content:
                    "결국 에이전트랑 잘 일하는 법은, 좋은 동료랑 잘 일하는 법이랑 똑같았어요.",
            },
            {
                type: "list",
                items: [
                    "맥락은 짧게, 목표는 명확하게",
                    "검증 기준을 먼저 정한다",
                    "한 번에 하나씩",
                    "고치라고 하지 말고 같이 디버깅",
                    "기록을 남기게 한다",
                ],
            },
            {
                type: "paragraph",
                content:
                    "다섯 줄로 요약하면 이렇게 되네요. 여러분만의 노하우도 댓글로 공유해주세요 — 저도 배우고 싶어요! 🙇",
            },
        ],
    },
    {
        slug: "why-just-do-it-doesnt-work",
        category: "인사이트",
        title: "에이전트한테 \"알아서 해줘\"는 왜 안 통할까",
        date: "2026. 6. 17.",
        readTime: "5분",
        emoji: "💭",
        excerpt:
            "사람한테는 통하는 \"알아서 잘\"이 에이전트한테는 왜 안 통할까요? 한참 고민하다가 나름의 답을 찾았어요. 짧게 풀어봅니다.",
        tags: ["AI인사이트", "에이전트설계", "생각정리"],
        likes: 98,
        comments: 19,
        blocks: [
            {
                type: "paragraph",
                content:
                    "요즘 제일 많이 한 고민이에요. 분명 똑똑한 에이전트인데, \"이거 알아서 잘 해줘\"라고 하면 꼭 산으로 가더라고요 🏔️ 사람 동료한테는 통하는 말인데 말이죠. 왜 그럴까 한참 생각하다가 나름의 답을 찾아서 적어봐요.",
            },
            { type: "heading", content: "\"알아서\"의 정체" },
            {
                type: "paragraph",
                content:
                    "사람한테 \"알아서 해줘\"가 통하는 건, 우리가 __같은 맥락을 공유__하고 있어서예요. 회사 분위기, 지난번 회의, 고객 성향 같은 걸 둘 다 알고 있으니까 짧게 말해도 통하죠. 그런데 에이전트는 그 공유된 맥락이 거의 없어요. \"알아서\"라는 말 안에 들어있는 수많은 암묵적 전제를 모르는 거죠.",
            },
            {
                type: "quote",
                content:
                    "\"알아서 해줘\"는 사실 명령이 아니라, 상대가 내 머릿속을 읽어주길 바라는 기대예요.",
            },
            { type: "heading", content: "그래서 제가 바꾼 것" },
            {
                type: "paragraph",
                content:
                    "암묵적인 걸 __명시적으로 꺼내놓기__ 시작했어요. 머릿속에만 있던 \"당연히 이래야지\"를 한 줄씩 글로 적는 거예요. 처음엔 귀찮았는데, 신기하게도 이 과정에서 __제 생각도 더 또렷해지더라고요.__ 에이전트한테 설명하려다 보니 제가 사실 대충 생각하고 있었다는 걸 알게 됐어요.",
            },
            {
                type: "figure",
                emoji: "🔦",
                caption: "머릿속 어둠 속의 전제들을 하나씩 비춰주는 작업 — 결국 나를 위한 일이었어요",
            },
            {
                type: "tip",
                title: "오늘의 생각 🌱",
                content:
                    "에이전트를 잘 쓰는 일은 결국 \"내가 무엇을 원하는지 명확히 아는 일\"이더라고요. 도구가 사람을 더 또렷하게 만드는 경험, 꽤 신선했어요.",
            },
            {
                type: "paragraph",
                content:
                    "그래서 요즘은 \"알아서 해줘\" 대신 \"이런 기준으로, 이 순서대로, 이렇게 확인하면서 해줘\"라고 말해요. 길어 보이지만 결과적으로 훨씬 빨라요. 그리고 이건 에이전트뿐 아니라 사람이랑 일할 때도 똑같이 좋더라고요 😊",
            },
            {
                type: "paragraph",
                content:
                    "오늘 글은 여기까지! 읽어주셔서 감사하고, 공감과 이웃추가는 큰 힘이 됩니다 💚 다음엔 또 새로운 삽질기로 찾아올게요.",
            },
        ],
    },
]

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug)
}

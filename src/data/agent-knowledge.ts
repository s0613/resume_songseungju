// 송승주 에이전트(사이트 챗봇)의 지식 베이스.
// 사이트에 이미 공개된 정보만 담는다 — 이력 요약·포트폴리오·블로그 글 전문.
import { posts, type BlogBlock } from "@/data/blog"
import { portfolioProjects } from "@/data/portfolio"

const BIO = `
## 송승주 프로필
- AI 에이전트 빌더 · 풀스택 개발자 (Seoul, Korea) · 컴퓨터공학 전공
- 한 줄 소개: AI 에이전트가 함께 일하는 시스템을 설계하고 제품으로 출시합니다.
- 작업 방식: 작업을 사람이 전부 처리하는 대신, 역할을 나눈 AI 에이전트가 이어받아 처리하도록 설계합니다.
- 대표작(둘 다 오픈소스): S-Skills(Claude Code 역할 기반 멀티 에이전트 하네스 — PM·디자인·개발·QA 역할, 독립 QA 검증, 옵시디언 장기 기억), open-trader(LLM 트레이딩 하네스)
- 에이전트 이전에 제품을 끝까지 만들어 본 경험: 기획부터 배포까지 혼자 수행. 의료·물류·뷰티·커머스 등 도메인 경험.
- 기술 스택 — Frontend: Next.js, TypeScript, React, Tailwind CSS / Backend: Spring Boot, Django, Node.js, MariaDB·MySQL·PostgreSQL / DevOps: AWS EC2·S3·RDS, CloudFront, Nginx, Docker / Tools: Git·GitHub, Figma, Postman, Claude Code, Cursor AI
- 수상·사업화: 예비창업패키지 3회 선정 · 창업지원 단장상 Launch Pad 최우수상(Trynic) · 제13회 아랩 액셀러레이팅 최우수상(Trynic) · Moong 커넥톤 우수상(Trynic) · 아이로드 글로벌 해커톤 대상(Totaload, 한국자동차산업수출협동조합)
- 연락처: farchicken00@naver.com · github.com/s0613 · LinkedIn(승주 송)
- 웹사이트: https://www.songseungju.dev (이력서 메인 · /blog 블로그 · /s-skills · /open-trader)
`.trim()

function blockToText(block: BlogBlock): string | null {
    switch (block.type) {
        case "paragraph":
            return block.content
        case "heading":
            return `### ${block.content}`
        case "quote":
            return `> ${block.content}${block.author ? ` — ${block.author}` : ""}`
        case "list":
            return block.items.map((item) => `- ${item}`).join("\n")
        case "tip":
            return `팁 · ${block.title}: ${block.content}`
        case "code":
            return block.caption ? `(코드 예시: ${block.caption})` : null
        default:
            return null
    }
}

/** 시스템 프롬프트에 넣을 지식 텍스트를 만든다. 모듈 로드 시 1회 계산되어 재사용된다. */
function build(): string {
    const portfolio = portfolioProjects
        .map((p) => `- ${p.name} (${p.date}): ${p.description} [${p.tags.join(", ")}]`)
        .join("\n")

    const blog = posts
        .map((post) => {
            const body = post.blocks
                .map(blockToText)
                .filter(Boolean)
                .join("\n")
            return `## 블로그 글: ${post.title}\n- URL: /blog/${post.slug}\n- 카테고리: ${post.category} · 작성일: ${post.date}\n- 요약: ${post.excerpt}\n${body}`
        })
        .join("\n\n")

    return `${BIO}\n\n## 포트폴리오 프로젝트 (12개)\n${portfolio}\n\n# 블로그 전체 글\n${blog}`
}

export const agentKnowledge = build()

import type React from "react"
import type { Metadata } from "next"

const TITLE = "승주의 AI 블로그"
const DESCRIPTION =
    "AI 에이전트 빌더 송승주가 AI와 AI 에이전트에 대한 인사이트·경험·학습을 친근하게 나누는 블로그입니다. 1인 개발자가 에이전트랑 일하며 배운 것들을 기록합니다."

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/blog" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "/blog",
        type: "website",
        images: ["/opengraph-image"],
    },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

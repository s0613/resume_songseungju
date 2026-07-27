import type React from "react"
import type { Metadata } from "next"

const TITLE = "S-Skills — Claude Code 멀티 에이전트 하네스"
const DESCRIPTION =
    "혼자 일하는 개발자를 위한 Claude Code 역할 기반 AI 개발 오케스트레이터. PM·디자인·개발·QA가 하나의 작업을 이어받아 처리하는 오픈소스 하네스입니다."
const URL = "/s-skills"

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: URL,
        type: "website",
    },
}

export default function SSkillsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

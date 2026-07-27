import type React from "react"
import type { Metadata } from "next"

const TITLE = "open-trader — LLM 트레이딩 하네스"
const DESCRIPTION =
    "증권사 OpenAPI 문서만 넣으면 Claude가 브로커 어댑터를 자동 생성·검증해 연결하고, 자연어 전략을 페이퍼 트레이딩으로 돌리는 오픈소스 LLM-in-the-loop 트레이딩 하네스입니다."
const URL = "/open-trader"

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

export default function OpenTraderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

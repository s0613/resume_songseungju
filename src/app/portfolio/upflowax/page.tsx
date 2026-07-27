import type { Metadata } from "next"
import UpflowAxPage from "@/portfolio/UpflowAxPage"

const TITLE = "Upflow AX | Portfolio"
const DESCRIPTION = "SI 사업 전 주기 관리 플랫폼 — 제안부터 정산까지 하나의 워크스페이스"
const URL = "/portfolio/upflowax"

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

export default function Page() {
    return <UpflowAxPage />
}

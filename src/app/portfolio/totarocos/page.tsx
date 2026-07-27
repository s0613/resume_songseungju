import type { Metadata } from "next"
import TotaroCosPage from "@/portfolio/TotaroCosPage"
import { buildPortfolioMetadata } from "@/data/portfolio"

export const metadata: Metadata = buildPortfolioMetadata("totarocos")

export default function Page() {
    return <TotaroCosPage />
}

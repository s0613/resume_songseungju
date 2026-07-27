import type { Metadata } from "next"
import TotaroWebPage from "@/portfolio/TotaroWebPage"
import { buildPortfolioMetadata } from "@/data/portfolio"

export const metadata: Metadata = buildPortfolioMetadata("totaroweb")

export default function Page() {
    return <TotaroWebPage />
}

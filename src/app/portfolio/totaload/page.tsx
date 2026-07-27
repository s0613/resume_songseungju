import type { Metadata } from "next"
import TotaloadPage from '@/portfolio/TotaloadPage'
import { buildPortfolioMetadata } from "@/data/portfolio"

export const metadata: Metadata = buildPortfolioMetadata("totaload")

export default function Page() {
  return <TotaloadPage />
}

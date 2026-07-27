import type { Metadata } from "next";
import RunningToYouPage from "@/portfolio/RunningToYouPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("runningtoyou")

export default function PortfolioRunningToYouPage() {
    return <RunningToYouPage />;
}
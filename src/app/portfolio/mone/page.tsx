import type { Metadata } from "next";
import MonePage from "@/portfolio/MonePage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("mone")

export default function Mone() {
    return <MonePage />;
}

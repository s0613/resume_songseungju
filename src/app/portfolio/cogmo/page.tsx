import type { Metadata } from "next";
import CogmoPage from "@/portfolio/CogmoPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("cogmo")

export default function Cogmo() {
    return <CogmoPage />;
}

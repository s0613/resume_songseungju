import type { Metadata } from "next";
import TrynicPage from "@/portfolio/TrynicPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("trynic")

export default function Trynic() {
    return <TrynicPage />;
}
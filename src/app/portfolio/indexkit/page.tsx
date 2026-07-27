import type { Metadata } from "next";
import IndexKitPage from "@/portfolio/IndexKitPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("indexkit")

export default function IndexKit() {
    return <IndexKitPage />;
}

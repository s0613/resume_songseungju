import type { Metadata } from "next";
import CurlCodePage from "@/portfolio/CurlCodePage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("curlcode")

export default function CurlCode() {
    return <CurlCodePage />;
}

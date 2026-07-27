import type { Metadata } from "next";
import MediVuPage from "@/portfolio/MedivuPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("medivu")

export default function PortfolioMedivuPage() {
    return <MediVuPage />;
}
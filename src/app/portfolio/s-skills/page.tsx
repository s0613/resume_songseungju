import type { Metadata } from "next";
import SSkillsPage from "@/portfolio/SSkillsPage";
import { buildPortfolioMetadata } from "@/data/portfolio";

export const metadata: Metadata = buildPortfolioMetadata("s-skills")

export default function SSkills() {
    return <SSkillsPage />;
}

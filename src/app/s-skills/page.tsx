import { HeroSection } from "@/components/s-skills/HeroSection";
import { AboutSection } from "@/components/s-skills/AboutSection";
import { SkillsSection } from "@/components/s-skills/SkillsSection";
import { PipelineSection } from "@/components/s-skills/PipelineSection";
import { InstallSection } from "@/components/s-skills/InstallSection";

export default function SSkillsPage() {
  return (
    <div className="s-skills-page bg-black min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PipelineSection />
      <InstallSection />
    </div>
  );
}

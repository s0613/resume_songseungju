import { HeroSection } from "@/components/s-skills/HeroSection";
import { AboutSection } from "@/components/s-skills/AboutSection";
import { SkillsSection } from "@/components/s-skills/SkillsSection";
import { PhilosophySection } from "@/components/s-skills/PhilosophySection";
import { PipelineSection } from "@/components/s-skills/PipelineSection";
import { InstallSection } from "@/components/s-skills/InstallSection";

export default function SSkillsPage() {
  return (
    <div className="s-skills-page min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PhilosophySection />
      <PipelineSection />
      <InstallSection />
    </div>
  );
}

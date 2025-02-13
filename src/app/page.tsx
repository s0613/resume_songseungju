import React from 'react';
import HeroSection from '@/components/main/HeroSection';
import Introduce from '@/components/main/Introduce';
import Skill from '@/components/main/Skill';
import Experience from '@/components/main/ExperienceAndProject';
import Education from '@/components/main/Education';
import Etc from '@/components/main/Etc';
const Page: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Introduce />
      <Skill />
      <Experience />
      <Education />
      <Etc />
    </div>
  );
};

export default Page;
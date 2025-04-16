import React from 'react';
import HeroSection from '@/main/HeroSection';
import Introduce from '@/main/Introduce';
import Skill from '@/main/Skill';
import Experience from '@/main/ExperienceAndProject';
import Education from '@/main/Education';
import Etc from '@/main/Etc';
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
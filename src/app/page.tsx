import React from 'react';
import HeroSection from '../components/main/HeroSection';
import Introduce from '@/components/main/Introduce';
const Page: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Introduce />
    </div>
  );
};

export default Page;
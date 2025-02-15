// components/main/HeroSection.tsx
"use client";

import Image from "next/image";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section
      id="heroSection"
      className="flex flex-col pt-16 md:pt-28 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      {/* 이미지와 개인정보가 하나의 묶음 */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* 프로필 사진 */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 overflow-hidden rounded-full">
          <Image
            src="/IM.png"
            alt="Profile Picture"
            width={256}
            height={256}
            className="object-cover"
          />
        </div>
        {/* 개인정보 영역 */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">송승주</h1>
          <p className="text-base sm:text-lg text-gray-700 mb-1 flex items-center justify-center md:justify-start">
            <Image
              src="/mail.svg"
              alt="Mail Icon"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <a
              href="mailto:farchicken00@naver.com"
              className="text-blue-500 hover:underline"
            >
              farchicken00@naver.com
            </a>
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-1 flex items-center justify-center md:justify-start">
            <Image
              src="/github-mark.svg"
              alt="GitHub Icon"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <a
              href="https://github.com/s0613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              github.com/s0613
            </a>
          </p>
          <div className="text-base sm:text-lg text-gray-700 mb-1 flex items-center justify-center md:justify-start">
            <Image
              src="/smartphone-call.svg"
              alt="Phone Icon"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">-</HoverCardTrigger>
              <HoverCardContent>이메일로 연락주세요.</HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-1 flex items-center justify-center md:justify-start">
            <Image
              src="/icons8-linkedin-50.svg"
              alt="LinkedIn Icon"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <a
              href="https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%86%A1-73b41a2a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://www.linkedin.com/송승주/
            </a>
          </p>
        </div>
      </div>
      {/* Alert가 개인정보 바로 아래에 위치 */}
      <div className="mt-8 rounded-lg">
        <Alert>
          <Terminal className="h-4 w-4 mr-2" />
          <div>
            <AlertTitle>UPDATE</AlertTitle>
            <AlertDescription>last updated at 2025-02-12</AlertDescription>
          </div>
        </Alert>
      </div>
    </section>
  );
};

export default HeroSection;

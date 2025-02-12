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
    <section className="flex flex-col bg-gray-100 pt-28 px-32">
      {/* 이미지와 개인정보가 하나의 묶음 */}
      <div className="flex flex-row items-center space-x-8">
        {/* 프로필 사진 */}
        <div className="w-64 h-64 overflow-hidden">
          <Image
            src="/IM.png"
            alt="Profile Picture"
            width={364}
            height={364}
            className="object-cover"
          />
        </div>
        {/* 개인정보 영역 */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-left">송승주</h1>
          <p className="text-lg text-gray-700 mb-1 flex items-center">
            <Image
              src="/mail.svg"
              alt="Mail Icon"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <a
              href="mailto:farchicken00@naver.com"
              className="text-blue-500 hover:underline ml-1"
            >
              farchicken00@naver.com
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-1 flex items-center">
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
              className="text-blue-500 hover:underline ml-1"
            >
              github.com/s0613
            </a>
          </p>
          <div className="text-lg text-gray-700 mb-1 flex items-center">
            <span>Phone: </span>
            <HoverCard>
              <HoverCardTrigger>-</HoverCardTrigger>
              <HoverCardContent>
                이메일로 연락주세요.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
      {/* Alert가 개인정보 바로 아래에 위치 */}
      <div className="mt-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>UPDATE</AlertTitle>
          <AlertDescription>
            last updated at 2025-02-12
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default HeroSection;
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Etc: React.FC = () => {
  return (
    <section id="etc" className="py-5 pt-20 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col space-y-8">
        {/* ETC 제목 */}
        <div>
          <h1 className="text-3xl md:text-4xl mb-4 text-left text-blue-600">
            ETC
          </h1>
        </div>

        {/* 해병대 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                2020.11 ~ 2022.05
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                해병대 복무{" "}
                <Badge variant="outline" className="bg-lime-300">
                  통신병
                </Badge>
              </span>
            </div>
          </div>
          <div className="mt-4 ml-0 md:ml-[25%]">
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>Republic of Korea Marine Corps (해병대)</li>
              <li>강인한 정신력과 팀워크 경험을 바탕으로 협업 능력 강화</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                해병대
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                병장 전역
              </Badge>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* 창업 동아리: 인하벤처 */}
        <div className="px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <span className="text-xl md:text-2xl text-gray-500">
                창업 동아리
              </span>
            </div>
            <div className="md:col-span-3">
              <span className="text-xl md:text-2xl text-black font-bold">
                인하벤처클럽{" "}
                <Badge variant="outline" className="bg-lime-300">
                  28.5기
                </Badge>
              </span>
            </div>
          </div>
          <div className="mt-4 ml-0 md:ml-[25%]">
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 mt-2 space-y-2">
              <li>아이디어 발굴 및 비즈니스 모델 설계</li>
              <li>팀 프로젝트를 통한 실전 창업 경험</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                스타트업
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                비즈니스 모델
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                팀 프로젝트
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Etc;

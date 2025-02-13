"use client";

import React from "react";
import useIsTop from "@/hooks/use-is-top"; // 경로는 실제 프로젝트 구조에 맞게 수정하세요.

const Header: React.FC = () => {
  const isTop = useIsTop();

  return (
    <header className="fixed top-0 left-1/2 w-3/5 z-50 bg-transparent transform -translate-x-1/2">
      {/* 중앙 컨테이너 영역에 효과 적용 */}
      <nav
        className={`
          container mx-auto px-4 py-3 
          flex flex-col items-center justify-center text-center
          transition-all duration-300
          rounded-3xl
          ${
            isTop
              ? "opacity-100 blur-0"
              : "opacity-50 blur-sm hover:opacity-100 hover:blur-0"
          }
          hover:bg-gray-200/60
        `}
      >
        {/* 로고 영역 */}
        <div className="text-lg font-bold text-blue-600">Portfolio</div>

        {/* 메뉴 영역 */}
        <ul className="flex space-x-6 text-[0.7rem] uppercase tracking-wider mt-2 text-gray-700">
          {[
            { name: "SSJ", href: "#heroSection" },
            { name: "Introduce", href: "#introduce" },
            { name: "Skill", href: "#skill" },
            { name: "Expe&proj", href: "#experience" },
            { name: "Education", href: "#education" },
            { name: "ETC", href: "#etc" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-2 py-1 rounded transition-all hover:text-blue-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

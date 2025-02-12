"use client";

import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  // 스크롤이 맨 위인지 여부를 상태로 관리
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="
        fixed top-0 left-1/2 w-3/5 z-50 bg-transparent transform -translate-x-1/2
      "
    >
      {/* 중앙 컨테이너 영역에 효과 적용 */}
      <nav
        className={`
          container mx-auto px-4 py-3 
          flex flex-col items-center justify-center text-center
          transition-all duration-300
          rounded-3xl
          ${
            isTop
              ? // 맨 위: 선명
                "opacity-100 blur-0"
              : // 스크롤 내려가면: 흐릿 -> 호버 시 선명
                "opacity-50 blur-sm hover:opacity-100 hover:blur-0"
          }
          hover:bg-gray-200/60
        `}
      >
        {/* 로고 영역 */}
        <div className="text-lg font-bold text-blue-600">Portfolio</div>

        {/* 메뉴 영역 */}
        <ul className="flex space-x-6 text-[0.7rem] uppercase tracking-wider mt-2 text-gray-700">
          {[
            { name: "Hero", href: "#heroSection" },
            { name: "Introduce", href: "#introduce" },
            { name: "Skill", href: "#skill" },
            { name: "Experience", href: "#experience" },
            { name: "Project", href: "#project" },
            { name: "Education", href: "#education" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="
                  px-2 py-1
                  rounded
                  transition-all
                  hover:text-blue-500
                "
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

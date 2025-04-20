"use client";

import type React from "react";
import { motion } from "framer-motion";
import useIsTop from "@/hooks/use-is-top"; // 경로는 실제 프로젝트 구조에 맞게 수정하세요.
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const isTop = useIsTop();
  const pathname = usePathname();
  const isPortfolioPage = pathname.includes("/portfolio/");

  const menuItems = [
    { name: "SSJ", href: isPortfolioPage ? "/" : "#heroSection" },
    { name: "Introduce", href: isPortfolioPage ? "/#introduce" : "#introduce" },
    { name: "Skill", href: isPortfolioPage ? "/#skill" : "#skill" },
    { name: "Expe&proj", href: isPortfolioPage ? "/#experienceAndProject" : "#experienceAndProject" },
    { name: "Education", href: isPortfolioPage ? "/#education" : "#education" },
    { name: "ETC", href: isPortfolioPage ? "/#etc" : "#etc" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <nav
          className={`
            mx-auto
            transition-all duration-300
            ${isTop
              ? "mt-6 px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-sm"
              : "px-6 py-2 bg-white/90 backdrop-blur-md shadow-sm"
            }
          `}
        >
          <div className="flex items-center justify-between">
            {/* 로고 영역 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`
                text-base font-semibold
                transition-all duration-300
                ${isTop ? "text-gray-800" : "text-gray-600"}
              `}
            >
              <Link href="/" className="hover:text-gray-900">
                Portfolio
              </Link>
            </motion.div>

            {/* 메뉴 영역 */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      px-2 py-1 rounded-lg text-sm
                      transition-all duration-300
                      ${isTop
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

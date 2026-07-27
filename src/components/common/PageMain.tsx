"use client";

import type React from "react";
import { usePathname } from "next/navigation";

// 아래 경로들은 페이지 자체에서 <main>을 렌더링한다(home.module.css·각 module.css 참고).
// 루트에서 또 <main>으로 감싸면 랜드마크가 중첩되므로 이 경로들은 <div>로 감싼다.
const SELF_MAIN_PREFIXES = ["/s-skills", "/blog", "/open-trader"];

const PageMain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const hasOwnMain =
    pathname === "/" || SELF_MAIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // 포트폴리오 상세 등 자체 <main>이 없는 페이지는 여기서 랜드마크를 제공해야 하므로 <main> 유지.
  if (hasOwnMain) {
    return <div id="page-content">{children}</div>;
  }

  return <main>{children}</main>;
};

export default PageMain;

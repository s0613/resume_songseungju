import React from "react";
import Header from "@/components/common/Header";
import './styles/globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>Portfolio</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
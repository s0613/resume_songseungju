import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
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
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
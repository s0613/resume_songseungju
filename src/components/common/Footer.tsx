"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600">
  <p>© 2025 My Portfolio. All rights reserved.</p>
  <p>
    Inspired by <a href="https://resume.yowu.dev/" className="text-blue-500 hover:underline">Yowu&apos;s Resume</a>.
  </p>
</footer>
  );
};

export default Footer;
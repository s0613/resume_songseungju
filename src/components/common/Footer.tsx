"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/s0613",
      icon: Github,
    },
    {
      name: "Email",
      href: "mailto:farchicken00@naver.com",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%86%A1-73b41a2a8/",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="relative py-12 px-4 bg-gradient-to-t from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gray-100 rounded-full opacity-20" />
      <div className="absolute top-10 left-10 w-24 h-24 bg-gray-100 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 송승주의 포트폴리오. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
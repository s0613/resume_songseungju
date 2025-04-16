"use client"

import Image from "next/image"
import type React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Mail, Github, Smartphone, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

const HeroSection: React.FC = () => {
  return (
    <section
      id="heroSection"
      className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-20" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-100 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
        >
          {/* Profile picture with enhanced styling */}
          <div className="relative">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image src="/IM.png" alt="Profile Picture" width={256} height={256} className="object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-800 font-medium text-xs">2025</span>
              </div>
            </div>
          </div>

          {/* Personal information with consistent styling */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 md:flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 tracking-tight">송승주</h1>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Mail className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <a href="mailto:farchicken00@naver.com" className="text-gray-700 hover:text-gray-900 transition-colors">
                  farchicken00@naver.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Github className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <a
                  href="https://github.com/s0613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  github.com/s0613
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Smartphone className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <HoverCard>
                  <HoverCardTrigger className="text-gray-700 cursor-pointer">연락처 보기</HoverCardTrigger>
                  <HoverCardContent className="bg-white border border-gray-100 shadow-md">
                    <p className="text-gray-700">이메일로 연락주세요.</p>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Linkedin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%86%A1-73b41a2a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  linkedin.com/in/송승주
                </a>
              </motion.div>
            </div>

            <div className="mt-8">
              <Alert className="bg-gray-50 border border-gray-200">
                <Terminal className="h-4 w-4 text-gray-500" />
                <div>
                  <AlertTitle className="text-gray-800">UPDATE</AlertTitle>
                  <AlertDescription className="text-gray-600">last updated at 2025-04-16</AlertDescription>
                </div>
              </Alert>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

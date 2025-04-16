"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Cloud, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Skill: React.FC = () => {
  return (
    <section
      id="skill"
      className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-gray-100 rounded-full opacity-20" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-100 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:space-x-12 space-y-8 md:space-y-0">
          {/* Title area with decorative line */}
          <div className="md:w-1/4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">SKILLS</h1>
              <div className="h-1 w-16 bg-gray-800 mt-4 md:mx-0 mx-auto" />
            </motion.div>
          </div>

          {/* Skills content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-3/4 space-y-8"
          >
            {/* Frontend Skills */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Code className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Frontend</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">HTML/CSS</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Database className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Backend</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">MariaDB</Badge>
                    <Badge variant="secondary">MySQL</Badge>
                    <Badge variant="secondary">Django</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DevOps Skills */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Cloud className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold text-gray-800">DevOps</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AWS EC2</Badge>
                    <Badge variant="secondary">AWS S3</Badge>
                    <Badge variant="secondary">CloudFront</Badge>
                    <Badge variant="secondary">Nginx</Badge>
                    <Badge variant="secondary">Docker</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Wrench className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Tools</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">GitHub</Badge>
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">Postman</Badge>
                    <Badge variant="secondary">VS Code</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skill;

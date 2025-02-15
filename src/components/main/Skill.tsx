"use client";

import React from "react";

const Skill: React.FC = () => {
  return (
    <section id="skill" className="py-5 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col space-y-8">
        {/* SKILL 제목 */}
        <div>
          <h1 className="text-3xl md:text-4xl mb-2 text-left text-blue-600">
            SKILL
          </h1>
        </div>

        {/* Languages */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-2xl text-gray-500 md:w-1/4 px-4 md:px-10">
            Languages
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-sm text-gray-800 md:w-3/4">
            <li>Java</li>
            <li>C++</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Python</li>
          </ul>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Frameworks & Libraries */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-2xl text-gray-500 md:w-1/4 px-4 md:px-10">
            Frameworks &amp; Libraries
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-sm text-gray-800 md:w-3/4">
            <li>Spring Boot</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>Express</li>
          </ul>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Infrastructure & Databases */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-2xl text-gray-500 md:w-1/4 px-4 md:px-10">
            Infrastructure &amp; Databases
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-sm text-gray-800 md:w-3/4">
            <li>Docker</li>
            <li>Nginx</li>
            <li>AWS (EC2, S3, RDS)</li>
            <li>MariaDB / MySQL</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Tools & IDEs */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-2xl text-gray-500 md:w-1/4 px-4 md:px-10">
            Tools &amp; IDEs
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-sm text-gray-800 md:w-3/4">
            <li>Visual Studio Code</li>
            <li>Git</li>
            <li>GitHub</li>
          </ul>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Misc */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <h2 className="text-2xl text-gray-500 md:w-1/4 px-4 md:px-10">Misc</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-sm text-gray-800 md:w-3/4">
            <li>Agile, Scrum</li>
            <li>CI/CD</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skill;

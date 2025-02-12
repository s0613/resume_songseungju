"use client";

import React from "react";

const Introduce: React.FC = () => {
  return (
    <section id="introduce" className="flex bg-gray-100 py-20 pb-20 px-32">
      <div className="flex flex-row items-start space-x-8">
        {/* 제목 영역 */}
        <div>
          <h1 className="text-4xl mb-2 text-left text-blue-600">INTRODUCE</h1>
        </div>
        {/* 설명 영역 */}
        <div>
          <p className="text-base text-black">
            안녕하세요! 저는 인하대학교 컴퓨터공학과 4학년에 재학 중인 송승주입니다. 풀스택
            개발자로서 다양한 기술을 활용해 서비스 개발을 경험하며, 스타트업 창업과 취업을 준비하고
            있습니다.
            <br />
            <br />
            Next.js와 TypeScript를 활용한 프론트엔드 개발부터 Spring Boot와 MariaDB를 기반으로 한
            백엔드 개발까지, 웹과 모바일을 아우르는 풀스택 개발을 수행하고 있습니다. 또한 AWS 환경에서
            서버를 운영하며 EC2, S3, RDS 등의 서비스를 활용한 인프라 구축과 최적화 경험을 쌓아왔으며,
            Nginx와 Docker를 활용한 배포 및 서버 운영에도 익숙합니다.
            현재 창업을 목표로 다양한 프로젝트를 진행하면서, 실제 사용자 피드백을 바탕으로 서비스를
            개선하고 운영하는 경험을 쌓고 있습니다.
            <br />
            <br />
            새로운 기술을 빠르게 습득하고 적용하는 것을 즐기며, 무엇보다 사용자 경험을 최우선으로 하는
            개발을 지향합니다.
            기술과 서비스를 통해 더 많은 사람들이 의미 있는 경험을 할 수 있도록 만드는 것이 저의 목표입니다.
            함께 성장하고 도전할 수 있는 좋은 기회를 찾고 있으며, 다양한 협업을 기대하고 있습니다.
            <br />
            <br />
            감사합니다! :)
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduce;
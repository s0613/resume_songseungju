#!/bin/bash
set -e

echo "> after-install.sh 실행" | tee -a /home/ec2-user/deploy.log

cd /home/ec2-user/resume_songseungju

# 소유권 변경 (EC2에서 실행할 수 있도록)
sudo chown -R ec2-user:ec2-user /home/ec2-user/resume_songseungju

# 종속성 설치
npm install

# Next.js 앱 빌드
npm run build

# PM2로 재시작
pm2 restart resume_songseungju || pm2 start npm --name "resume_songseungju" -- start

# PM2 실행 상태 확인
pm2 save
pm2 list

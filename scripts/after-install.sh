#!/bin/bash
set -e

echo "> AfterInstall 실행" | tee -a /home/ec2-user/deploy.log

cd /home/ec2-user/resume_songseungju

# PM2 설치 확인
if ! command -v pm2 &> /dev/null
then
    echo "> PM2 설치" | tee -a /home/ec2-user/deploy.log
    sudo npm install -g pm2
fi

# 기존 프로세스가 실행 중이면 무중단 재시작
if pm2 list | grep -q "resume_songseungju"; then
    echo "> PM2 Zero Downtime Reload" | tee -a /home/ec2-user/deploy.log
    pm2 reload resume_songseungju
else
    echo "> PM2 Start New Process" | tee -a /home/ec2-user/deploy.log
    pm2 start npm --name "resume_songseungju" -- run start
fi

pm2 save

echo "> AfterInstall 완료" | tee -a /home/ec2-user/deploy.log

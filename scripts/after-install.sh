#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"

echo "> AfterInstall 실행" | tee -a $LOG_FILE

if [ ! -d "$DEPLOY_DIR" ]; then
    echo "🚨 배포 폴더가 존재하지 않습니다! ($DEPLOY_DIR)" | tee -a $LOG_FILE
    exit 1
fi

cd $DEPLOY_DIR

# 의존성 설치
echo "> npm install 실행" | tee -a $LOG_FILE
npm install
echo "> npm install 완료" | tee -a $LOG_FILE

# pm2 설치 (root 환경)
if ! command -v pm2 &> /dev/null; then
    echo "> PM2 설치" | tee -a $LOG_FILE
    npm install -g pm2
fi

# .next 폴더 확인
if [ ! -d ".next" ]; then
    echo "🚨 Next.js 빌드 파일(.next)이 없습니다!" | tee -a $LOG_FILE
    exit 1
fi

# PM2 프로세스가 존재하는지 확인하여 무중단 재시작 (Zero Downtime) 진행
if pm2 info resume_songseungju > /dev/null 2>&1; then
    echo "> PM2 Zero Downtime Reload" | tee -a $LOG_FILE
    pm2 reload resume_songseungju --update-env
else
    echo "> PM2 Start New Process" | tee -a $LOG_FILE
    pm2 start npm --name "resume_songseungju" -- start
fi

pm2 save

echo "> AfterInstall 완료" | tee -a $LOG_FILE

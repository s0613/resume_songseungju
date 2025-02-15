#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"

echo "> AfterInstall 실행" | tee -a $LOG_FILE

# 배포 폴더 존재 여부 확인
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "🚨 배포 폴더가 존재하지 않습니다! ($DEPLOY_DIR)" | tee -a $LOG_FILE
    exit 1
fi

cd $DEPLOY_DIR

# 실행 가능한 Next.js 빌드 파일이 있는지 확인
if [ ! -d ".next" ]; then
    echo "🚨 Next.js 빌드 파일(.next)이 없습니다!" | tee -a $LOG_FILE
    exit 1
fi

# PM2 설치 확인
if ! command -v pm2 &> /dev/null; then
    echo "> PM2 설치" | tee -a $LOG_FILE
    sudo npm install -g pm2
fi

# Next.js 실행 (빌드된 파일 사용)
if pm2 list | grep -q "resume_songseungju"; then
    echo "> PM2 Zero Downtime Reload" | tee -a $LOG_FILE
    pm2 reload resume_songseungju
else
    echo "> PM2 Start New Process" | tee -a $LOG_FILE
    pm2 start npm --name "resume_songseungju" -- start
fi

pm2 save

echo "> AfterInstall 완료" | tee -a $LOG_FILE

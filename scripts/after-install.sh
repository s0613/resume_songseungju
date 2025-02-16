#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"

echo "> [AfterInstall] 시작" | tee -a "$LOG_FILE"

if [ ! -d "$DEPLOY_DIR" ]; then
  echo "🚨 배포 폴더가 존재하지 않습니다: $DEPLOY_DIR" | tee -a "$LOG_FILE"
  exit 1
fi

cd "$DEPLOY_DIR"

# node_modules 폴더와 Next.js 모듈 체크
if [ -d "node_modules" ]; then
  if [ ! -f "node_modules/next/server/require-hook.js" ]; then
    echo "> next 모듈 손상 감지: node_modules 재설치 실행" | tee -a "$LOG_FILE"
    rm -rf node_modules
    npm ci
    echo "> npm ci 완료" | tee -a "$LOG_FILE"
  else
    echo "> node_modules와 next 모듈 존재 - 의존성 설치 생략" | tee -a "$LOG_FILE"
  fi
else
  echo "> npm ci 실행 (node_modules 미존재)" | tee -a "$LOG_FILE"
  npm ci
  echo "> npm ci 완료" | tee -a "$LOG_FILE"
fi

# PM2 설치 (없으면 글로벌 설치)
if ! command -v pm2 &> /dev/null; then
  echo "> PM2 설치" | tee -a "$LOG_FILE"
  npm install -g pm2
fi

# .next 폴더 (Next.js 빌드 산출물) 확인
if [ ! -d ".next" ]; then
  echo "🚨 Next.js 빌드 파일(.next)이 없습니다!" | tee -a "$LOG_FILE"
  exit 1
fi

# PM2를 사용한 애플리케이션 시작 또는 재시작
if pm2 info resume_songseungju > /dev/null 2>&1; then
  echo "> PM2 Zero Downtime Reload" | tee -a "$LOG_FILE"
  pm2 reload resume_songseungju --update-env
else
  echo "> PM2 Start New Process" | tee -a "$LOG_FILE"
  pm2 start npm --name "resume_songseungju" -- start
fi

# PM2 프로세스 리스트 저장 (재부팅 시 자동 복원용)
pm2 save
echo "> PM2 프로세스 리스트 저장 완료" | tee -a "$LOG_FILE"

# nginx 재시작 (시스템에 따라 명령어 변경 가능)
echo "> Nginx 재시작" | tee -a "$LOG_FILE"
sudo systemctl restart nginx
echo "> Nginx 재시작 완료" | tee -a "$LOG_FILE"

echo "> [AfterInstall] 완료" | tee -a "$LOG_FILE"

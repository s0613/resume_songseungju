#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"
BACKUP_DIR="/home/ec2-user/backup_resume_songseungju"

# 로그 파일이 없으면 생성
if [ ! -f "$LOG_FILE" ]; then
  sudo touch "$LOG_FILE"
  sudo chown ec2-user:ec2-user "$LOG_FILE"
  sudo chmod 664 "$LOG_FILE"
fi

echo "> [BeforeInstall] 시작" | tee -a "$LOG_FILE"

# 실행 중인 PM2 프로세스 종료
if pm2 list | grep -q "resume_songseungju"; then
  echo "> 기존 PM2 프로세스 중지" | tee -a "$LOG_FILE"
  pm2 delete resume_songseungju || true
fi

# 기존 배포 백업 (롤백 대비)
if [ -d "$DEPLOY_DIR" ]; then
  echo "> 기존 배포 백업 진행" | tee -a "$LOG_FILE"
  sudo rm -rf "$BACKUP_DIR"
  sudo mv "$DEPLOY_DIR" "$BACKUP_DIR"
fi

# 배포 폴더 생성
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "> 배포 폴더 생성" | tee -a "$LOG_FILE"
  sudo mkdir -p "$DEPLOY_DIR"
  sudo chown -R ec2-user:ec2-user "$DEPLOY_DIR"
  sudo chmod -R 755 "$DEPLOY_DIR"
fi

echo "> [BeforeInstall] 완료" | tee -a "$LOG_FILE"

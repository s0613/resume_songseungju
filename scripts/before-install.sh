#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"
BACKUP_DIR="/home/ec2-user/backup_resume_songseungju"

echo "> BeforeInstall 실행" | tee -a $LOG_FILE

# 기존 PM2 프로세스 종료 (root 환경)
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "resume_songseungju"; then
        echo "> 기존 PM2 프로세스 중지" | tee -a $LOG_FILE
        pm2 delete resume_songseungju || true
    fi
fi

# 기존 배포 백업
if [ -d "$DEPLOY_DIR" ]; then
    echo "> 기존 배포 백업" | tee -a $LOG_FILE
    rm -rf $BACKUP_DIR || true
    mv $DEPLOY_DIR $BACKUP_DIR || true
fi

# 배포 폴더 생성
mkdir -p $DEPLOY_DIR
chown -R ec2-user:ec2-user $DEPLOY_DIR
chmod -R 755 $DEPLOY_DIR

echo "> BeforeInstall 완료" | tee -a $LOG_FILE

#!/bin/bash
set -e

LOG_FILE="/home/ec2-user/deploy.log"
DEPLOY_DIR="/home/ec2-user/resume_songseungju"
BACKUP_DIR="/home/ec2-user/backup_resume_songseungju"

sudo npm install -g pm2

# 로그 파일이 없으면 생성
if [ ! -f "$LOG_FILE" ]; then
    sudo touch $LOG_FILE
    sudo chown ec2-user:ec2-user $LOG_FILE
    sudo chmod 664 $LOG_FILE
fi

echo "> BeforeInstall 실행" | tee -a $LOG_FILE

# 실행 중인 프로세스 종료 (무중단 배포)
if pm2 list | grep -q "resume_songseungju"; then
    echo "> 기존 PM2 프로세스 중지" | tee -a $LOG_FILE
    pm2 delete resume_songseungju || true
fi

# 기존 배포 백업 (롤백 대비)
if [ -d "$DEPLOY_DIR" ]; then
    echo "> 기존 배포 백업 진행" | tee -a $LOG_FILE
    sudo rm -rf $BACKUP_DIR || true
    sudo mv $DEPLOY_DIR $BACKUP_DIR || true
fi

# 배포 폴더 생성 (존재 여부 확인 후 생성)
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "> 배포 폴더가 존재하지 않아 새로 생성합니다." | tee -a $LOG_FILE
    sudo mkdir -p $DEPLOY_DIR
    sudo chown -R ec2-user:ec2-user $DEPLOY_DIR
    sudo chmod -R 755 $DEPLOY_DIR
fi

echo "> BeforeInstall 완료" | tee -a $LOG_FILE

#!/bin/bash
set -e

echo "> BeforeInstall 실행" | tee -a /home/ec2-user/deploy.log

DEPLOY_DIR="/home/ec2-user/resume_songseungju"
BACKUP_DIR="/home/ec2-user/backup_resume_songseungju"

# 기존 배포 백업 (롤백 대비)
if [ -d "$DEPLOY_DIR" ]; then
    echo "> 기존 배포 백업" | tee -a /home/ec2-user/deploy.log
    sudo rm -rf $BACKUP_DIR
    sudo mv $DEPLOY_DIR $BACKUP_DIR
fi

# 새 디렉토리 생성
mkdir -p $DEPLOY_DIR
sudo chown -R ec2-user:ec2-user $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

echo "> BeforeInstall 완료" | tee -a /home/ec2-user/deploy.log

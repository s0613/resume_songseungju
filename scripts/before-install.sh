#!/bin/bash
set -e

echo "> BeforeInstall 실행" | tee -a /home/ec2-user/deploy.log

# 이전 배포 디렉토리 삭제
if [ -d "/home/ec2-user/resume_songseungju" ]; then
    sudo rm -rf /home/ec2-user/resume_songseungju
fi

# 새 디렉토리 생성
mkdir -p /home/ec2-user/resume_songseungju
sudo chown -R ec2-user:ec2-user /home/ec2-user/resume_songseungju
sudo chmod -R 755 /home/ec2-user/resume_songseungju

#!/bin/bash
set -e

echo "> after-install.sh 실행" | tee -a /home/ec2-user/deploy.log
echo "현재 디렉토리: $(pwd)" | tee -a /home/ec2-user/deploy.log
ls -al /home/ec2-user/resume_songseungju | tee -a /home/ec2-user/deploy.log

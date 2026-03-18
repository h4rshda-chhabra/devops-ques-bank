@echo off
echo =======================================================
echo Deploying DevOps Question Bank...
echo =======================================================

echo 1. Stopping any existing conflicting containers...
docker-compose -p devops-ques-bank down --remove-orphans
docker-compose down --remove-orphans

echo 2. Rebuilding and starting the application...
docker-compose -p devops-ques-bank up --build -d

echo =======================================================
echo Deployment successful!
echo Frontend will be available at: http://localhost:3001
echo Backend will be available at: http://localhost:4001
echo =======================================================

@echo off
cd /d %~dp0
echo Fetching from remote...
git fetch
echo Pulling latest changes...
git pull
pause

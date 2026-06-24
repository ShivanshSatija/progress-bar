@echo off
title 90-Day Placement Mission
cd /d "%~dp0"

echo ============================================
echo    90-DAY PLACEMENT MISSION - Launcher
echo ============================================
echo.

REM First run: install dependencies
if not exist "node_modules" (
  echo Installing dependencies for the first time...
  echo This can take a minute. Please wait.
  call npm install
  echo.
)

REM Build the app if it hasn't been built yet
if not exist "dist" (
  echo Building the app...
  call npm run build
  echo.
)

echo Launching your app... your browser will open automatically.
echo Keep THIS window open while you use the app.
echo To close the app later, just close this window.
echo.

REM Serve the built app and open the browser
call npm run preview

pause

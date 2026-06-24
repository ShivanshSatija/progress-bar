@echo off
title 90-Day Placement Mission
cd /d "%~dp0"

echo ============================================
echo    90-DAY PLACEMENT MISSION - Launcher
echo ============================================
echo.
echo TIP: Your app is also online (no setup needed):
echo      https://shivanshsatija.github.io/progress-bar/
echo.

REM First run: install dependencies
if not exist "node_modules" (
  echo Installing dependencies for the first time...
  echo This can take a minute. Please wait.
  call npm install
  echo.
)

echo Launching your app... your browser will open automatically.
echo Keep THIS window open while you use the app.
echo To close the app later, just close this window.
echo.

REM Start the app (opens the browser at http://localhost:5173)
call npm run dev

pause

@echo off
REM ADS Virtual Lab - Startup Script for Windows
REM Start both backend and frontend in separate windows

echo.
echo ========================================
echo  ADS Virtual Lab - Starting...
echo ========================================
echo.

REM Check if running from correct directory
if not exist "api" (
    echo ERROR: Please run this from d:\DL\ADS_virtual_lab\
    pause
    exit /b 1
)

echo Starting Backend (Flask API on port 5000)...
echo.
start cmd /k "cd api && python app.py"

timeout /t 3 /nobreak

echo.
echo Starting Frontend (React on port 5173)...
echo.
start cmd /k "cd virtual-lab-ui && npm run dev"

echo.
echo ========================================
echo Startup Complete!
echo ========================================
echo.
echo Expected:
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo Open your browser to:
echo   http://localhost:5173
echo.
pause

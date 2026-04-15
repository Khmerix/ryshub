@echo off
echo Starting local server for TOEFL Listening Test...
echo.
echo Open your browser and go to: http://localhost:8000/toefllistening.html
echo.
cd /d "%~dp0"
python -m http.server 8000
pause

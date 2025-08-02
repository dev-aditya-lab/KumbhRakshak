@echo off
REM Clean script for KumbhRakshak project (Windows)

echo 🧹 Cleaning auto-generated files...

REM Remove node modules
if exist "node_modules" (
    echo Removing node_modules...
    rmdir /s /q node_modules
)

REM Remove Expo cache
if exist ".expo" (
    echo Removing .expo cache...
    rmdir /s /q .expo
)

REM Remove build directories
if exist "dist" rmdir /s /q dist
if exist "web-build" rmdir /s /q web-build
if exist "build" rmdir /s /q build
if exist ".cache" rmdir /s /q .cache
if exist ".tmp" rmdir /s /q .tmp
if exist ".temp" rmdir /s /q .temp
if exist ".metro-cache" rmdir /s /q .metro-cache

REM Remove lock files (optional)
if exist "package-lock.json" del package-lock.json
if exist "yarn.lock" del yarn.lock

echo ✅ Project cleaned! Run 'npm install' to reinstall dependencies.
pause

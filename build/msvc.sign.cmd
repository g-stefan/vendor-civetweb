@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo - %BUILD_PROJECT% ^> sign

pushd output
for /r %%i in (*civetweb.exe) do call grigore-stefan.sign "%BUILD_PROJECT%" "%%i"
popd

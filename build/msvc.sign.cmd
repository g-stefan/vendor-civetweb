@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> sign vendor-civetweb

pushd temp\civetweb\bin
call grigore-stefan.sign "CivetWeb" "civetweb.exe"
popd

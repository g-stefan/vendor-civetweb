@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> clean vendor-civetweb

if exist source\ rmdir /Q /S source
if exist output\ rmdir /Q /S output
if exist temp\ rmdir /Q /S temp
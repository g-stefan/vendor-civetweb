// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2023 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Fabricare.include("vendor");

messageAction("make");

if (Shell.fileExists("temp/build.done.flag")) {
	return;
};

if (!Shell.directoryExists("source")) {
	exitIf(Shell.system("7z x -aoa archive/" + Project.vendor + ".7z"));
	Shell.rename(Project.vendor, "source");
};

Shell.mkdirRecursivelyIfNotExists("output");
Shell.mkdirRecursivelyIfNotExists("output/bin");
Shell.mkdirRecursivelyIfNotExists("output/include");
Shell.mkdirRecursivelyIfNotExists("output/lib");
Shell.mkdirRecursivelyIfNotExists("temp");
Shell.mkdirRecursivelyIfNotExists("temp/bin");
Shell.mkdirRecursivelyIfNotExists("temp/include");
Shell.mkdirRecursivelyIfNotExists("temp/lib");

Shell.mkdirRecursivelyIfNotExists("temp/cmake");

if (!Shell.fileExists("temp/build.config.flag")) {
	Shell.setenv("PATH", "C:\\Program Files\\CMake\\bin;" + Shell.getenv("PATH"));

	Shell.copyFile("fabricare/source/src.CMakeLists.txt","source/src/CMakeLists.txt");

	Shell.setenv("CC","cl.exe");
	Shell.setenv("CXX","cl.exe");

	cmdConfig="cmake";
	cmdConfig+=" ../../source";
	cmdConfig+=" -G \"Ninja\"";
	cmdConfig+=" -DCMAKE_BUILD_TYPE=ReleaseMT";
	cmdConfig+=" -DCMAKE_INSTALL_PREFIX="+Shell.realPath(Shell.getcwd())+"\\temp";
	cmdConfig+=" -DCIVETWEB_BUILD_TESTING=OFF";
	cmdConfig+=" -DCIVETWEB_ENABLE_ZLIB=ON";
	cmdConfig+=" -DCIVETWEB_ENABLE_WEBSOCKETS=ON";
	cmdConfig+=" -DCIVETWEB_ENABLE_CXX=ON";

	runInPath("temp/cmake",function(){
		exitIf(Shell.system(cmdConfig));
	});

	Shell.filePutContents("temp/build.config.flag", "done");
};

runInPath("temp/cmake",function(){
	exitIf(Shell.system("ninja"));
	exitIf(Shell.system("ninja install"));
	exitIf(Shell.system("ninja clean"));
});

Shell.copyFilesToDirectory("temp/bin/*", "output/bin");
Shell.copyDirRecursively("temp/include", "output/include");
Shell.copyFile("temp/lib/civetweb.lib", "output/lib/civetweb.lib");
Shell.copyFile("temp/lib/civetweb.lib", "output/lib/civetweb.static.lib");

Shell.filePutContents("temp/build.done.flag", "done");

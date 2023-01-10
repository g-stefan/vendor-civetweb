// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2023 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

messageAction("install");

Shell.copyFilesToDirectory("output/bin/*", pathRepository + "/bin");
Shell.copyDirRecursively("output/include", pathRepository + "/include");
Shell.copyFile("output/lib/civetweb.lib", pathRepository + "/lib/civetweb.lib");
Shell.copyFile("output/lib/civetweb.lib", pathRepository + "/lib/civetweb.static.lib");

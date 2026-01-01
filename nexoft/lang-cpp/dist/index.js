async function m(l) {
  console.log("[C++ Extension] Activating...");
  const s = navigator.userAgent.includes("Windows"), g = s ? "clangd.exe" : "clangd", r = `${l.extensionPath}/libs/${g}`;
  console.log(`[C++ Extension] Found bundled Clangd at: ${r}`);
  const o = [
    {
      id: "cpp.gcc",
      name: "GCC (g++)",
      command: "g++",
      args: ["-g", "-Wall", "-Wextra", "-std=c++17"],
      outputFlag: "-o",
      registeredBy: "lang-cpp"
    },
    {
      id: "cpp.clang",
      name: "Clang (clang++)",
      command: "clang++",
      args: ["-g", "-Wall", "-Wextra", "-std=c++17"],
      outputFlag: "-o",
      registeredBy: "lang-cpp"
    },
    {
      id: "cpp.msvc",
      name: "MSVC (cl)",
      command: "cl",
      args: ["/EHsc", "/W4", "/std:c++17"],
      outputFlag: "/Fe:",
      registeredBy: "lang-cpp"
    }
  ], i = [
    {
      id: "cpp.launch.debug",
      name: "Debug C++ Application",
      type: "cppdbg",
      configurations: {
        program: "${workspaceFolder}/${fileBasenameNoExtension}${executableExtension}",
        args: [],
        stopAtEntry: !1,
        cwd: "${workspaceFolder}",
        environment: [],
        externalConsole: !1,
        MIMode: s ? "gdb" : "lldb"
      },
      registeredBy: "lang-cpp"
    },
    {
      id: "cpp.launch.run",
      name: "Run C++ Application",
      type: "run",
      configurations: {
        program: "${workspaceFolder}/${fileBasenameNoExtension}${executableExtension}",
        args: [],
        cwd: "${workspaceFolder}"
      },
      registeredBy: "lang-cpp"
    }
  ], t = {
    lsp: {
      enabled: !0,
      command: r,
      args: [
        "--background-index",
        "--clang-tidy",
        "--completion-style=detailed",
        "--header-insertion=iwyu",
        "--suggest-missing-includes",
        "--log=info"
      ],
      registeredBy: "lang-cpp"
    },
    formatter: {
      enabled: !0,
      command: "clang-format",
      formatOnSave: !0,
      formatOnPaste: !1,
      registeredBy: "lang-cpp"
    },
    linter: {
      enabled: !0,
      command: "cppcheck",
      lintOnSave: !0,
      lintOnType: !1,
      registeredBy: "lang-cpp"
    },
    debugger: {
      enabled: !0,
      command: s ? "gdb" : "lldb",
      type: "cppdbg",
      registeredBy: "lang-cpp"
    }
  }, d = {
    lsp: { ...t.lsp },
    formatter: { ...t.formatter },
    linter: { ...t.linter },
    debugger: t.debugger ? {
      enabled: t.debugger.enabled,
      command: t.debugger.command,
      type: t.debugger.type,
      registeredBy: t.debugger.registeredBy
    } : void 0
  };
  try {
    await nexcode.settings.update("language-settings:cpp", JSON.stringify(t)), console.log("[C++ Extension] Updated C++ language settings"), await nexcode.settings.update("language-settings:c", JSON.stringify(d)), console.log("[C++ Extension] Updated C language settings"), await nexcode.settings.update("compiler-profiles:cpp", JSON.stringify(o)), await nexcode.settings.update("compiler-profiles:c", JSON.stringify(o)), console.log("[C++ Extension] Registered compiler profiles"), await nexcode.settings.update("launch-profiles:cpp", JSON.stringify(i)), await nexcode.settings.update("launch-profiles:c", JSON.stringify(i)), console.log("[C++ Extension] Registered launch profiles");
    const e = {
      extensionId: "lang-cpp",
      extensionName: "C/C++ Language Support",
      provides: {
        languages: ["cpp", "c"],
        lsp: {
          name: "Clangd",
          command: r
        },
        formatter: {
          name: "clang-format",
          command: "clang-format"
        },
        linter: {
          name: "cppcheck",
          command: "cppcheck"
        },
        debuggers: [
          { name: "GDB", command: "gdb" },
          { name: "LLDB", command: "lldb" }
        ],
        compilerProfiles: o,
        launchProfiles: i
      }
    };
    await nexcode.settings.update("extension-contributions:lang-cpp", JSON.stringify(e));
  } catch (e) {
    console.error("[C++ Extension] Failed to update settings:", e);
  }
  nexcode.commands.register("cpp.restartServer", async () => {
    nexcode.window.showMessage("Restarting Clangd language server...", "info");
  }), nexcode.commands.register("cpp.selectCompiler", async () => {
    try {
      const e = await nexcode.settings.get("compiler-profiles:cpp"), c = e ? JSON.parse(e) : o, a = await nexcode.window.showQuickPick(
        c.map((n) => ({ label: n.name, value: n.id, detail: n.command })),
        { title: "Select C++ Compiler" }
      );
      if (a) {
        const n = c.find((p) => p.id === a.value);
        n && (await nexcode.settings.update("selected-compiler:cpp", JSON.stringify(n)), nexcode.window.showMessage(`Selected compiler: ${n.name}`, "info"));
      }
    } catch (e) {
      console.error("[C++ Extension] Failed to select compiler:", e);
    }
  }), nexcode.commands.register("cpp.createLaunchConfig", async () => {
    try {
      const e = await nexcode.settings.get("launch-profiles:cpp"), c = e ? JSON.parse(e) : i, a = await nexcode.window.showQuickPick(
        c.map((n) => ({ label: n.name, value: n.id, detail: n.type })),
        { title: "Create Launch Configuration" }
      );
      a && nexcode.window.showMessage(`Created launch configuration: ${a.label}`, "info");
    } catch (e) {
      console.error("[C++ Extension] Failed to create launch config:", e);
    }
  }), console.log("[C++ Extension] Activation complete");
}
function u() {
  console.log("[C++ Extension] Deactivated");
}
export {
  m as activate,
  u as deactivate
};

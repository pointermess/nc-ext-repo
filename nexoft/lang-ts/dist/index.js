function v() {
  const n = navigator.userAgent.toLowerCase();
  return n.includes("windows") ? "windows" : n.includes("mac") ? "macos" : "linux";
}
async function j(n) {
  console.log("[TypeScript Extension] Activating...");
  const o = v() === "windows";
  let i, t;
  o ? `${n.extensionPath}` : `${n.extensionPath}`, i = o ? "typescript-language-server.cmd" : "typescript-language-server", t = ["--stdio"], console.log("[TypeScript Extension] Using system-installed TypeScript Language Server");
  const c = {
    lsp: {
      enabled: !0,
      command: i,
      args: t,
      registeredBy: "lang-ts"
    },
    formatter: {
      enabled: !0,
      command: "prettier",
      formatOnSave: !0,
      formatOnPaste: !1,
      registeredBy: "lang-ts"
    },
    linter: {
      enabled: !0,
      command: "eslint",
      lintOnSave: !0,
      lintOnType: !1,
      registeredBy: "lang-ts"
    }
  }, m = {
    lsp: { ...c.lsp },
    formatter: { ...c.formatter },
    linter: { ...c.linter }
  }, g = {
    lsp: {
      enabled: !0,
      command: i,
      args: t,
      registeredBy: "lang-ts"
    },
    formatter: {
      enabled: !0,
      command: "prettier",
      formatOnSave: !0,
      formatOnPaste: !1,
      registeredBy: "lang-ts"
    },
    linter: {
      enabled: !0,
      command: "eslint",
      lintOnSave: !0,
      lintOnType: !1,
      registeredBy: "lang-ts"
    }
  }, y = {
    lsp: { ...g.lsp },
    formatter: { ...g.formatter },
    linter: { ...g.linter }
  };
  try {
    await nexcode.settings.update("language-settings:typescript", JSON.stringify(c)), console.log("[TypeScript Extension] Updated TypeScript language settings"), await nexcode.settings.update("language-settings:typescriptreact", JSON.stringify(m)), console.log("[TypeScript Extension] Updated TypeScript React language settings"), await nexcode.settings.update("language-settings:javascript", JSON.stringify(g)), console.log("[TypeScript Extension] Updated JavaScript language settings"), await nexcode.settings.update("language-settings:javascriptreact", JSON.stringify(y)), console.log("[TypeScript Extension] Updated JavaScript React language settings");
    const e = {
      extensionId: "lang-ts",
      extensionName: "TypeScript Language Support",
      provides: {
        languages: ["typescript", "typescriptreact", "javascript", "javascriptreact"],
        lsp: {
          name: "TypeScript Language Server",
          command: i
        },
        formatter: {
          name: "Prettier",
          command: "prettier"
        },
        linter: {
          name: "ESLint",
          command: "eslint"
        }
      }
    };
    await nexcode.settings.update("extension-contributions:lang-ts", JSON.stringify(e)), console.log("[TypeScript Extension] Registered extension contributions");
  } catch (e) {
    console.error("[TypeScript Extension] Failed to update settings:", e);
  }
  nexcode.commands.register("typescript.restartServer", async () => {
    nexcode.window.showMessage("Restarting TypeScript Language Server...", "info");
    try {
      nexcode.notifications.info({
        title: "TypeScript Language Server",
        message: "Server restart requested. This may take a moment.",
        timeout: 3e3
      });
    } catch (e) {
      console.error("[TypeScript Extension] Failed to restart server:", e);
    }
  }), nexcode.commands.register("typescript.organizeImports", async () => {
    var e, s;
    try {
      if (!((s = (e = nexcode.editor) == null ? void 0 : e.getActiveEditor) == null ? void 0 : s.call(e))) {
        nexcode.window.showMessage("No active editor", "warning");
        return;
      }
      nexcode.notifications.info({
        title: "Organize Imports",
        message: "Organizing imports is not yet fully implemented via the LSP API.",
        timeout: 3e3
      });
    } catch (r) {
      console.error("[TypeScript Extension] Failed to organize imports:", r);
    }
  }), nexcode.commands.register("typescript.goToProjectConfig", async () => {
    var e, s, r, l, d;
    try {
      const a = ((s = (e = nexcode.workspace) == null ? void 0 : e.getProjects) == null ? void 0 : s.call(e)) || [];
      if (a.length === 0) {
        nexcode.window.showMessage("No workspace open", "warning");
        return;
      }
      const u = ((r = a[0]) == null ? void 0 : r.path) || a[0], x = ["tsconfig.json", "jsconfig.json"];
      for (const S of x) {
        const f = `${u}/${S}`;
        try {
          if (await ((d = (l = nexcode.fs) == null ? void 0 : l.exists) == null ? void 0 : d.call(l, f))) {
            await nexcode.editor.openFile(f);
            return;
          }
        } catch {
        }
      }
      nexcode.notifications.info({
        title: "No Configuration Found",
        message: "No tsconfig.json or jsconfig.json found in the project root.",
        actions: [
          {
            label: "Create tsconfig.json",
            callback: () => w(u)
          }
        ],
        timeout: 5e3
      });
    } catch (a) {
      console.error("[TypeScript Extension] Failed to go to project config:", a);
    }
  }), console.log("[TypeScript Extension] Activation complete");
}
async function w(n) {
  var o, i;
  const p = {
    compilerOptions: {
      target: "ES2020",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: !0,
      esModuleInterop: !0,
      skipLibCheck: !0,
      forceConsistentCasingInFileNames: !0,
      resolveJsonModule: !0,
      isolatedModules: !0,
      noEmit: !0
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "dist"]
  };
  try {
    const t = `${n}/tsconfig.json`;
    await ((i = (o = nexcode.fs) == null ? void 0 : o.writeFile) == null ? void 0 : i.call(o, t, JSON.stringify(p, null, 2))), await nexcode.editor.openFile(t), nexcode.notifications.success({
      title: "Configuration Created",
      message: "Created tsconfig.json with default settings.",
      timeout: 3e3
    });
  } catch (t) {
    console.error("[TypeScript Extension] Failed to create tsconfig.json:", t), nexcode.notifications.error({
      title: "Error",
      message: "Failed to create tsconfig.json",
      timeout: 3e3
    });
  }
}
function h() {
  console.log("[TypeScript Extension] Deactivated");
}
export {
  j as activate,
  h as deactivate
};

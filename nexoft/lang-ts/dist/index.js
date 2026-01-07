function S(r) {
  return {
    command: "node",
    args: [`${r}/node_modules/typescript-language-server/lib/cli.mjs`, "--stdio"]
  };
}
async function T(r) {
  console.log("[TypeScript Extension] Activating...");
  const { command: n, args: t } = S(r.extensionPath);
  console.log("[TypeScript Extension] Using bundled TypeScript Language Server from node_modules"), console.log(`[TypeScript Extension] Command: ${n} ${t.join(" ")}`);
  const o = {
    lsp: {
      enabled: !0,
      command: n,
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
  }, i = {
    lsp: { ...o.lsp },
    formatter: { ...o.formatter },
    linter: { ...o.linter }
  }, g = {
    lsp: {
      enabled: !0,
      command: n,
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
    lsp: { ...g.lsp },
    formatter: { ...g.formatter },
    linter: { ...g.linter }
  };
  try {
    await nexcode.settings.update("language-settings:typescript", JSON.stringify(o)), console.log("[TypeScript Extension] Updated TypeScript language settings"), await nexcode.settings.update("language-settings:typescriptreact", JSON.stringify(i)), console.log("[TypeScript Extension] Updated TypeScript React language settings"), await nexcode.settings.update("language-settings:javascript", JSON.stringify(g)), console.log("[TypeScript Extension] Updated JavaScript language settings"), await nexcode.settings.update("language-settings:javascriptreact", JSON.stringify(m)), console.log("[TypeScript Extension] Updated JavaScript React language settings");
    const e = {
      extensionId: "lang-ts",
      extensionName: "TypeScript Language Support",
      provides: {
        languages: ["typescript", "typescriptreact", "javascript", "javascriptreact"],
        lsp: {
          name: "TypeScript Language Server (Bundled)",
          command: `${n} ${t.join(" ")}`
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
    } catch (a) {
      console.error("[TypeScript Extension] Failed to organize imports:", a);
    }
  }), nexcode.commands.register("typescript.goToProjectConfig", async () => {
    var e, s, a, l, p;
    try {
      const c = ((s = (e = nexcode.workspace) == null ? void 0 : e.getProjects) == null ? void 0 : s.call(e)) || [];
      if (c.length === 0) {
        nexcode.window.showMessage("No workspace open", "warning");
        return;
      }
      const d = ((a = c[0]) == null ? void 0 : a.path) || c[0], f = ["tsconfig.json", "jsconfig.json"];
      for (const y of f) {
        const u = `${d}/${y}`;
        try {
          if (await ((p = (l = nexcode.fs) == null ? void 0 : l.exists) == null ? void 0 : p.call(l, u))) {
            await nexcode.editor.openFile(u);
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
            callback: () => x(d)
          }
        ],
        timeout: 5e3
      });
    } catch (c) {
      console.error("[TypeScript Extension] Failed to go to project config:", c);
    }
  }), console.log("[TypeScript Extension] Activation complete");
}
async function x(r) {
  var t, o;
  const n = {
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
    const i = `${r}/tsconfig.json`;
    await ((o = (t = nexcode.fs) == null ? void 0 : t.writeFile) == null ? void 0 : o.call(t, i, JSON.stringify(n, null, 2))), await nexcode.editor.openFile(i), nexcode.notifications.success({
      title: "Configuration Created",
      message: "Created tsconfig.json with default settings.",
      timeout: 3e3
    });
  } catch (i) {
    console.error("[TypeScript Extension] Failed to create tsconfig.json:", i), nexcode.notifications.error({
      title: "Error",
      message: "Failed to create tsconfig.json",
      timeout: 3e3
    });
  }
}
function j() {
  console.log("[TypeScript Extension] Deactivated");
}
export {
  T as activate,
  j as deactivate
};

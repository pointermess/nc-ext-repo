function s(o) {
  return {
    command: "node",
    args: [`${o}/node_modules/@vue/language-server/bin/vue-language-server.js`, "--stdio"]
  };
}
async function i(o) {
  console.log("[Vue Extension] Activating...");
  const { command: n, args: r } = s(o.extensionPath);
  console.log("[Vue Extension] Using Vue Language Server (Volar) from node_modules"), console.log(`[Vue Extension] Command: ${n} ${r.join(" ")}`);
  const a = {
    lsp: {
      enabled: !0,
      command: n,
      args: r,
      registeredBy: "lang-vue"
    },
    formatter: {
      enabled: !0,
      command: "prettier",
      formatOnSave: !0,
      formatOnPaste: !1,
      registeredBy: "lang-vue"
    },
    linter: {
      enabled: !0,
      command: "eslint",
      lintOnSave: !0,
      lintOnType: !1,
      registeredBy: "lang-vue"
    }
  };
  try {
    await nexcode.settings.update("language-settings:vue", JSON.stringify(a)), console.log("[Vue Extension] Updated Vue language settings");
    const e = {
      extensionId: "lang-vue",
      extensionName: "Vue Language Support",
      provides: {
        languages: ["vue"],
        lsp: {
          name: "Vue Language Server (Volar)",
          command: `${n} ${r.join(" ")}`
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
    await nexcode.settings.update("extension-contributions:lang-vue", JSON.stringify(e)), console.log("[Vue Extension] Registered extension contributions");
  } catch (e) {
    console.error("[Vue Extension] Failed to update settings:", e);
  }
  nexcode.commands.register("vue.restartServer", async () => {
    nexcode.window.showMessage("Restarting Vue Language Server...", "info");
    try {
      nexcode.notifications.info({
        title: "Vue Language Server",
        message: "Server restart requested. This may take a moment.",
        timeout: 3e3
      });
    } catch (e) {
      console.error("[Vue Extension] Failed to restart server:", e);
    }
  }), nexcode.commands.register("vue.openDocs", async () => {
    var e;
    try {
      const t = "https://vuejs.org/guide/introduction.html";
      (e = nexcode.window) != null && e.openExternal ? await nexcode.window.openExternal(t) : nexcode.notifications.info({
        title: "Vue Documentation",
        message: `Visit: ${t}`,
        timeout: 5e3
      });
    } catch (t) {
      console.error("[Vue Extension] Failed to open documentation:", t);
    }
  }), nexcode.commands.register("vue.showOutputChannel", async () => {
    try {
      nexcode.notifications.info({
        title: "Vue Language Server Output",
        message: "Output channel support is not yet implemented.",
        timeout: 3e3
      });
    } catch (e) {
      console.error("[Vue Extension] Failed to show output channel:", e);
    }
  }), console.log("[Vue Extension] Activation complete");
}
function u() {
  console.log("[Vue Extension] Deactivated");
}
export {
  i as activate,
  u as deactivate
};

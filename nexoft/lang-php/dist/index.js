async function s(n) {
  console.log("[PHP Extension] Activating...");
  const e = `${n.extensionPath}/libs/node_modules/intelephense/lib/intelephense.js`;
  console.log(`[PHP Extension] Configured Intelephense path: ${e}`);
  const t = {
    lsp: {
      enabled: !0,
      // We launch Intelephense using the node executable since it's a JS module
      command: "node",
      args: [e, "--stdio"],
      registeredBy: "lang-php"
    },
    // Intelephense handles formatting as well
    formatter: {
      enabled: !0,
      command: "lsp",
      // Use the LSP itself for formatting
      formatOnSave: !0,
      formatOnPaste: !1,
      registeredBy: "lang-php"
    },
    linter: {
      enabled: !0,
      command: "lsp",
      // Use the LSP itself for linting
      lintOnSave: !0,
      lintOnType: !0,
      registeredBy: "lang-php"
    }
  };
  try {
    await nexcode.settings.update("language-settings:php", JSON.stringify(t)), console.log("[PHP Extension] Updated PHP LSP settings");
  } catch (o) {
    console.error("[PHP Extension] Failed to update settings:", o);
  }
  nexcode.commands.register("php.restartServer", async () => {
    nexcode.window.showMessage("Restarting Intelephense server...", "info");
  }), nexcode.commands.register("php.indexWorkspace", async () => {
    nexcode.window.showMessage("Indexing workspace...", "info");
  }), console.log("[PHP Extension] Activation complete");
}
function a() {
  console.log("[PHP Extension] Deactivated");
}
export {
  s as activate,
  a as deactivate
};

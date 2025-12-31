async function i(e) {
  console.log("[Rust Extension] Activating...");
  const n = navigator.userAgent.includes("Windows") ? "rust-analyzer.exe" : "rust-analyzer", t = `${e.extensionPath}/libs/${n}`;
  console.log(`[Rust Extension] Found bundled LSP at: ${t}`);
  const s = {
    lsp: {
      enabled: !0,
      command: t,
      args: []
      // Add any default args if necessary
    },
    formatter: {
      enabled: !0,
      command: "rustfmt",
      // Assumes rustfmt is in PATH for now, or could use bundled one
      formatOnSave: !0,
      formatOnPaste: !1
    },
    linter: {
      enabled: !0,
      command: "clippy",
      lintOnSave: !0,
      lintOnType: !1
    }
  };
  try {
    await nexcode.settings.update("language-settings:rust", JSON.stringify(s)), console.log("[Rust Extension] Updated Rust LSP settings");
  } catch (o) {
    console.error("[Rust Extension] Failed to update settings:", o);
  }
  nexcode.commands.register("rust.restartServer", async () => {
    nexcode.window.showMessage("Restarting Rust Analyzer is not yet supported via API.", "info");
  }), console.log("[Rust Extension] Activation complete");
}
function r() {
  console.log("[Rust Extension] Deactivated");
}
export {
  i as activate,
  r as deactivate
};


(function() {
    const style = document.createElement('style');
    style.setAttribute('data-extension-css', 'index.mjs');
    style.textContent = "\n.markdown-view {\r\n    height: 100%;\r\n    width: 100%;\r\n    background: var(--color-bg-level-1, #1e1e1e);\r\n    color: var(--color-text-primary, #e4e4e7);\r\n    overflow: auto;\r\n    padding: 24px 32px;\r\n    font-family: system-ui, -apple-system, sans-serif;\n}\n.empty-state {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100%;\r\n    opacity: 0.5;\n}\n.empty-icon {\r\n    font-size: 3rem;\r\n    margin-bottom: 16px;\n}\n.empty-title {\r\n    font-size: 1.25rem;\r\n    font-weight: 600;\r\n    margin-bottom: 8px;\n}\n.empty-description {\r\n    font-size: 0.875rem;\n}\r\n\r\n/* Global styles for rendered markdown */\n.markdown-body {\r\n    max-width: 800px;\r\n    margin: 0 auto;\r\n    line-height: 1.6;\n}\n.markdown-body h1 {\r\n    font-size: 1.6rem;\r\n    font-weight: 700;\r\n    border-bottom: 1px solid var(--color-border-muted, #3f3f46);\r\n    padding-bottom: 0.5rem;\r\n    margin: 1.5rem 0 1rem;\n}\n.markdown-body h2 {\r\n    font-size: 1.5em;\r\n    font-weight: 600;\r\n    margin: 1.5rem 0 0.75rem;\n}\n.markdown-body h3 {\r\n    font-size: 1.25em;\r\n    font-weight: 600;\r\n    margin: 1.25rem 0 0.5rem;\n}\n.markdown-body p {\r\n    margin: 1rem 0;\n}\n.markdown-body ul,\r\n.markdown-body ol {\r\n    margin: 1rem 0;\r\n    padding-left: 2rem;\n}\n.markdown-body ul {\r\n    list-style-type: disc;\n}\n.markdown-body ol {\r\n    list-style-type: decimal;\n}\n.markdown-body li {\r\n    margin: 0.25rem 0;\n}\n.markdown-body blockquote {\r\n    border-left: 4px solid var(--color-primary, #6366f1);\r\n    padding-left: 1rem;\r\n    margin: 1rem 0;\r\n    color: var(--color-text-muted, #a1a1aa);\r\n    font-style: italic;\n}\n.markdown-body pre {\r\n    background: var(--color-bg-level-2, #27272a);\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n    overflow-x: auto;\r\n    margin: 1rem 0;\n}\n.markdown-body code {\r\n    font-family: 'Fira Code', 'Consolas', monospace;\r\n    font-size: 0.9em;\n}\n.markdown-body :not(pre)>code {\r\n    background: var(--color-bg-level-2, #27272a);\r\n    padding: 0.2em 0.4em;\r\n    border-radius: 4px;\n}\n.markdown-body table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    margin: 1rem 0;\n}\n.markdown-body th,\r\n.markdown-body td {\r\n    border: 1px solid var(--color-border-muted, #3f3f46);\r\n    padding: 0.5rem 1rem;\r\n    text-align: left;\n}\n.markdown-body th {\r\n    background: var(--color-bg-level-2, #27272a);\r\n    font-weight: 600;\n}\n.markdown-body tr:nth-child(even) {\r\n    background: rgba(255, 255, 255, 0.02);\n}\n.markdown-body a {\r\n    color: var(--color-primary, #6366f1);\r\n    text-decoration: none;\n}\n.markdown-body a:hover {\r\n    text-decoration: underline;\n}\n.markdown-body img {\r\n    max-width: 100%;\r\n    border-radius: 8px;\n}\n.markdown-body hr {\r\n    border: none;\r\n    border-top: 1px solid var(--color-border-muted, #3f3f46);\r\n    margin: 2rem 0;\n}\n.markdown-body .error {\r\n    color: #ef4444;\r\n    padding: 1rem;\r\n    background: rgba(239, 68, 68, 0.1);\r\n    border-radius: 8px;\n}\r\n";
    document.head.appendChild(style);
})();
function activate(context) {
  console.log("[Markdown Preview] Extension activated!");
  const openCommand = nexcode.commands.register("markdown-preview.open", () => {
    console.log("[Markdown Preview] Opening preview...");
    nexcode.window.openEditorView("markdown-preview.view", { viewColumn: 2 });
  });
  context.subscriptions.push(openCommand);
}
function deactivate() {
  console.log("[Markdown Preview] Extension deactivated!");
}
export {
  activate,
  deactivate
};
//# sourceMappingURL=index.mjs.map

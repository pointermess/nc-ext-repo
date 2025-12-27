const dracula = {
  id: "nexoft-themes.dracula",
  name: "Dracula",
  type: "dark",
  colors: {
    // Core backgrounds
    "--color-background": "#282a36",
    "--color-surface": "#44475a",
    "--color-surface-elevated": "#6272a4",
    "--color-surface-hover": "#44475a",
    // Depth system
    "--color-bg-level-0": "#21222c",
    "--color-bg-level-1": "#282a36",
    "--color-bg-level-2": "#2d2f3c",
    "--color-bg-level-3": "#44475a",
    // Borders
    "--color-border": "#44475a",
    "--color-border-muted": "#383a4a",
    "--color-border-active": "#6272a4",
    "--color-border-subtle": "#383a4a",
    // Text
    "--color-text-primary": "#f8f8f2",
    "--color-text-secondary": "#bd93f9",
    "--color-text-muted": "#6272a4",
    "--color-text-subtle": "#44475a",
    // Accents (Dracula purple)
    "--color-accent": "#bd93f9",
    "--color-accent-hover": "#ff79c6",
    "--color-accent-subtle": "rgba(189, 147, 249, 0.15)",
    "--color-accent-muted": "rgba(189, 147, 249, 0.08)",
    // Interactive
    "--color-interactive": "#44475a",
    "--color-interactive-hover": "#6272a4",
    "--color-interactive-active": "#bd93f9",
    // Status colors
    "--color-error": "#ff5555",
    "--color-success": "#50fa7b",
    "--color-warning": "#f1fa8c",
    "--color-info": "#8be9fd"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#6272a4", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#ff79c6" } },
    { scope: "string", settings: { foreground: "#f1fa8c" } },
    { scope: "number", settings: { foreground: "#bd93f9" } },
    { scope: "function", settings: { foreground: "#50fa7b" } },
    { scope: "variable", settings: { foreground: "#f8f8f2" } },
    { scope: "type", settings: { foreground: "#8be9fd", fontStyle: "italic" } },
    { scope: "tag", settings: { foreground: "#ff79c6" } },
    { scope: "attribute", settings: { foreground: "#50fa7b" } },
    { scope: "operator", settings: { foreground: "#ff79c6" } },
    { scope: "property", settings: { foreground: "#66d9ef" } }
  ]
};
const monokaiPro = {
  id: "nexoft-themes.monokai-pro",
  name: "Monokai Pro",
  type: "dark",
  colors: {
    // Backgrounds
    "--color-background": "#2d2a2e",
    "--color-surface": "#403e41",
    "--color-surface-elevated": "#5b595c",
    "--color-surface-hover": "#4a4749",
    // Depth
    "--color-bg-level-0": "#221f22",
    "--color-bg-level-1": "#2d2a2e",
    "--color-bg-level-2": "#363337",
    "--color-bg-level-3": "#403e41",
    // Borders
    "--color-border": "#5b595c",
    "--color-border-muted": "#403e41",
    "--color-border-active": "#727072",
    "--color-border-subtle": "#403e41",
    // Text
    "--color-text-primary": "#fcfcfa",
    "--color-text-secondary": "#c1c0c0",
    "--color-text-muted": "#939293",
    "--color-text-subtle": "#727072",
    // Accents (Monokai Yellow)
    "--color-accent": "#ffd866",
    "--color-accent-hover": "#ffe097",
    "--color-accent-subtle": "rgba(255, 216, 102, 0.15)",
    "--color-accent-muted": "rgba(255, 216, 102, 0.08)",
    // Interactive
    "--color-interactive": "#5b595c",
    "--color-interactive-hover": "#727072",
    "--color-interactive-active": "#939293",
    // Status
    "--color-error": "#ff6188",
    "--color-success": "#a9dc76",
    "--color-warning": "#ffd866",
    "--color-info": "#78dce8"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#727072", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#ff6188" } },
    { scope: "string", settings: { foreground: "#ffd866" } },
    { scope: "number", settings: { foreground: "#ab9df2" } },
    { scope: "function", settings: { foreground: "#a9dc76" } },
    { scope: "variable", settings: { foreground: "#fcfcfa" } },
    { scope: "type", settings: { foreground: "#78dce8", fontStyle: "italic" } },
    { scope: "tag", settings: { foreground: "#ff6188" } },
    { scope: "attribute", settings: { foreground: "#78dce8" } },
    { scope: "operator", settings: { foreground: "#ff6188" } },
    { scope: "property", settings: { foreground: "#78dce8" } }
  ]
};
const nord = {
  id: "nexoft-themes.nord",
  name: "Nord",
  type: "dark",
  colors: {
    // Backgrounds (Nord Polar Night)
    "--color-background": "#2e3440",
    "--color-surface": "#3b4252",
    "--color-surface-elevated": "#434c5e",
    "--color-surface-hover": "#4c566a",
    // Depth
    "--color-bg-level-0": "#242933",
    "--color-bg-level-1": "#2e3440",
    "--color-bg-level-2": "#353c4a",
    "--color-bg-level-3": "#3b4252",
    // Borders
    "--color-border": "#4c566a",
    "--color-border-muted": "#3b4252",
    "--color-border-active": "#5e81ac",
    "--color-border-subtle": "#3b4252",
    // Text (Nord Snow Storm)
    "--color-text-primary": "#eceff4",
    "--color-text-secondary": "#e5e9f0",
    "--color-text-muted": "#d8dee9",
    "--color-text-subtle": "#4c566a",
    // Accents (Nord Frost - blue)
    "--color-accent": "#88c0d0",
    "--color-accent-hover": "#8fbcbb",
    "--color-accent-subtle": "rgba(136, 192, 208, 0.15)",
    "--color-accent-muted": "rgba(136, 192, 208, 0.08)",
    // Interactive
    "--color-interactive": "#4c566a",
    "--color-interactive-hover": "#5e81ac",
    "--color-interactive-active": "#81a1c1",
    // Status (Nord Aurora)
    "--color-error": "#bf616a",
    "--color-success": "#a3be8c",
    "--color-warning": "#ebcb8b",
    "--color-info": "#81a1c1"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#616e88", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#81a1c1" } },
    { scope: "string", settings: { foreground: "#a3be8c" } },
    { scope: "number", settings: { foreground: "#b48ead" } },
    { scope: "function", settings: { foreground: "#88c0d0" } },
    { scope: "variable", settings: { foreground: "#d8dee9" } },
    { scope: "type", settings: { foreground: "#8fbcbb" } },
    { scope: "tag", settings: { foreground: "#81a1c1" } },
    { scope: "attribute", settings: { foreground: "#8fbcbb" } },
    { scope: "operator", settings: { foreground: "#81a1c1" } },
    { scope: "property", settings: { foreground: "#88c0d0" } }
  ]
};
const oneDarkPro = {
  id: "nexoft-themes.one-dark-pro",
  name: "One Dark Pro",
  type: "dark",
  colors: {
    // Backgrounds
    "--color-background": "#282c34",
    "--color-surface": "#21252b",
    "--color-surface-elevated": "#2c313a",
    "--color-surface-hover": "#323842",
    // Depth
    "--color-bg-level-0": "#1e2227",
    "--color-bg-level-1": "#21252b",
    "--color-bg-level-2": "#282c34",
    "--color-bg-level-3": "#2c313a",
    // Borders
    "--color-border": "#3e4451",
    "--color-border-muted": "#2c313a",
    "--color-border-active": "#528bff",
    "--color-border-subtle": "#2c313a",
    // Text
    "--color-text-primary": "#abb2bf",
    "--color-text-secondary": "#9da5b4",
    "--color-text-muted": "#5c6370",
    "--color-text-subtle": "#4b5263",
    // Accents (Blue)
    "--color-accent": "#61afef",
    "--color-accent-hover": "#528bff",
    "--color-accent-subtle": "rgba(97, 175, 239, 0.15)",
    "--color-accent-muted": "rgba(97, 175, 239, 0.08)",
    // Interactive
    "--color-interactive": "#3e4451",
    "--color-interactive-hover": "#4b5263",
    "--color-interactive-active": "#5c6370",
    // Status
    "--color-error": "#e06c75",
    "--color-success": "#98c379",
    "--color-warning": "#e5c07b",
    "--color-info": "#61afef"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#5c6370", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#c678dd" } },
    { scope: "string", settings: { foreground: "#98c379" } },
    { scope: "number", settings: { foreground: "#d19a66" } },
    { scope: "function", settings: { foreground: "#61afef" } },
    { scope: "variable", settings: { foreground: "#e06c75" } },
    { scope: "type", settings: { foreground: "#e5c07b" } },
    { scope: "tag", settings: { foreground: "#e06c75" } },
    { scope: "attribute", settings: { foreground: "#d19a66" } },
    { scope: "operator", settings: { foreground: "#56b6c2" } },
    { scope: "property", settings: { foreground: "#e06c75" } }
  ]
};
const solarizedDark = {
  id: "nexoft-themes.solarized-dark",
  name: "Solarized Dark",
  type: "dark",
  colors: {
    // Backgrounds
    "--color-background": "#002b36",
    "--color-surface": "#073642",
    "--color-surface-elevated": "#094050",
    "--color-surface-hover": "#0a4f5e",
    // Depth
    "--color-bg-level-0": "#00212b",
    "--color-bg-level-1": "#002b36",
    "--color-bg-level-2": "#05313c",
    "--color-bg-level-3": "#073642",
    // Borders
    "--color-border": "#094050",
    "--color-border-muted": "#073642",
    "--color-border-active": "#268bd2",
    "--color-border-subtle": "#073642",
    // Text
    "--color-text-primary": "#839496",
    "--color-text-secondary": "#93a1a1",
    "--color-text-muted": "#657b83",
    "--color-text-subtle": "#586e75",
    // Accents (Blue)
    "--color-accent": "#268bd2",
    "--color-accent-hover": "#2aa198",
    "--color-accent-subtle": "rgba(38, 139, 210, 0.15)",
    "--color-accent-muted": "rgba(38, 139, 210, 0.08)",
    // Interactive
    "--color-interactive": "#094050",
    "--color-interactive-hover": "#0a4f5e",
    "--color-interactive-active": "#268bd2",
    // Status
    "--color-error": "#dc322f",
    "--color-success": "#859900",
    "--color-warning": "#b58900",
    "--color-info": "#268bd2"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#586e75", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#859900" } },
    { scope: "string", settings: { foreground: "#2aa198" } },
    { scope: "number", settings: { foreground: "#d33682" } },
    { scope: "function", settings: { foreground: "#268bd2" } },
    { scope: "variable", settings: { foreground: "#b58900" } },
    { scope: "type", settings: { foreground: "#b58900" } },
    { scope: "tag", settings: { foreground: "#268bd2" } },
    { scope: "attribute", settings: { foreground: "#93a1a1" } },
    { scope: "operator", settings: { foreground: "#859900" } },
    { scope: "property", settings: { foreground: "#268bd2" } }
  ]
};
const solarizedLight = {
  id: "nexoft-themes.solarized-light",
  name: "Solarized Light",
  type: "light",
  colors: {
    // Backgrounds
    "--color-background": "#fdf6e3",
    "--color-surface": "#eee8d5",
    "--color-surface-elevated": "#e6dfcc",
    "--color-surface-hover": "#ded7c4",
    // Depth
    "--color-bg-level-0": "#eee8d5",
    "--color-bg-level-1": "#fdf6e3",
    "--color-bg-level-2": "#f5eedb",
    "--color-bg-level-3": "#eee8d5",
    // Borders
    "--color-border": "#ded7c4",
    "--color-border-muted": "#eee8d5",
    "--color-border-active": "#268bd2",
    "--color-border-subtle": "#eee8d5",
    // Text
    "--color-text-primary": "#657b83",
    "--color-text-secondary": "#586e75",
    "--color-text-muted": "#839496",
    "--color-text-subtle": "#93a1a1",
    // Accents (Blue)
    "--color-accent": "#268bd2",
    "--color-accent-hover": "#2aa198",
    "--color-accent-subtle": "rgba(38, 139, 210, 0.12)",
    "--color-accent-muted": "rgba(38, 139, 210, 0.06)",
    // Interactive
    "--color-interactive": "#eee8d5",
    "--color-interactive-hover": "#e6dfcc",
    "--color-interactive-active": "#ded7c4",
    // Status
    "--color-error": "#dc322f",
    "--color-success": "#859900",
    "--color-warning": "#b58900",
    "--color-info": "#268bd2"
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#93a1a1", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#859900" } },
    { scope: "string", settings: { foreground: "#2aa198" } },
    { scope: "number", settings: { foreground: "#d33682" } },
    { scope: "function", settings: { foreground: "#268bd2" } },
    { scope: "variable", settings: { foreground: "#b58900" } },
    { scope: "type", settings: { foreground: "#b58900" } },
    { scope: "tag", settings: { foreground: "#268bd2" } },
    { scope: "attribute", settings: { foreground: "#657b83" } },
    { scope: "operator", settings: { foreground: "#859900" } },
    { scope: "property", settings: { foreground: "#268bd2" } }
  ]
};
const catppuccinMocha = {
  id: "nexoft-themes.catppuccin-mocha",
  name: "Catppuccin Mocha",
  type: "dark",
  colors: {
    // Backgrounds (Base, Mantle, Crust)
    "--color-background": "#1e1e2e",
    "--color-surface": "#313244",
    "--color-surface-elevated": "#45475a",
    "--color-surface-hover": "#585b70",
    // Depth
    "--color-bg-level-0": "#11111b",
    // Crust
    "--color-bg-level-1": "#181825",
    // Mantle
    "--color-bg-level-2": "#1e1e2e",
    // Base
    "--color-bg-level-3": "#313244",
    // Surface0
    // Borders
    "--color-border": "#45475a",
    "--color-border-muted": "#313244",
    "--color-border-active": "#cba6f7",
    // Mauve
    "--color-border-subtle": "#313244",
    // Text
    "--color-text-primary": "#cdd6f4",
    // Text
    "--color-text-secondary": "#bac2de",
    // Subtext1
    "--color-text-muted": "#a6adc8",
    // Subtext0
    "--color-text-subtle": "#6c7086",
    // Overlay0
    // Accents (Mauve - purple)
    "--color-accent": "#cba6f7",
    "--color-accent-hover": "#f5c2e7",
    // Pink
    "--color-accent-subtle": "rgba(203, 166, 247, 0.15)",
    "--color-accent-muted": "rgba(203, 166, 247, 0.08)",
    // Interactive
    "--color-interactive": "#45475a",
    "--color-interactive-hover": "#585b70",
    "--color-interactive-active": "#6c7086",
    // Status
    "--color-error": "#f38ba8",
    // Red
    "--color-success": "#a6e3a1",
    // Green
    "--color-warning": "#f9e2af",
    // Yellow
    "--color-info": "#89b4fa"
    // Blue
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#6c7086", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#cba6f7" } },
    // Mauve
    { scope: "string", settings: { foreground: "#a6e3a1" } },
    // Green
    { scope: "number", settings: { foreground: "#fab387" } },
    // Peach
    { scope: "function", settings: { foreground: "#89b4fa" } },
    // Blue
    { scope: "variable", settings: { foreground: "#cdd6f4" } },
    // Text
    { scope: "type", settings: { foreground: "#f9e2af" } },
    // Yellow
    { scope: "tag", settings: { foreground: "#cba6f7" } },
    // Mauve
    { scope: "attribute", settings: { foreground: "#89dceb" } },
    // Sky
    { scope: "operator", settings: { foreground: "#89dceb" } },
    // Sky
    { scope: "property", settings: { foreground: "#89b4fa" } }
    // Blue
  ]
};
const catppuccinLatte = {
  id: "nexoft-themes.catppuccin-latte",
  name: "Catppuccin Latte",
  type: "light",
  colors: {
    // Backgrounds (Base, Mantle, Crust)
    "--color-background": "#eff1f5",
    "--color-surface": "#e6e9ef",
    "--color-surface-elevated": "#dce0e8",
    "--color-surface-hover": "#ccd0da",
    // Depth
    "--color-bg-level-0": "#e6e9ef",
    // Mantle
    "--color-bg-level-1": "#eff1f5",
    // Base
    "--color-bg-level-2": "#e6e9ef",
    // Mantle
    "--color-bg-level-3": "#dce0e8",
    // Crust
    // Borders
    "--color-border": "#ccd0da",
    "--color-border-muted": "#dce0e8",
    "--color-border-active": "#8839ef",
    // Mauve
    "--color-border-subtle": "#dce0e8",
    // Text
    "--color-text-primary": "#4c4f69",
    // Text
    "--color-text-secondary": "#5c5f77",
    // Subtext1
    "--color-text-muted": "#6c6f85",
    // Subtext0
    "--color-text-subtle": "#9ca0b0",
    // Overlay0
    // Accents (Mauve - purple)
    "--color-accent": "#8839ef",
    "--color-accent-hover": "#ea76cb",
    // Pink
    "--color-accent-subtle": "rgba(136, 57, 239, 0.12)",
    "--color-accent-muted": "rgba(136, 57, 239, 0.06)",
    // Interactive
    "--color-interactive": "#dce0e8",
    "--color-interactive-hover": "#ccd0da",
    "--color-interactive-active": "#bcc0cc",
    // Status
    "--color-error": "#d20f39",
    // Red
    "--color-success": "#40a02b",
    // Green
    "--color-warning": "#df8e1d",
    // Yellow
    "--color-info": "#1e66f5"
    // Blue
  },
  tokenColors: [
    { scope: "comment", settings: { foreground: "#9ca0b0", fontStyle: "italic" } },
    { scope: "keyword", settings: { foreground: "#8839ef" } },
    // Mauve
    { scope: "string", settings: { foreground: "#40a02b" } },
    // Green
    { scope: "number", settings: { foreground: "#fe640b" } },
    // Peach
    { scope: "function", settings: { foreground: "#1e66f5" } },
    // Blue
    { scope: "variable", settings: { foreground: "#4c4f69" } },
    // Text
    { scope: "type", settings: { foreground: "#df8e1d" } },
    // Yellow
    { scope: "tag", settings: { foreground: "#8839ef" } },
    // Mauve
    { scope: "attribute", settings: { foreground: "#04a5e5" } },
    // Sky
    { scope: "operator", settings: { foreground: "#04a5e5" } },
    // Sky
    { scope: "property", settings: { foreground: "#1e66f5" } }
    // Blue
  ]
};
const allThemes = [
  dracula,
  monokaiPro,
  nord,
  oneDarkPro,
  solarizedDark,
  solarizedLight,
  catppuccinMocha,
  catppuccinLatte
];
function activate(context) {
  console.log("[Nexoft Themes] Extension activated!");
  console.log(`[Nexoft Themes] Registering ${allThemes.length} themes...`);
  for (const theme of allThemes) {
    const disposable = nexcode.theme.registerTheme(theme);
    context.subscriptions.push(disposable);
    console.log(`[Nexoft Themes] Registered: ${theme.name}`);
  }
  const themeCommands = [
    { id: "nexoft-themes.dracula", theme: dracula },
    { id: "nexoft-themes.monokai", theme: monokaiPro },
    { id: "nexoft-themes.nord", theme: nord },
    { id: "nexoft-themes.oneDark", theme: oneDarkPro },
    { id: "nexoft-themes.solarizedDark", theme: solarizedDark },
    { id: "nexoft-themes.solarizedLight", theme: solarizedLight },
    { id: "nexoft-themes.catppuccinMocha", theme: catppuccinMocha },
    { id: "nexoft-themes.catppuccinLatte", theme: catppuccinLatte }
  ];
  for (const { id, theme } of themeCommands) {
    const disposable = nexcode.commands.register(id, () => {
      nexcode.theme.setTheme(theme.id);
      nexcode.window.showMessage(`Applied ${theme.name} theme`, "info");
      nexcode.settings.update("nexoft-themes.lastUsed", theme.id);
    });
    context.subscriptions.push(disposable);
  }
  const cycleCommand = nexcode.commands.register("nexoft-themes.cycle", () => {
    const currentTheme = nexcode.theme.currentTheme;
    const currentIndex = allThemes.findIndex((t) => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % allThemes.length;
    const nextTheme = allThemes[nextIndex];
    nexcode.theme.setTheme(nextTheme.id);
    nexcode.window.showMessage(`Switched to ${nextTheme.name}`, "info");
    nexcode.settings.update("nexoft-themes.lastUsed", nextTheme.id);
  });
  context.subscriptions.push(cycleCommand);
  console.log("[Nexoft Themes] All themes and commands registered!");
}
function deactivate() {
  console.log("[Nexoft Themes] Extension deactivated!");
}
export {
  activate,
  deactivate
};
//# sourceMappingURL=index.mjs.map

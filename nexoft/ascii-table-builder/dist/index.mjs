const BOX_CHARS = {
  horizontal: "─",
  vertical: "│",
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  tDown: "┬",
  tUp: "┴",
  tRight: "├",
  tLeft: "┤",
  cross: "┼"
};
function renderTable(table) {
  var _a, _b, _c;
  const lines = [];
  const { rows, cols, cells, defaultCellWidth } = table;
  const colWidths = [];
  for (let c = 0; c < cols; c++) {
    {
      colWidths[c] = ((_b = (_a = cells[0]) == null ? void 0 : _a[c]) == null ? void 0 : _b.width) || defaultCellWidth;
    }
  }
  {
    lines.push(BOX_CHARS.topLeft + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tDown) + BOX_CHARS.topRight);
    for (let r = 0; r < rows; r++) {
      const cellContents = [];
      for (let c = 0; c < cols; c++) {
        const cell = (_c = cells[r]) == null ? void 0 : _c[c];
        const content = cell ? ` ${cell.content}`.padEnd(colWidths[c]) : " ".repeat(colWidths[c]);
        cellContents.push(content);
      }
      lines.push(BOX_CHARS.vertical + cellContents.join(BOX_CHARS.vertical) + BOX_CHARS.vertical);
      if (r < rows - 1) {
        lines.push(BOX_CHARS.tRight + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.cross) + BOX_CHARS.tLeft);
      }
    }
    lines.push(BOX_CHARS.bottomLeft + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tUp) + BOX_CHARS.bottomRight);
  }
  return lines.join("\n");
}
function activate(context) {
  console.log("[ASCII Table Builder] Activated");
  nexcode.commands.register("ascii-table-builder.open", () => {
    console.log("[ASCII Table Builder] Opening table builder...");
    nexcode.window.openEditorView("ascii-table-builder.view", { viewColumn: 2 });
  });
  nexcode.commands.register("ascii-table-builder.insert", () => {
    console.log("[ASCII Table Builder] Inserting table...");
    const table = {
      rows: 3,
      cols: 3,
      defaultCellWidth: 12,
      cells: Array.from(
        { length: 3 },
        (_, r) => Array.from({ length: 3 }, (_2, c) => ({
          content: r === 0 ? `Header ${c + 1}` : `Cell ${r},${c + 1}`,
          rowSpan: 1,
          colSpan: 1,
          width: 12
        }))
      )
    };
    nexcode.editor.insertText(renderTable(table));
  });
}
function deactivate() {
  console.log("[ASCII Table Builder] Deactivated");
}
export {
  activate,
  deactivate
};
//# sourceMappingURL=index.mjs.map

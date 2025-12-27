
(function() {
    const style = document.createElement('style');
    style.setAttribute('data-extension-css', 'components/TableBuilderView.mjs');
    style.textContent = "\n.ascii-designer[data-v-5df9115f] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    background: var(--color-bg-level-1, #09090b);\r\n    color: var(--color-text-primary, #fafafa);\r\n    font-family: system-ui, -apple-system, sans-serif;\n}\n.toolbar[data-v-5df9115f] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    padding: 0.75rem 1rem;\r\n    background: var(--color-bg-level-0, #070708);\r\n    border-bottom: 1px solid var(--color-border, #27272a);\r\n    flex-wrap: wrap;\n}\n.tool-group[data-v-5df9115f] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    align-items: center;\n}\n.tool-btn[data-v-5df9115f],\r\n.action-btn[data-v-5df9115f] {\r\n    padding: 0.5rem 1rem;\r\n    border: 1px solid var(--color-border, #27272a);\r\n    border-radius: 4px;\r\n    background: var(--color-surface, #18181b);\r\n    color: var(--color-text-primary, #fafafa);\r\n    font-size: 0.875rem;\r\n    cursor: pointer;\r\n    transition: all 0.2s;\n}\n.tool-btn[data-v-5df9115f]:hover,\r\n.action-btn[data-v-5df9115f]:hover:not(:disabled) {\r\n    background: var(--color-surface-hover, #27272a);\r\n    transform: translateY(-1px);\n}\n.tool-btn.active[data-v-5df9115f] {\r\n    background: var(--color-accent, #fafafa);\r\n    color: var(--color-background, #09090b);\r\n    border-color: var(--color-accent, #fafafa);\n}\n.action-btn[data-v-5df9115f]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\n}\n.action-btn.danger[data-v-5df9115f]:hover:not(:disabled) {\r\n    background: var(--color-error, #ef4444);\r\n    border-color: var(--color-error, #ef4444);\n}\n.workspace[data-v-5df9115f] {\r\n    display: flex;\r\n    flex: 1;\r\n    overflow: hidden;\n}\n.canvas-container[data-v-5df9115f] {\r\n    flex: 1;\r\n    overflow: auto;\r\n    padding: 2rem;\r\n    background: var(--color-bg-level-2, #0f0f11);\n}\n.canvas[data-v-5df9115f] {\r\n    position: relative;\r\n    background: var(--color-bg-level-1, #09090b);\r\n    border: 1px solid var(--color-border, #27272a);\r\n    font-family: 'Courier New', Courier, monospace;\r\n    font-variant-ligatures: none;\r\n    text-rendering: optimizeSpeed;\r\n    -webkit-font-smoothing: none;\r\n    user-select: none;\r\n    overflow: hidden;\n}\n.grid-bg[data-v-5df9115f] {\r\n    position: absolute;\r\n    inset: 0;\r\n    background-image:\r\n        linear-gradient(var(--color-border-muted, #27272a) 1px, transparent 1px),\r\n        linear-gradient(90deg, var(--color-border-muted, #27272a) 1px, transparent 1px);\r\n    pointer-events: none;\r\n    opacity: 0.5;\n}\n.ascii-output[data-v-5df9115f] {\r\n    position: absolute;\r\n    inset: 0;\r\n    margin: 0;\r\n    padding: 0;\r\n    white-space: pre;\r\n    pointer-events: none;\r\n    color: var(--color-text-primary, #e0e0e0);\r\n    font-family: inherit;\r\n    line-height: inherit;\r\n    font-size: inherit;\r\n    letter-spacing: 0;\r\n    word-spacing: 0;\n}\n.element-overlay[data-v-5df9115f] {\r\n    position: absolute;\r\n    border: 2px dashed transparent;\r\n    transition: border-color 0.15s;\r\n    box-sizing: border-box;\n}\n.element-overlay[data-v-5df9115f]:hover {\r\n    border-color: var(--color-accent-subtle, rgba(255, 255, 255, 0.2));\r\n    background: var(--color-accent-muted, rgba(255, 255, 255, 0.05));\n}\n.element-overlay.selected[data-v-5df9115f] {\r\n    border-color: var(--color-accent, #fafafa);\r\n    background: var(--color-accent-muted, rgba(255, 255, 255, 0.05));\n}\n.element-overlay.dragging[data-v-5df9115f] {\r\n    border-color: var(--color-success, #22c55e);\r\n    background: rgba(34, 197, 94, 0.1);\n}\n.element-label[data-v-5df9115f] {\r\n    position: absolute;\r\n    top: -22px;\r\n    left: 0;\r\n    padding: 2px 8px;\r\n    background: var(--color-accent, #fafafa);\r\n    color: var(--color-background, #09090b);\r\n    font-size: 10px;\r\n    font-weight: 500;\r\n    border-radius: 3px;\r\n    opacity: 0;\r\n    transition: opacity 0.15s;\r\n    text-transform: capitalize;\n}\n.element-overlay:hover .element-label[data-v-5df9115f],\r\n.element-overlay.selected .element-label[data-v-5df9115f] {\r\n    opacity: 1;\n}\n.element-overlay.resizing[data-v-5df9115f] {\r\n    border-color: var(--color-info, #3b82f6);\r\n    background: rgba(59, 130, 246, 0.1);\n}\r\n\r\n/* Resize handles */\n.resize-handle[data-v-5df9115f] {\r\n    position: absolute;\r\n    background: var(--color-accent, #fafafa);\r\n    border: 1px solid var(--color-background, #09090b);\r\n    border-radius: 2px;\r\n    z-index: 10;\n}\r\n\r\n/* Corner handles */\n.resize-handle.nw[data-v-5df9115f],\r\n.resize-handle.ne[data-v-5df9115f],\r\n.resize-handle.sw[data-v-5df9115f],\r\n.resize-handle.se[data-v-5df9115f] {\r\n    width: 8px;\r\n    height: 8px;\n}\n.resize-handle.nw[data-v-5df9115f] {\r\n    top: -4px;\r\n    left: -4px;\r\n    cursor: nw-resize;\n}\n.resize-handle.ne[data-v-5df9115f] {\r\n    top: -4px;\r\n    right: -4px;\r\n    cursor: ne-resize;\n}\n.resize-handle.sw[data-v-5df9115f] {\r\n    bottom: -4px;\r\n    left: -4px;\r\n    cursor: sw-resize;\n}\n.resize-handle.se[data-v-5df9115f] {\r\n    bottom: -4px;\r\n    right: -4px;\r\n    cursor: se-resize;\n}\r\n\r\n/* Edge handles */\n.resize-handle.n[data-v-5df9115f],\r\n.resize-handle.s[data-v-5df9115f] {\r\n    width: 16px;\r\n    height: 6px;\r\n    left: 50%;\r\n    transform: translateX(-50%);\n}\n.resize-handle.w[data-v-5df9115f],\r\n.resize-handle.e[data-v-5df9115f] {\r\n    width: 6px;\r\n    height: 16px;\r\n    top: 50%;\r\n    transform: translateY(-50%);\n}\n.resize-handle.n[data-v-5df9115f] {\r\n    top: -3px;\r\n    cursor: n-resize;\n}\n.resize-handle.s[data-v-5df9115f] {\r\n    bottom: -3px;\r\n    cursor: s-resize;\n}\n.resize-handle.w[data-v-5df9115f] {\r\n    left: -3px;\r\n    cursor: w-resize;\n}\n.resize-handle.e[data-v-5df9115f] {\r\n    right: -3px;\r\n    cursor: e-resize;\n}\n.resize-handle[data-v-5df9115f]:hover {\r\n    background: var(--color-info, #3b82f6);\n}\n.properties-panel[data-v-5df9115f] {\r\n    width: 300px;\r\n    padding: 1rem;\r\n    background: var(--color-bg-level-0, #070708);\r\n    border-left: 1px solid var(--color-border, #27272a);\r\n    overflow-y: auto;\n}\n.properties-panel h3[data-v-5df9115f] {\r\n    margin: 0 0 1rem 0;\r\n    font-size: 1rem;\r\n    color: var(--color-text-primary, #fafafa);\n}\n.properties-panel h4[data-v-5df9115f] {\r\n    margin: 1rem 0 0.5rem 0;\r\n    font-size: 0.875rem;\r\n    color: var(--color-text-secondary, #a1a1aa);\n}\n.property-group[data-v-5df9115f] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    margin-bottom: 1rem;\n}\n.property-group label[data-v-5df9115f] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\r\n    font-size: 0.8rem;\r\n    color: var(--color-text-secondary, #a1a1aa);\n}\n.property-group input[type=\"number\"][data-v-5df9115f],\r\n.property-group select[data-v-5df9115f],\r\n.property-group textarea[data-v-5df9115f] {\r\n    padding: 0.4rem;\r\n    border: 1px solid var(--color-border, #27272a);\r\n    border-radius: 4px;\r\n    background: var(--color-bg-level-2, #0f0f11);\r\n    color: var(--color-text-primary, #fafafa);\r\n    font-size: 0.8rem;\n}\n.cell-grid[data-v-5df9115f] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\n}\n.cell-row[data-v-5df9115f] {\r\n    display: flex;\r\n    gap: 0.25rem;\n}\n.cell-input[data-v-5df9115f] {\r\n    flex: 1;\r\n    padding: 0.3rem;\r\n    border: 1px solid var(--color-border, #27272a);\r\n    border-radius: 3px;\r\n    background: var(--color-bg-level-2, #0f0f11);\r\n    color: var(--color-text-primary, #fafafa);\r\n    font-family: 'Courier New', monospace;\r\n    font-size: 0.7rem;\r\n    min-width: 0;\n}\n.cell-input.header[data-v-5df9115f] {\r\n    background: var(--color-surface, #18181b);\r\n    font-weight: 600;\n}\r\n";
    document.head.appendChild(style);
})();
import { defineComponent, ref, onMounted, computed, createElementBlock, openBlock, createElementVNode, createCommentVNode, normalizeClass, toDisplayString, normalizeStyle, Fragment, renderList, withModifiers, createTextVNode, withDirectives, vModelText, vModelSelect, vModelCheckbox, createStaticVNode } from "vue";
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
  cross: "┼",
  fill: "█"
};
const BOX_CHAR_CONNECTIONS = {
  "─": [false, true, false, true],
  // horizontal
  "│": [true, false, true, false],
  // vertical
  "┌": [false, true, true, false],
  // top-left
  "┐": [false, false, true, true],
  // top-right
  "└": [true, true, false, false],
  // bottom-left
  "┘": [true, false, false, true],
  // bottom-right
  "┬": [false, true, true, true],
  // t-down
  "┴": [true, true, false, true],
  // t-up
  "├": [true, true, true, false],
  // t-right
  "┤": [true, false, true, true],
  // t-left
  "┼": [true, true, true, true]
  // cross
};
function getBoxChar(up, right, down, left) {
  if (up && right && down && left) return "┼";
  if (up && right && down && !left) return "├";
  if (up && !right && down && left) return "┤";
  if (!up && right && down && left) return "┬";
  if (up && right && !down && left) return "┴";
  if (!up && right && down && !left) return "┌";
  if (!up && !right && down && left) return "┐";
  if (up && right && !down && !left) return "└";
  if (up && !right && !down && left) return "┘";
  if (!up && right && !down && left) return "─";
  if (up && !right && down && !left) return "│";
  return " ";
}
function isBoxChar(char) {
  return BOX_CHAR_CONNECTIONS[char] !== void 0;
}
function mergeBoxChars(existing, incoming) {
  if (!isBoxChar(existing)) return incoming;
  if (!isBoxChar(incoming)) return existing;
  const existingConn = BOX_CHAR_CONNECTIONS[existing];
  const incomingConn = BOX_CHAR_CONNECTIONS[incoming];
  const merged = [
    existingConn[0] || incomingConn[0],
    // up
    existingConn[1] || incomingConn[1],
    // right
    existingConn[2] || incomingConn[2],
    // down
    existingConn[3] || incomingConn[3]
    // left
  ];
  return getBoxChar(merged[0], merged[1], merged[2], merged[3]);
}
function renderTable(table) {
  var _a, _b, _c, _d, _e, _f;
  const lines = [];
  const { rows, cols, cells, style, autoSize, defaultCellWidth } = table;
  const colWidths = [];
  for (let c = 0; c < cols; c++) {
    if (autoSize) {
      let maxWidth = 0;
      for (let r = 0; r < rows; r++) {
        const cell = (_a = cells[r]) == null ? void 0 : _a[c];
        if (cell) {
          maxWidth = Math.max(maxWidth, cell.content.length + 2);
        }
      }
      colWidths[c] = Math.max(maxWidth, 8);
    } else {
      colWidths[c] = ((_c = (_b = cells[0]) == null ? void 0 : _b[c]) == null ? void 0 : _c.width) || defaultCellWidth;
    }
  }
  if (style === "box") {
    lines.push(BOX_CHARS.topLeft + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tDown) + BOX_CHARS.topRight);
    for (let r = 0; r < rows; r++) {
      const cellContents = [];
      for (let c = 0; c < cols; c++) {
        const cell = (_d = cells[r]) == null ? void 0 : _d[c];
        const content = cell ? ` ${cell.content}`.padEnd(colWidths[c]) : " ".repeat(colWidths[c]);
        cellContents.push(content);
      }
      lines.push(BOX_CHARS.vertical + cellContents.join(BOX_CHARS.vertical) + BOX_CHARS.vertical);
      if (r < rows - 1) {
        lines.push(BOX_CHARS.tRight + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.cross) + BOX_CHARS.tLeft);
      }
    }
    lines.push(BOX_CHARS.bottomLeft + colWidths.map((w) => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tUp) + BOX_CHARS.bottomRight);
  } else if (style === "simple" || style === "markdown") {
    for (let r = 0; r < rows; r++) {
      const cellContents = [];
      for (let c = 0; c < cols; c++) {
        const cell = (_e = cells[r]) == null ? void 0 : _e[c];
        const content = cell ? cell.content.padEnd(colWidths[c]) : " ".repeat(colWidths[c]);
        cellContents.push(content);
      }
      lines.push("| " + cellContents.join(" | ") + " |");
      if (r === 0) {
        lines.push("|" + colWidths.map((w) => "-".repeat(w + 2)).join("|") + "|");
      }
    }
  } else if (style === "grid") {
    const separator = "+" + colWidths.map((w) => "-".repeat(w + 2)).join("+") + "+";
    lines.push(separator);
    for (let r = 0; r < rows; r++) {
      const cellContents = [];
      for (let c = 0; c < cols; c++) {
        const cell = (_f = cells[r]) == null ? void 0 : _f[c];
        const content = cell ? ` ${cell.content}`.padEnd(colWidths[c] + 1) : " ".repeat(colWidths[c] + 1);
        cellContents.push(content);
      }
      lines.push("|" + cellContents.join("|") + "|");
      lines.push(separator);
    }
  }
  return lines.join("\n");
}
function renderBox(box) {
  const lines = [];
  const { filled, content, autoSize, textAlign } = box;
  const contentLines = content ? content.split("\n") : [];
  let width;
  let height;
  if (autoSize && contentLines.length > 0) {
    const maxContentWidth = Math.max(...contentLines.map((l) => l.length));
    width = Math.max(maxContentWidth + 4, 5);
    height = contentLines.length + 2;
  } else {
    width = box.size.width;
    height = box.size.height;
  }
  const innerWidth = width - 2;
  const innerHeight = height - 2;
  const [vAlign, hAlign] = (textAlign || "top-left").split("-");
  let verticalOffset;
  if (vAlign === "top") {
    verticalOffset = 0;
  } else if (vAlign === "center") {
    verticalOffset = Math.floor((innerHeight - contentLines.length) / 2);
  } else {
    verticalOffset = innerHeight - contentLines.length;
  }
  verticalOffset = Math.max(0, verticalOffset);
  function alignLine(text) {
    if (hAlign === "left") {
      return (" " + text).padEnd(innerWidth);
    } else if (hAlign === "center") {
      const totalPad = innerWidth - text.length;
      const leftPad = Math.floor(totalPad / 2);
      const rightPad = totalPad - leftPad;
      return " ".repeat(leftPad) + text + " ".repeat(rightPad);
    } else {
      return (text + " ").padStart(innerWidth);
    }
  }
  lines.push(BOX_CHARS.topLeft + BOX_CHARS.horizontal.repeat(innerWidth) + BOX_CHARS.topRight);
  for (let i = 0; i < innerHeight; i++) {
    let rowContent;
    if (filled) {
      rowContent = BOX_CHARS.fill.repeat(innerWidth);
    } else {
      const contentIndex = i - verticalOffset;
      if (contentIndex >= 0 && contentIndex < contentLines.length) {
        rowContent = alignLine(contentLines[contentIndex]);
      } else {
        rowContent = " ".repeat(innerWidth);
      }
    }
    lines.push(BOX_CHARS.vertical + rowContent + BOX_CHARS.vertical);
  }
  lines.push(BOX_CHARS.bottomLeft + BOX_CHARS.horizontal.repeat(innerWidth) + BOX_CHARS.bottomRight);
  return lines.join("\n");
}
function renderLine(line) {
  const { position, end, horizontal } = line;
  const length = horizontal ? Math.abs(end.x - position.x) + 1 : Math.abs(end.y - position.y) + 1;
  const char = horizontal ? BOX_CHARS.horizontal : BOX_CHARS.vertical;
  if (horizontal) {
    return char.repeat(length);
  } else {
    return Array(length).fill(char).join("\n");
  }
}
function renderToGrid(elements, gridWidth, gridHeight) {
  const grid = Array.from(
    { length: gridHeight },
    () => Array(gridWidth).fill(" ")
  );
  const sorted = [...elements].sort((a, b) => {
    const order = { table: 0, box: 1, line: 2, text: 3 };
    return (order[a.type] || 0) - (order[b.type] || 0);
  });
  for (const element of sorted) {
    let ascii = "";
    if (element.type === "table") {
      ascii = renderTable(element);
    } else if (element.type === "box") {
      ascii = renderBox(element);
    } else if (element.type === "line") {
      ascii = renderLine(element);
    } else if (element.type === "text") {
      ascii = element.content;
    }
    const lines = ascii.split("\n");
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        const gridY = element.position.y + y;
        const gridX = element.position.x + x;
        if (gridY >= 0 && gridY < grid.length && gridX >= 0 && gridX < grid[0].length) {
          const incomingChar = line[x];
          if (incomingChar !== " ") {
            const existingChar = grid[gridY][gridX];
            if (isBoxChar(existingChar) && isBoxChar(incomingChar)) {
              grid[gridY][gridX] = mergeBoxChars(existingChar, incomingChar);
            } else {
              grid[gridY][gridX] = incomingChar;
            }
          }
        }
      }
    }
  }
  return grid;
}
function gridToString(grid) {
  return grid.map((row) => row.join("")).join("\n");
}
const _hoisted_1 = { class: "ascii-designer" };
const _hoisted_2 = { class: "toolbar" };
const _hoisted_3 = { class: "tool-group" };
const _hoisted_4 = { class: "tool-group" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0,
  class: "tool-group"
};
const _hoisted_8 = { class: "workspace" };
const _hoisted_9 = { class: "canvas-container" };
const _hoisted_10 = { class: "ascii-output" };
const _hoisted_11 = ["onMousedown"];
const _hoisted_12 = { class: "element-label" };
const _hoisted_13 = ["onMousedown"];
const _hoisted_14 = ["onMousedown"];
const _hoisted_15 = ["onMousedown"];
const _hoisted_16 = ["onMousedown"];
const _hoisted_17 = ["onMousedown"];
const _hoisted_18 = ["onMousedown"];
const _hoisted_19 = ["onMousedown"];
const _hoisted_20 = ["onMousedown"];
const _hoisted_21 = {
  key: 0,
  class: "properties-panel"
};
const _hoisted_22 = { class: "property-group" };
const _hoisted_23 = { class: "property-group" };
const _hoisted_24 = { key: 0 };
const _hoisted_25 = { class: "cell-editor" };
const _hoisted_26 = { class: "cell-grid" };
const _hoisted_27 = ["onUpdate:modelValue"];
const _hoisted_28 = { class: "property-group" };
const _hoisted_29 = { class: "property-group" };
const _hoisted_30 = {
  key: 2,
  class: "property-group"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TableBuilderView",
  setup(__props) {
    const canvasRef = ref(null);
    const measuredCharWidth = ref(9.6);
    const fontSize = ref(16);
    function measureCharWidth() {
      const span = document.createElement("span");
      span.style.font = `${fontSize.value}px 'Courier New', Courier, monospace`;
      span.style.position = "absolute";
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre";
      span.textContent = "M";
      document.body.appendChild(span);
      const width = span.getBoundingClientRect().width;
      document.body.removeChild(span);
      return width;
    }
    onMounted(() => {
      measuredCharWidth.value = measureCharWidth();
    });
    const charWidth = computed(() => measuredCharWidth.value);
    const charHeight = computed(() => fontSize.value);
    const gridWidth = ref(80);
    const gridHeight = ref(40);
    function toPx(gridCoord, axis) {
      return gridCoord * (axis === "x" ? charWidth.value : charHeight.value);
    }
    function getCanvasCoordinates(event) {
      if (!canvasRef.value) return { x: 0, y: 0 };
      const rect = canvasRef.value.getBoundingClientRect();
      return {
        x: Math.floor((event.clientX - rect.left) / charWidth.value),
        y: Math.floor((event.clientY - rect.top) / charHeight.value)
      };
    }
    const elements = ref([]);
    const selectedElements = ref([]);
    const selectedElement = computed(() => selectedElements.value[0] || null);
    function isSelected(element) {
      return selectedElements.value.some((el) => el.id === element.id);
    }
    const activeTool = ref("select");
    const isDragging = ref(false);
    const dragStart = ref(null);
    const dragOffset = ref(null);
    const dragElement = ref(null);
    const gridCanvas = computed(() => {
      return renderToGrid(elements.value, gridWidth.value, gridHeight.value);
    });
    const asciiOutput = computed(() => {
      return gridToString(gridCanvas.value);
    });
    function getElementSize(element) {
      if (element.type === "table") {
        const table = element;
        const ascii = renderTable(table);
        const lines = ascii.split("\n");
        return {
          width: Math.max(...lines.map((l) => l.length)),
          height: lines.length
        };
      } else if (element.type === "box") {
        const box = element;
        const ascii = renderBox(box);
        const lines = ascii.split("\n");
        return {
          width: Math.max(...lines.map((l) => l.length)),
          height: lines.length
        };
      } else if (element.type === "line") {
        const line = element;
        if (line.horizontal) {
          return { width: Math.abs(line.end.x - line.position.x) + 1, height: 1 };
        } else {
          return { width: 1, height: Math.abs(line.end.y - line.position.y) + 1 };
        }
      } else if (element.type === "text") {
        const text = element;
        const lines = text.content.split("\n");
        return {
          width: Math.max(...lines.map((l) => l.length)),
          height: lines.length
        };
      }
      return { width: 10, height: 5 };
    }
    function createTable(position) {
      const newTable = {
        id: `table-${Date.now()}`,
        type: "table",
        position,
        rows: 3,
        cols: 3,
        style: "box",
        autoSize: false,
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
      elements.value.push(newTable);
      selectedElements.value = [newTable];
    }
    function createBox(position) {
      const newBox = {
        id: `box-${Date.now()}`,
        type: "box",
        position,
        size: { width: 20, height: 10 },
        filled: false,
        content: "",
        autoSize: false,
        textAlign: "top-left"
      };
      elements.value.push(newBox);
      selectedElements.value = [newBox];
    }
    function createLine(position) {
      const newLine = {
        id: `line-${Date.now()}`,
        type: "line",
        position,
        end: { x: position.x + 10, y: position.y },
        style: "single",
        horizontal: true
      };
      elements.value.push(newLine);
      selectedElements.value = [newLine];
    }
    function createText(position) {
      const newText = {
        id: `text-${Date.now()}`,
        type: "text",
        position,
        content: "Text"
      };
      elements.value.push(newText);
      selectedElements.value = [newText];
    }
    function onCanvasClick(event) {
      if (isDragging.value) return;
      const position = getCanvasCoordinates(event);
      if (activeTool.value === "table") {
        createTable(position);
        activeTool.value = "select";
      } else if (activeTool.value === "box") {
        createBox(position);
        activeTool.value = "select";
      } else if (activeTool.value === "line") {
        createLine(position);
        activeTool.value = "select";
      } else if (activeTool.value === "text") {
        createText(position);
        activeTool.value = "select";
      } else if (activeTool.value === "select") {
        const clicked = findElementAtPosition(position);
        if (clicked) {
          if (event.shiftKey) {
            const idx = selectedElements.value.findIndex((el) => el.id === clicked.id);
            if (idx >= 0) {
              selectedElements.value.splice(idx, 1);
            } else {
              selectedElements.value.push(clicked);
            }
          } else {
            selectedElements.value = [clicked];
          }
        } else if (!event.shiftKey) {
          selectedElements.value = [];
        }
      }
    }
    function findElementAtPosition(pos) {
      for (let i = elements.value.length - 1; i >= 0; i--) {
        const el = elements.value[i];
        const size = getElementSize(el);
        if (pos.x >= el.position.x && pos.x < el.position.x + size.width && pos.y >= el.position.y && pos.y < el.position.y + size.height) {
          return el;
        }
      }
      return null;
    }
    function onElementMouseDown(event, element) {
      event.preventDefault();
      event.stopPropagation();
      if (activeTool.value === "select") {
        if (event.shiftKey) {
          const idx = selectedElements.value.findIndex((el) => el.id === element.id);
          if (idx < 0) {
            selectedElements.value.push(element);
          }
        } else if (!selectedElements.value.find((el) => el.id === element.id)) {
          selectedElements.value = [element];
        }
        isDragging.value = true;
        dragElement.value = element;
        const pos = getCanvasCoordinates(event);
        dragStart.value = pos;
        dragOffset.value = {
          x: pos.x - element.position.x,
          y: pos.y - element.position.y
        };
      }
    }
    function onCanvasMouseMove(event) {
      const pos = getCanvasCoordinates(event);
      if (isResizing.value && resizeElement.value && resizeHandle.value) {
        const box = resizeElement.value;
        const handle = resizeHandle.value;
        const start = resizeStart.value;
        const originalPos = resizeOriginalPosition.value;
        const originalSize = resizeOriginalSize.value;
        const deltaX = pos.x - start.x;
        const deltaY = pos.y - start.y;
        const minW = 5;
        const minH = 3;
        if (handle.includes("w")) {
          const newWidth = Math.max(minW, originalSize.width - deltaX);
          const widthDiff = originalSize.width - newWidth;
          box.position.x = originalPos.x + widthDiff;
          box.size.width = newWidth;
        }
        if (handle.includes("e")) {
          box.size.width = Math.max(minW, originalSize.width + deltaX);
        }
        if (handle.includes("n")) {
          const newHeight = Math.max(minH, originalSize.height - deltaY);
          const heightDiff = originalSize.height - newHeight;
          box.position.y = originalPos.y + heightDiff;
          box.size.height = newHeight;
        }
        if (handle.includes("s")) {
          box.size.height = Math.max(minH, originalSize.height + deltaY);
        }
        return;
      }
      if (isDragging.value && dragElement.value && dragOffset.value) {
        dragElement.value.position.x = Math.max(0, pos.x - dragOffset.value.x);
        dragElement.value.position.y = Math.max(0, pos.y - dragOffset.value.y);
      }
    }
    function onCanvasMouseUp() {
      isDragging.value = false;
      dragElement.value = null;
      dragStart.value = null;
      dragOffset.value = null;
      isResizing.value = false;
      resizeElement.value = null;
      resizeHandle.value = null;
      resizeStart.value = null;
      resizeOriginalSize.value = null;
      resizeOriginalPosition.value = null;
    }
    const isResizing = ref(false);
    const resizeElement = ref(null);
    const resizeHandle = ref(null);
    const resizeStart = ref(null);
    const resizeOriginalSize = ref(null);
    const resizeOriginalPosition = ref(null);
    function onResizeHandleMouseDown(event, element, handle) {
      event.preventDefault();
      event.stopPropagation();
      if (element.type !== "box") return;
      const box = element;
      isResizing.value = true;
      resizeElement.value = element;
      resizeHandle.value = handle;
      resizeStart.value = getCanvasCoordinates(event);
      resizeOriginalSize.value = { width: box.size.width, height: box.size.height };
      resizeOriginalPosition.value = { x: box.position.x, y: box.position.y };
    }
    function deleteSelected() {
      for (const sel of selectedElements.value) {
        const index = elements.value.findIndex((el) => el.id === sel.id);
        if (index !== -1) {
          elements.value.splice(index, 1);
        }
      }
      selectedElements.value = [];
    }
    function copyToClipboard() {
      navigator.clipboard.writeText(asciiOutput.value).then(() => console.log("Copied to clipboard")).catch((err) => console.error("Failed to copy:", err));
    }
    function copySelection() {
      if (selectedElements.value.length === 0) return;
      let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
      for (const el of selectedElements.value) {
        const size = getElementSize(el);
        minX = Math.min(minX, el.position.x);
        minY = Math.min(minY, el.position.y);
        maxX = Math.max(maxX, el.position.x + size.width);
        maxY = Math.max(maxY, el.position.y + size.height);
      }
      const width = maxX - minX;
      const height = maxY - minY;
      const adjustedElements = selectedElements.value.map((el) => ({
        ...el,
        position: {
          x: el.position.x - minX,
          y: el.position.y - minY
        }
      }));
      const grid = renderToGrid(adjustedElements, width, height);
      const ascii = gridToString(grid);
      navigator.clipboard.writeText(ascii).then(() => console.log("Selection copied")).catch((err) => console.error("Failed to copy:", err));
    }
    function addRow() {
      var _a;
      if (((_a = selectedElement.value) == null ? void 0 : _a.type) === "table") {
        const table = selectedElement.value;
        table.rows++;
        const newRow = Array.from({ length: table.cols }, (_, c) => ({
          content: `Cell ${table.rows - 1},${c + 1}`,
          rowSpan: 1,
          colSpan: 1,
          width: table.defaultCellWidth
        }));
        table.cells.push(newRow);
      }
    }
    function addColumn() {
      var _a;
      if (((_a = selectedElement.value) == null ? void 0 : _a.type) === "table") {
        const table = selectedElement.value;
        table.cols++;
        table.cells.forEach((row, r) => {
          row.push({
            content: r === 0 ? `Header ${table.cols}` : `Cell ${r},${table.cols}`,
            rowSpan: 1,
            colSpan: 1,
            width: table.defaultCellWidth
          });
        });
      }
    }
    function removeRow() {
      var _a;
      if (((_a = selectedElement.value) == null ? void 0 : _a.type) === "table") {
        const table = selectedElement.value;
        if (table.rows > 1) {
          table.rows--;
          table.cells.pop();
        }
      }
    }
    function removeColumn() {
      var _a;
      if (((_a = selectedElement.value) == null ? void 0 : _a.type) === "table") {
        const table = selectedElement.value;
        if (table.cols > 1) {
          table.cols--;
          table.cells.forEach((row) => row.pop());
        }
      }
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("button", {
              class: normalizeClass([{ active: activeTool.value === "select" }, "tool-btn"]),
              onClick: _cache[0] || (_cache[0] = ($event) => activeTool.value = "select")
            }, " ⬚ Select ", 2),
            createElementVNode("button", {
              class: normalizeClass([{ active: activeTool.value === "table" }, "tool-btn"]),
              onClick: _cache[1] || (_cache[1] = ($event) => activeTool.value = "table")
            }, " ▦ Table ", 2),
            createElementVNode("button", {
              class: normalizeClass([{ active: activeTool.value === "box" }, "tool-btn"]),
              onClick: _cache[2] || (_cache[2] = ($event) => activeTool.value = "box")
            }, " □ Box ", 2),
            createElementVNode("button", {
              class: normalizeClass([{ active: activeTool.value === "line" }, "tool-btn"]),
              onClick: _cache[3] || (_cache[3] = ($event) => activeTool.value = "line")
            }, " ─ Line ", 2),
            createElementVNode("button", {
              class: normalizeClass([{ active: activeTool.value === "text" }, "tool-btn"]),
              onClick: _cache[4] || (_cache[4] = ($event) => activeTool.value = "text")
            }, " A Text ", 2)
          ]),
          createElementVNode("div", _hoisted_4, [
            createElementVNode("button", {
              onClick: copyToClipboard,
              class: "action-btn"
            }, "📋 Copy All"),
            createElementVNode("button", {
              onClick: copySelection,
              class: "action-btn",
              disabled: selectedElements.value.length === 0
            }, " 📄 Copy" + toDisplayString(selectedElements.value.length > 1 ? ` (${selectedElements.value.length})` : ""), 9, _hoisted_5),
            createElementVNode("button", {
              onClick: deleteSelected,
              class: "action-btn danger",
              disabled: selectedElements.value.length === 0
            }, " 🗑️" + toDisplayString(selectedElements.value.length > 1 ? ` (${selectedElements.value.length})` : ""), 9, _hoisted_6)
          ]),
          ((_a = selectedElement.value) == null ? void 0 : _a.type) === "table" ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createElementVNode("button", {
              onClick: addRow,
              class: "action-btn"
            }, "+ Row"),
            createElementVNode("button", {
              onClick: addColumn,
              class: "action-btn"
            }, "+ Col"),
            createElementVNode("button", {
              onClick: removeRow,
              class: "action-btn"
            }, "- Row"),
            createElementVNode("button", {
              onClick: removeColumn,
              class: "action-btn"
            }, "- Col")
          ])) : createCommentVNode("", true)
        ]),
        createElementVNode("div", _hoisted_8, [
          createElementVNode("div", _hoisted_9, [
            createElementVNode("div", {
              ref_key: "canvasRef",
              ref: canvasRef,
              class: "canvas",
              style: normalizeStyle({
                width: `${toPx(gridWidth.value, "x")}px`,
                height: `${toPx(gridHeight.value, "y")}px`,
                fontSize: `${fontSize.value}px`,
                lineHeight: `${fontSize.value}px`
              }),
              onClick: onCanvasClick,
              onMousemove: onCanvasMouseMove,
              onMouseup: onCanvasMouseUp,
              onMouseleave: onCanvasMouseUp
            }, [
              createElementVNode("div", {
                class: "grid-bg",
                style: normalizeStyle({ backgroundSize: `${charWidth.value}px ${charHeight.value}px` })
              }, null, 4),
              createElementVNode("pre", _hoisted_10, toDisplayString(asciiOutput.value), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(elements.value, (element) => {
                var _a2, _b;
                return openBlock(), createElementBlock("div", {
                  key: element.id,
                  class: normalizeClass(["element-overlay", {
                    selected: isSelected(element),
                    dragging: ((_a2 = dragElement.value) == null ? void 0 : _a2.id) === element.id,
                    resizing: ((_b = resizeElement.value) == null ? void 0 : _b.id) === element.id
                  }]),
                  style: normalizeStyle({
                    left: `${toPx(element.position.x, "x")}px`,
                    top: `${toPx(element.position.y, "y")}px`,
                    width: `${toPx(getElementSize(element).width, "x")}px`,
                    height: `${toPx(getElementSize(element).height, "y")}px`,
                    cursor: activeTool.value === "select" ? "move" : "default"
                  }),
                  onMousedown: ($event) => onElementMouseDown($event, element)
                }, [
                  createElementVNode("div", _hoisted_12, toDisplayString(element.type), 1),
                  element.type === "box" && isSelected(element) && !element.autoSize ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createElementVNode("div", {
                      class: "resize-handle nw",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "nw"), ["stop"])
                    }, null, 40, _hoisted_13),
                    createElementVNode("div", {
                      class: "resize-handle ne",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "ne"), ["stop"])
                    }, null, 40, _hoisted_14),
                    createElementVNode("div", {
                      class: "resize-handle sw",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "sw"), ["stop"])
                    }, null, 40, _hoisted_15),
                    createElementVNode("div", {
                      class: "resize-handle se",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "se"), ["stop"])
                    }, null, 40, _hoisted_16),
                    createElementVNode("div", {
                      class: "resize-handle n",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "n"), ["stop"])
                    }, null, 40, _hoisted_17),
                    createElementVNode("div", {
                      class: "resize-handle s",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "s"), ["stop"])
                    }, null, 40, _hoisted_18),
                    createElementVNode("div", {
                      class: "resize-handle w",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "w"), ["stop"])
                    }, null, 40, _hoisted_19),
                    createElementVNode("div", {
                      class: "resize-handle e",
                      onMousedown: withModifiers(($event) => onResizeHandleMouseDown($event, element, "e"), ["stop"])
                    }, null, 40, _hoisted_20)
                  ], 64)) : createCommentVNode("", true)
                ], 46, _hoisted_11);
              }), 128))
            ], 36)
          ]),
          selectedElement.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
            _cache[33] || (_cache[33] = createElementVNode("h3", null, "Properties", -1)),
            createElementVNode("div", _hoisted_22, [
              createElementVNode("label", null, [
                _cache[17] || (_cache[17] = createTextVNode("Type: ", -1)),
                createElementVNode("strong", null, toDisplayString(selectedElement.value.type), 1)
              ]),
              createElementVNode("label", null, [
                _cache[18] || (_cache[18] = createTextVNode("X: ", -1)),
                withDirectives(createElementVNode("input", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => selectedElement.value.position.x = $event),
                  type: "number"
                }, null, 512), [
                  [
                    vModelText,
                    selectedElement.value.position.x,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              createElementVNode("label", null, [
                _cache[19] || (_cache[19] = createTextVNode("Y: ", -1)),
                withDirectives(createElementVNode("input", {
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => selectedElement.value.position.y = $event),
                  type: "number"
                }, null, 512), [
                  [
                    vModelText,
                    selectedElement.value.position.y,
                    void 0,
                    { number: true }
                  ]
                ])
              ])
            ]),
            selectedElement.value.type === "table" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("div", _hoisted_23, [
                createElementVNode("label", null, [
                  _cache[21] || (_cache[21] = createTextVNode(" Style: ", -1)),
                  withDirectives(createElementVNode("select", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => selectedElement.value.style = $event)
                  }, [..._cache[20] || (_cache[20] = [
                    createElementVNode("option", { value: "box" }, "Box Drawing", -1),
                    createElementVNode("option", { value: "simple" }, "Simple", -1),
                    createElementVNode("option", { value: "markdown" }, "Markdown", -1),
                    createElementVNode("option", { value: "grid" }, "Grid", -1)
                  ])], 512), [
                    [vModelSelect, selectedElement.value.style]
                  ])
                ]),
                createElementVNode("label", null, [
                  withDirectives(createElementVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => selectedElement.value.autoSize = $event)
                  }, null, 512), [
                    [vModelCheckbox, selectedElement.value.autoSize]
                  ]),
                  _cache[22] || (_cache[22] = createTextVNode(" Auto-size ", -1))
                ]),
                !selectedElement.value.autoSize ? (openBlock(), createElementBlock("label", _hoisted_24, [
                  _cache[23] || (_cache[23] = createTextVNode(" Cell Width: ", -1)),
                  withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => selectedElement.value.defaultCellWidth = $event),
                    type: "number",
                    min: "5",
                    max: "30"
                  }, null, 512), [
                    [
                      vModelText,
                      selectedElement.value.defaultCellWidth,
                      void 0,
                      { number: true }
                    ]
                  ])
                ])) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_25, [
                _cache[24] || (_cache[24] = createElementVNode("h4", null, "Cells", -1)),
                createElementVNode("div", _hoisted_26, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectedElement.value.cells, (row, r) => {
                    return openBlock(), createElementBlock("div", {
                      key: `row-${r}`,
                      class: "cell-row"
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(row, (cell, c) => {
                        return withDirectives((openBlock(), createElementBlock("input", {
                          key: `cell-${r}-${c}`,
                          "onUpdate:modelValue": ($event) => cell.content = $event,
                          type: "text",
                          class: normalizeClass(["cell-input", { header: r === 0 }])
                        }, null, 10, _hoisted_27)), [
                          [vModelText, cell.content]
                        ]);
                      }), 128))
                    ]);
                  }), 128))
                ])
              ])
            ], 64)) : createCommentVNode("", true),
            selectedElement.value.type === "box" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", _hoisted_28, [
                createElementVNode("label", null, [
                  withDirectives(createElementVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => selectedElement.value.autoSize = $event)
                  }, null, 512), [
                    [vModelCheckbox, selectedElement.value.autoSize]
                  ]),
                  _cache[25] || (_cache[25] = createTextVNode(" Auto-size to content ", -1))
                ]),
                !selectedElement.value.autoSize ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("label", null, [
                    _cache[26] || (_cache[26] = createTextVNode("Width: ", -1)),
                    withDirectives(createElementVNode("input", {
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => selectedElement.value.size.width = $event),
                      type: "number",
                      min: "5"
                    }, null, 512), [
                      [
                        vModelText,
                        selectedElement.value.size.width,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createElementVNode("label", null, [
                    _cache[27] || (_cache[27] = createTextVNode("Height: ", -1)),
                    withDirectives(createElementVNode("input", {
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => selectedElement.value.size.height = $event),
                      type: "number",
                      min: "3"
                    }, null, 512), [
                      [
                        vModelText,
                        selectedElement.value.size.height,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ], 64)) : createCommentVNode("", true),
                createElementVNode("label", null, [
                  withDirectives(createElementVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => selectedElement.value.filled = $event)
                  }, null, 512), [
                    [vModelCheckbox, selectedElement.value.filled]
                  ]),
                  _cache[28] || (_cache[28] = createTextVNode(" Filled", -1))
                ])
              ]),
              createElementVNode("div", _hoisted_29, [
                createElementVNode("label", null, [
                  _cache[30] || (_cache[30] = createTextVNode(" Text Align: ", -1)),
                  withDirectives(createElementVNode("select", {
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => selectedElement.value.textAlign = $event)
                  }, [..._cache[29] || (_cache[29] = [
                    createStaticVNode('<option value="top-left" data-v-5df9115f>Top Left</option><option value="top-center" data-v-5df9115f>Top Center</option><option value="top-right" data-v-5df9115f>Top Right</option><option value="center-left" data-v-5df9115f>Center Left</option><option value="center-center" data-v-5df9115f>Center</option><option value="center-right" data-v-5df9115f>Center Right</option><option value="bottom-left" data-v-5df9115f>Bottom Left</option><option value="bottom-center" data-v-5df9115f>Bottom Center</option><option value="bottom-right" data-v-5df9115f>Bottom Right</option>', 9)
                  ])], 512), [
                    [vModelSelect, selectedElement.value.textAlign]
                  ])
                ]),
                createElementVNode("label", null, [
                  _cache[31] || (_cache[31] = createTextVNode(" Content: ", -1)),
                  withDirectives(createElementVNode("textarea", {
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => selectedElement.value.content = $event),
                    rows: "4",
                    placeholder: "Enter text content..."
                  }, null, 512), [
                    [vModelText, selectedElement.value.content]
                  ])
                ])
              ])
            ], 64)) : createCommentVNode("", true),
            selectedElement.value.type === "text" ? (openBlock(), createElementBlock("div", _hoisted_30, [
              createElementVNode("label", null, [
                _cache[32] || (_cache[32] = createTextVNode("Content: ", -1)),
                withDirectives(createElementVNode("textarea", {
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => selectedElement.value.content = $event),
                  rows: "3"
                }, null, 512), [
                  [vModelText, selectedElement.value.content]
                ])
              ])
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const TableBuilderView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5df9115f"]]);
export {
  TableBuilderView as default
};
//# sourceMappingURL=TableBuilderView.mjs.map

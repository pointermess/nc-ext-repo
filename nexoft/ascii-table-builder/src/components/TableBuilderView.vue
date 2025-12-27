<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CanvasElement, Table, Box, Line, TextElement, Coordinate } from '../types'
import { renderToGrid, gridToString, renderTable, renderBox } from '../utils/renderer'

// ============================================
// GRID SIZING - Measure actual character dimensions
// ============================================

const canvasRef = ref<HTMLElement | null>(null)
const measuredCharWidth = ref(9.6) // Default fallback
const fontSize = ref(16)

// Measure actual character width using a hidden element
function measureCharWidth(): number {
    const span = document.createElement('span')
    span.style.font = `${fontSize.value}px 'Courier New', Courier, monospace`
    span.style.position = 'absolute'
    span.style.visibility = 'hidden'
    span.style.whiteSpace = 'pre'
    span.textContent = 'M' // Use M as a reliable measure character
    document.body.appendChild(span)
    const width = span.getBoundingClientRect().width
    document.body.removeChild(span)
    return width
}

onMounted(() => {
    measuredCharWidth.value = measureCharWidth()
})

const charWidth = computed(() => measuredCharWidth.value)
const charHeight = computed(() => fontSize.value)

const gridWidth = ref(80)
const gridHeight = ref(40)

function toPx(gridCoord: number, axis: 'x' | 'y'): number {
    return gridCoord * (axis === 'x' ? charWidth.value : charHeight.value)
}

function getCanvasCoordinates(event: MouseEvent): Coordinate {
    if (!canvasRef.value) return { x: 0, y: 0 }
    const rect = canvasRef.value.getBoundingClientRect()
    return {
        x: Math.floor((event.clientX - rect.left) / charWidth.value),
        y: Math.floor((event.clientY - rect.top) / charHeight.value)
    }
}

// ============================================
// COMPONENT STATE
// ============================================

const elements = ref<CanvasElement[]>([])
const selectedElements = ref<CanvasElement[]>([])
const selectedElement = computed(() => selectedElements.value[0] || null)
function isSelected(element: CanvasElement): boolean {
    return selectedElements.value.some(el => el.id === element.id)
}

type Tool = 'select' | 'table' | 'box' | 'line' | 'text'
const activeTool = ref<Tool>('select')

const isDragging = ref(false)
const dragStart = ref<Coordinate | null>(null)
const dragOffset = ref<Coordinate | null>(null)
const dragElement = ref<CanvasElement | null>(null)

const gridCanvas = computed(() => {
    return renderToGrid(elements.value, gridWidth.value, gridHeight.value)
})

const asciiOutput = computed(() => {
    return gridToString(gridCanvas.value)
})

function getElementSize(element: CanvasElement): { width: number; height: number } {
    if (element.type === 'table') {
        const table = element as Table
        const ascii = renderTable(table)
        const lines = ascii.split('\n')
        return {
            width: Math.max(...lines.map(l => l.length)),
            height: lines.length
        }
    } else if (element.type === 'box') {
        const box = element as Box
        // Use renderBox to get the actual rendered size (handles autoSize)
        const ascii = renderBox(box)
        const lines = ascii.split('\n')
        return {
            width: Math.max(...lines.map(l => l.length)),
            height: lines.length
        }
    } else if (element.type === 'line') {
        const line = element as Line
        if (line.horizontal) {
            return { width: Math.abs(line.end.x - line.position.x) + 1, height: 1 }
        } else {
            return { width: 1, height: Math.abs(line.end.y - line.position.y) + 1 }
        }
    } else if (element.type === 'text') {
        const text = element as TextElement
        const lines = text.content.split('\n')
        return {
            width: Math.max(...lines.map(l => l.length)),
            height: lines.length
        }
    }
    return { width: 10, height: 5 }
}

function createTable(position: Coordinate) {
    const newTable: Table = {
        id: `table-${Date.now()}`,
        type: 'table',
        position,
        rows: 3,
        cols: 3,
        style: 'box',
        autoSize: false,
        defaultCellWidth: 12,
        cells: Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 3 }, (_, c) => ({
                content: r === 0 ? `Header ${c + 1}` : `Cell ${r},${c + 1}`,
                rowSpan: 1,
                colSpan: 1,
                width: 12
            }))
        )
    }
    elements.value.push(newTable)
    selectedElements.value = [newTable]
}

function createBox(position: Coordinate) {
    const newBox: Box = {
        id: `box-${Date.now()}`,
        type: 'box',
        position,
        size: { width: 20, height: 10 },
        filled: false,
        content: '',
        autoSize: false,
        textAlign: 'top-left'
    }
    elements.value.push(newBox)
    selectedElements.value = [newBox]
}

function createLine(position: Coordinate) {
    const newLine: Line = {
        id: `line-${Date.now()}`,
        type: 'line',
        position,
        end: { x: position.x + 10, y: position.y },
        style: 'single',
        horizontal: true
    }
    elements.value.push(newLine)
    selectedElements.value = [newLine]
}

function createText(position: Coordinate) {
    const newText: TextElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        position,
        content: 'Text'
    }
    elements.value.push(newText)
    selectedElements.value = [newText]
}

function onCanvasClick(event: MouseEvent) {
    if (isDragging.value) return

    const position = getCanvasCoordinates(event)

    if (activeTool.value === 'table') {
        createTable(position)
        activeTool.value = 'select'
    } else if (activeTool.value === 'box') {
        createBox(position)
        activeTool.value = 'select'
    } else if (activeTool.value === 'line') {
        createLine(position)
        activeTool.value = 'select'
    } else if (activeTool.value === 'text') {
        createText(position)
        activeTool.value = 'select'
    } else if (activeTool.value === 'select') {
        const clicked = findElementAtPosition(position)
        if (clicked) {
            if (event.shiftKey) {
                // Toggle selection with shift
                const idx = selectedElements.value.findIndex(el => el.id === clicked.id)
                if (idx >= 0) {
                    selectedElements.value.splice(idx, 1)
                } else {
                    selectedElements.value.push(clicked)
                }
            } else {
                selectedElements.value = [clicked]
            }
        } else if (!event.shiftKey) {
            selectedElements.value = []
        }
    }
}

function findElementAtPosition(pos: Coordinate): CanvasElement | null {
    for (let i = elements.value.length - 1; i >= 0; i--) {
        const el = elements.value[i]
        const size = getElementSize(el)

        if (pos.x >= el.position.x && pos.x < el.position.x + size.width &&
            pos.y >= el.position.y && pos.y < el.position.y + size.height) {
            return el
        }
    }
    return null
}

function onElementMouseDown(event: MouseEvent, element: CanvasElement) {
    event.preventDefault()
    event.stopPropagation()

    if (activeTool.value === 'select') {
        // Add to selection with shift, else replace
        if (event.shiftKey) {
            const idx = selectedElements.value.findIndex(el => el.id === element.id)
            if (idx < 0) {
                selectedElements.value.push(element)
            }
        } else if (!selectedElements.value.find(el => el.id === element.id)) {
            selectedElements.value = [element]
        }
        isDragging.value = true
        dragElement.value = element

        const pos = getCanvasCoordinates(event)
        dragStart.value = pos
        dragOffset.value = {
            x: pos.x - element.position.x,
            y: pos.y - element.position.y
        }
    }
}

function onCanvasMouseMove(event: MouseEvent) {
    const pos = getCanvasCoordinates(event)

    // Handle resizing
    if (isResizing.value && resizeElement.value && resizeHandle.value) {
        const box = resizeElement.value as Box
        const handle = resizeHandle.value
        const start = resizeStart.value!
        const originalPos = resizeOriginalPosition.value!
        const originalSize = resizeOriginalSize.value!

        const deltaX = pos.x - start.x
        const deltaY = pos.y - start.y

        // Minimum size
        const minW = 5
        const minH = 3

        // Handle horizontal resize
        if (handle.includes('w')) {
            const newWidth = Math.max(minW, originalSize.width - deltaX)
            const widthDiff = originalSize.width - newWidth
            box.position.x = originalPos.x + widthDiff
            box.size.width = newWidth
        }
        if (handle.includes('e')) {
            box.size.width = Math.max(minW, originalSize.width + deltaX)
        }

        // Handle vertical resize
        if (handle.includes('n')) {
            const newHeight = Math.max(minH, originalSize.height - deltaY)
            const heightDiff = originalSize.height - newHeight
            box.position.y = originalPos.y + heightDiff
            box.size.height = newHeight
        }
        if (handle.includes('s')) {
            box.size.height = Math.max(minH, originalSize.height + deltaY)
        }
        return
    }

    // Handle dragging
    if (isDragging.value && dragElement.value && dragOffset.value) {
        dragElement.value.position.x = Math.max(0, pos.x - dragOffset.value.x)
        dragElement.value.position.y = Math.max(0, pos.y - dragOffset.value.y)
    }
}

function onCanvasMouseUp() {
    isDragging.value = false
    dragElement.value = null
    dragStart.value = null
    dragOffset.value = null

    isResizing.value = false
    resizeElement.value = null
    resizeHandle.value = null
    resizeStart.value = null
    resizeOriginalSize.value = null
    resizeOriginalPosition.value = null
}

// Resize state
type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se'
const isResizing = ref(false)
const resizeElement = ref<CanvasElement | null>(null)
const resizeHandle = ref<ResizeHandle | null>(null)
const resizeStart = ref<Coordinate | null>(null)
const resizeOriginalSize = ref<{ width: number; height: number } | null>(null)
const resizeOriginalPosition = ref<Coordinate | null>(null)

function onResizeHandleMouseDown(event: MouseEvent, element: CanvasElement, handle: ResizeHandle) {
    event.preventDefault()
    event.stopPropagation()

    if (element.type !== 'box') return

    const box = element as Box
    isResizing.value = true
    resizeElement.value = element
    resizeHandle.value = handle
    resizeStart.value = getCanvasCoordinates(event)
    resizeOriginalSize.value = { width: box.size.width, height: box.size.height }
    resizeOriginalPosition.value = { x: box.position.x, y: box.position.y }
}

function deleteSelected() {
    for (const sel of selectedElements.value) {
        const index = elements.value.findIndex(el => el.id === sel.id)
        if (index !== -1) {
            elements.value.splice(index, 1)
        }
    }
    selectedElements.value = []
}

function copyToClipboard() {
    navigator.clipboard.writeText(asciiOutput.value)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => console.error('Failed to copy:', err))
}

function copySelection() {
    if (selectedElements.value.length === 0) return

    // Find bounding box of all selected elements
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0

    for (const el of selectedElements.value) {
        const size = getElementSize(el)
        minX = Math.min(minX, el.position.x)
        minY = Math.min(minY, el.position.y)
        maxX = Math.max(maxX, el.position.x + size.width)
        maxY = Math.max(maxY, el.position.y + size.height)
    }

    // Create a temporary grid for just the selected elements
    const width = maxX - minX
    const height = maxY - minY

    // Create elements with adjusted positions (relative to bounding box)
    const adjustedElements = selectedElements.value.map(el => ({
        ...el,
        position: {
            x: el.position.x - minX,
            y: el.position.y - minY
        }
    }))

    // Render to grid and convert to string
    const grid = renderToGrid(adjustedElements as CanvasElement[], width, height)
    const ascii = gridToString(grid)

    navigator.clipboard.writeText(ascii)
        .then(() => console.log('Selection copied'))
        .catch(err => console.error('Failed to copy:', err))
}

function addRow() {
    if (selectedElement.value?.type === 'table') {
        const table = selectedElement.value as Table
        table.rows++
        const newRow = Array.from({ length: table.cols }, (_, c) => ({
            content: `Cell ${table.rows - 1},${c + 1}`,
            rowSpan: 1,
            colSpan: 1,
            width: table.defaultCellWidth
        }))
        table.cells.push(newRow)
    }
}

function addColumn() {
    if (selectedElement.value?.type === 'table') {
        const table = selectedElement.value as Table
        table.cols++
        table.cells.forEach((row, r) => {
            row.push({
                content: r === 0 ? `Header ${table.cols}` : `Cell ${r},${table.cols}`,
                rowSpan: 1,
                colSpan: 1,
                width: table.defaultCellWidth
            })
        })
    }
}

function removeRow() {
    if (selectedElement.value?.type === 'table') {
        const table = selectedElement.value as Table
        if (table.rows > 1) {
            table.rows--
            table.cells.pop()
        }
    }
}

function removeColumn() {
    if (selectedElement.value?.type === 'table') {
        const table = selectedElement.value as Table
        if (table.cols > 1) {
            table.cols--
            table.cells.forEach(row => row.pop())
        }
    }
}
</script>

<template>
    <div class="ascii-designer">
        <!-- Toolbar -->
        <div class="toolbar">
            <div class="tool-group">
                <button :class="{ active: activeTool === 'select' }" @click="activeTool = 'select'" class="tool-btn">
                    ⬚ Select
                </button>
                <button :class="{ active: activeTool === 'table' }" @click="activeTool = 'table'" class="tool-btn">
                    ▦ Table
                </button>
                <button :class="{ active: activeTool === 'box' }" @click="activeTool = 'box'" class="tool-btn">
                    □ Box
                </button>
                <button :class="{ active: activeTool === 'line' }" @click="activeTool = 'line'" class="tool-btn">
                    ─ Line
                </button>
                <button :class="{ active: activeTool === 'text' }" @click="activeTool = 'text'" class="tool-btn">
                    A Text
                </button>
            </div>

            <div class="tool-group">
                <button @click="copyToClipboard" class="action-btn">📋 Copy All</button>
                <button @click="copySelection" class="action-btn" :disabled="selectedElements.length === 0">
                    📄 Copy{{ selectedElements.length > 1 ? ` (${selectedElements.length})` : '' }}
                </button>
                <button @click="deleteSelected" class="action-btn danger" :disabled="selectedElements.length === 0">
                    🗑️{{ selectedElements.length > 1 ? ` (${selectedElements.length})` : '' }}
                </button>
            </div>

            <div class="tool-group" v-if="selectedElement?.type === 'table'">
                <button @click="addRow" class="action-btn">+ Row</button>
                <button @click="addColumn" class="action-btn">+ Col</button>
                <button @click="removeRow" class="action-btn">- Row</button>
                <button @click="removeColumn" class="action-btn">- Col</button>
            </div>
        </div>

        <!-- Main workspace -->
        <div class="workspace">
            <!-- Canvas -->
            <div class="canvas-container">
                <div ref="canvasRef" class="canvas" :style="{
                    width: `${toPx(gridWidth, 'x')}px`,
                    height: `${toPx(gridHeight, 'y')}px`,
                    fontSize: `${fontSize}px`,
                    lineHeight: `${fontSize}px`,
                }" @click="onCanvasClick" @mousemove="onCanvasMouseMove" @mouseup="onCanvasMouseUp"
                    @mouseleave="onCanvasMouseUp">
                    <!-- Grid background -->
                    <div class="grid-bg" :style="{ backgroundSize: `${charWidth}px ${charHeight}px` }"></div>

                    <!-- ASCII output overlay -->
                    <pre class="ascii-output">{{ asciiOutput }}</pre>

                    <!-- Render elements as overlays for interaction -->
                    <div v-for="element in elements" :key="element.id" class="element-overlay" :class="{
                        selected: isSelected(element),
                        dragging: dragElement?.id === element.id,
                        resizing: resizeElement?.id === element.id
                    }" :style="{
                        left: `${toPx(element.position.x, 'x')}px`,
                        top: `${toPx(element.position.y, 'y')}px`,
                        width: `${toPx(getElementSize(element).width, 'x')}px`,
                        height: `${toPx(getElementSize(element).height, 'y')}px`,
                        cursor: activeTool === 'select' ? 'move' : 'default'
                    }" @mousedown="onElementMouseDown($event, element)">
                        <div class="element-label">{{ element.type }}</div>

                        <!-- Resize handles for boxes -->
                        <template v-if="element.type === 'box' && isSelected(element) && !(element as Box).autoSize">
                            <!-- Corner handles -->
                            <div class="resize-handle nw"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'nw')"></div>
                            <div class="resize-handle ne"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'ne')"></div>
                            <div class="resize-handle sw"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'sw')"></div>
                            <div class="resize-handle se"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'se')"></div>
                            <!-- Edge handles -->
                            <div class="resize-handle n"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'n')"></div>
                            <div class="resize-handle s"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 's')"></div>
                            <div class="resize-handle w"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'w')"></div>
                            <div class="resize-handle e"
                                @mousedown.stop="onResizeHandleMouseDown($event, element, 'e')"></div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Properties panel -->
            <div class="properties-panel" v-if="selectedElement">
                <h3>Properties</h3>

                <div class="property-group">
                    <label>Type: <strong>{{ selectedElement.type }}</strong></label>
                    <label>X: <input v-model.number="selectedElement.position.x" type="number" /></label>
                    <label>Y: <input v-model.number="selectedElement.position.y" type="number" /></label>
                </div>

                <template v-if="selectedElement.type === 'table'">
                    <div class="property-group">
                        <label>
                            Style:
                            <select v-model="(selectedElement as Table).style">
                                <option value="box">Box Drawing</option>
                                <option value="simple">Simple</option>
                                <option value="markdown">Markdown</option>
                                <option value="grid">Grid</option>
                            </select>
                        </label>
                        <label>
                            <input type="checkbox" v-model="(selectedElement as Table).autoSize" />
                            Auto-size
                        </label>
                        <label v-if="!(selectedElement as Table).autoSize">
                            Cell Width:
                            <input v-model.number="(selectedElement as Table).defaultCellWidth" type="number" min="5"
                                max="30" />
                        </label>
                    </div>

                    <div class="cell-editor">
                        <h4>Cells</h4>
                        <div class="cell-grid">
                            <div v-for="(row, r) in (selectedElement as Table).cells" :key="`row-${r}`"
                                class="cell-row">
                                <input v-for="(cell, c) in row" :key="`cell-${r}-${c}`" v-model="cell.content"
                                    type="text" class="cell-input" :class="{ header: r === 0 }" />
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="selectedElement.type === 'box'">
                    <div class="property-group">
                        <label>
                            <input type="checkbox" v-model="(selectedElement as Box).autoSize" />
                            Auto-size to content
                        </label>
                        <template v-if="!(selectedElement as Box).autoSize">
                            <label>Width: <input v-model.number="(selectedElement as Box).size.width" type="number"
                                    min="5" /></label>
                            <label>Height: <input v-model.number="(selectedElement as Box).size.height" type="number"
                                    min="3" /></label>
                        </template>
                        <label><input type="checkbox" v-model="(selectedElement as Box).filled" /> Filled</label>
                    </div>
                    <div class="property-group">
                        <label>
                            Text Align:
                            <select v-model="(selectedElement as Box).textAlign">
                                <option value="top-left">Top Left</option>
                                <option value="top-center">Top Center</option>
                                <option value="top-right">Top Right</option>
                                <option value="center-left">Center Left</option>
                                <option value="center-center">Center</option>
                                <option value="center-right">Center Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="bottom-center">Bottom Center</option>
                                <option value="bottom-right">Bottom Right</option>
                            </select>
                        </label>
                        <label>
                            Content:
                            <textarea v-model="(selectedElement as Box).content" rows="4"
                                placeholder="Enter text content..."></textarea>
                        </label>
                    </div>
                </template>

                <template v-if="selectedElement.type === 'text'">
                    <div class="property-group">
                        <label>Content: <textarea v-model="(selectedElement as TextElement).content"
                                rows="3"></textarea></label>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ascii-designer {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--color-bg-level-1, #09090b);
    color: var(--color-text-primary, #fafafa);
    font-family: system-ui, -apple-system, sans-serif;
}

.toolbar {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--color-bg-level-0, #070708);
    border-bottom: 1px solid var(--color-border, #27272a);
    flex-wrap: wrap;
}

.tool-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.tool-btn,
.action-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border, #27272a);
    border-radius: 4px;
    background: var(--color-surface, #18181b);
    color: var(--color-text-primary, #fafafa);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.tool-btn:hover,
.action-btn:hover:not(:disabled) {
    background: var(--color-surface-hover, #27272a);
    transform: translateY(-1px);
}

.tool-btn.active {
    background: var(--color-accent, #fafafa);
    color: var(--color-background, #09090b);
    border-color: var(--color-accent, #fafafa);
}

.action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.action-btn.danger:hover:not(:disabled) {
    background: var(--color-error, #ef4444);
    border-color: var(--color-error, #ef4444);
}

.workspace {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.canvas-container {
    flex: 1;
    overflow: auto;
    padding: 2rem;
    background: var(--color-bg-level-2, #0f0f11);
}

.canvas {
    position: relative;
    background: var(--color-bg-level-1, #09090b);
    border: 1px solid var(--color-border, #27272a);
    font-family: 'Courier New', Courier, monospace;
    font-variant-ligatures: none;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: none;
    user-select: none;
    overflow: hidden;
}

.grid-bg {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(var(--color-border-muted, #27272a) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border-muted, #27272a) 1px, transparent 1px);
    pointer-events: none;
    opacity: 0.5;
}

.ascii-output {
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 0;
    white-space: pre;
    pointer-events: none;
    color: var(--color-text-primary, #e0e0e0);
    font-family: inherit;
    line-height: inherit;
    font-size: inherit;
    letter-spacing: 0;
    word-spacing: 0;
}

.element-overlay {
    position: absolute;
    border: 2px dashed transparent;
    transition: border-color 0.15s;
    box-sizing: border-box;
}

.element-overlay:hover {
    border-color: var(--color-accent-subtle, rgba(255, 255, 255, 0.2));
    background: var(--color-accent-muted, rgba(255, 255, 255, 0.05));
}

.element-overlay.selected {
    border-color: var(--color-accent, #fafafa);
    background: var(--color-accent-muted, rgba(255, 255, 255, 0.05));
}

.element-overlay.dragging {
    border-color: var(--color-success, #22c55e);
    background: rgba(34, 197, 94, 0.1);
}

.element-label {
    position: absolute;
    top: -22px;
    left: 0;
    padding: 2px 8px;
    background: var(--color-accent, #fafafa);
    color: var(--color-background, #09090b);
    font-size: 10px;
    font-weight: 500;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.15s;
    text-transform: capitalize;
}

.element-overlay:hover .element-label,
.element-overlay.selected .element-label {
    opacity: 1;
}

.element-overlay.resizing {
    border-color: var(--color-info, #3b82f6);
    background: rgba(59, 130, 246, 0.1);
}

/* Resize handles */
.resize-handle {
    position: absolute;
    background: var(--color-accent, #fafafa);
    border: 1px solid var(--color-background, #09090b);
    border-radius: 2px;
    z-index: 10;
}

/* Corner handles */
.resize-handle.nw,
.resize-handle.ne,
.resize-handle.sw,
.resize-handle.se {
    width: 8px;
    height: 8px;
}

.resize-handle.nw {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
}

.resize-handle.ne {
    top: -4px;
    right: -4px;
    cursor: ne-resize;
}

.resize-handle.sw {
    bottom: -4px;
    left: -4px;
    cursor: sw-resize;
}

.resize-handle.se {
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
}

/* Edge handles */
.resize-handle.n,
.resize-handle.s {
    width: 16px;
    height: 6px;
    left: 50%;
    transform: translateX(-50%);
}

.resize-handle.w,
.resize-handle.e {
    width: 6px;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
}

.resize-handle.n {
    top: -3px;
    cursor: n-resize;
}

.resize-handle.s {
    bottom: -3px;
    cursor: s-resize;
}

.resize-handle.w {
    left: -3px;
    cursor: w-resize;
}

.resize-handle.e {
    right: -3px;
    cursor: e-resize;
}

.resize-handle:hover {
    background: var(--color-info, #3b82f6);
}

.properties-panel {
    width: 300px;
    padding: 1rem;
    background: var(--color-bg-level-0, #070708);
    border-left: 1px solid var(--color-border, #27272a);
    overflow-y: auto;
}

.properties-panel h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--color-text-primary, #fafafa);
}

.properties-panel h4 {
    margin: 1rem 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #a1a1aa);
}

.property-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.property-group label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: var(--color-text-secondary, #a1a1aa);
}

.property-group input[type="number"],
.property-group select,
.property-group textarea {
    padding: 0.4rem;
    border: 1px solid var(--color-border, #27272a);
    border-radius: 4px;
    background: var(--color-bg-level-2, #0f0f11);
    color: var(--color-text-primary, #fafafa);
    font-size: 0.8rem;
}

.cell-grid {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.cell-row {
    display: flex;
    gap: 0.25rem;
}

.cell-input {
    flex: 1;
    padding: 0.3rem;
    border: 1px solid var(--color-border, #27272a);
    border-radius: 3px;
    background: var(--color-bg-level-2, #0f0f11);
    color: var(--color-text-primary, #fafafa);
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    min-width: 0;
}

.cell-input.header {
    background: var(--color-surface, #18181b);
    font-weight: 600;
}
</style>

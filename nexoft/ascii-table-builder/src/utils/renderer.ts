import type { Table, Box, Line, TextElement, CanvasElement } from '../types'

// Box drawing character set (single line style only)
const BOX_CHARS = {
    horizontal: '─',
    vertical: '│',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    tDown: '┬',
    tUp: '┴',
    tRight: '├',
    tLeft: '┤',
    cross: '┼',
    fill: '█'
}

// Define which directions each box character connects to
// Directions: [up, right, down, left]
const BOX_CHAR_CONNECTIONS: Record<string, [boolean, boolean, boolean, boolean]> = {
    '─': [false, true, false, true],   // horizontal
    '│': [true, false, true, false],   // vertical
    '┌': [false, true, true, false],   // top-left
    '┐': [false, false, true, true],   // top-right
    '└': [true, true, false, false],   // bottom-left
    '┘': [true, false, false, true],   // bottom-right
    '┬': [false, true, true, true],    // t-down
    '┴': [true, true, false, true],    // t-up
    '├': [true, true, true, false],    // t-right
    '┤': [true, false, true, true],    // t-left
    '┼': [true, true, true, true],     // cross
}

// Map connection pattern to character
function getBoxChar(up: boolean, right: boolean, down: boolean, left: boolean): string {
    if (up && right && down && left) return '┼'
    if (up && right && down && !left) return '├'
    if (up && !right && down && left) return '┤'
    if (!up && right && down && left) return '┬'
    if (up && right && !down && left) return '┴'
    if (!up && right && down && !left) return '┌'
    if (!up && !right && down && left) return '┐'
    if (up && right && !down && !left) return '└'
    if (up && !right && !down && left) return '┘'
    if (!up && right && !down && left) return '─'
    if (up && !right && down && !left) return '│'
    return ' '
}

// Check if a character is a box-drawing character
function isBoxChar(char: string): boolean {
    return BOX_CHAR_CONNECTIONS[char] !== undefined
}

// Merge two box-drawing characters at the same position
function mergeBoxChars(existing: string, incoming: string): string {
    if (!isBoxChar(existing)) return incoming
    if (!isBoxChar(incoming)) return existing

    const existingConn = BOX_CHAR_CONNECTIONS[existing]
    const incomingConn = BOX_CHAR_CONNECTIONS[incoming]

    // Combine the connections from both characters
    const merged: [boolean, boolean, boolean, boolean] = [
        existingConn[0] || incomingConn[0], // up
        existingConn[1] || incomingConn[1], // right
        existingConn[2] || incomingConn[2], // down
        existingConn[3] || incomingConn[3], // left
    ]

    return getBoxChar(merged[0], merged[1], merged[2], merged[3])
}

export function renderTable(table: Table): string {
    const lines: string[] = []
    const { rows, cols, cells, style, autoSize, defaultCellWidth } = table

    const colWidths: number[] = []
    for (let c = 0; c < cols; c++) {
        if (autoSize) {
            let maxWidth = 0
            for (let r = 0; r < rows; r++) {
                const cell = cells[r]?.[c]
                if (cell) {
                    maxWidth = Math.max(maxWidth, cell.content.length + 2)
                }
            }
            colWidths[c] = Math.max(maxWidth, 8)
        } else {
            colWidths[c] = cells[0]?.[c]?.width || defaultCellWidth
        }
    }

    if (style === 'box') {
        lines.push(BOX_CHARS.topLeft + colWidths.map(w => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tDown) + BOX_CHARS.topRight)

        for (let r = 0; r < rows; r++) {
            const cellContents: string[] = []
            for (let c = 0; c < cols; c++) {
                const cell = cells[r]?.[c]
                const content = cell ? ` ${cell.content}`.padEnd(colWidths[c]) : ' '.repeat(colWidths[c])
                cellContents.push(content)
            }
            lines.push(BOX_CHARS.vertical + cellContents.join(BOX_CHARS.vertical) + BOX_CHARS.vertical)

            if (r < rows - 1) {
                lines.push(BOX_CHARS.tRight + colWidths.map(w => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.cross) + BOX_CHARS.tLeft)
            }
        }

        lines.push(BOX_CHARS.bottomLeft + colWidths.map(w => BOX_CHARS.horizontal.repeat(w)).join(BOX_CHARS.tUp) + BOX_CHARS.bottomRight)

    } else if (style === 'simple' || style === 'markdown') {
        for (let r = 0; r < rows; r++) {
            const cellContents: string[] = []
            for (let c = 0; c < cols; c++) {
                const cell = cells[r]?.[c]
                const content = cell ? cell.content.padEnd(colWidths[c]) : ' '.repeat(colWidths[c])
                cellContents.push(content)
            }
            lines.push('| ' + cellContents.join(' | ') + ' |')

            if (r === 0) {
                lines.push('|' + colWidths.map(w => '-'.repeat(w + 2)).join('|') + '|')
            }
        }

    } else if (style === 'grid') {
        const separator = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+'

        lines.push(separator)
        for (let r = 0; r < rows; r++) {
            const cellContents: string[] = []
            for (let c = 0; c < cols; c++) {
                const cell = cells[r]?.[c]
                const content = cell ? ` ${cell.content}`.padEnd(colWidths[c] + 1) : ' '.repeat(colWidths[c] + 1)
                cellContents.push(content)
            }
            lines.push('|' + cellContents.join('|') + '|')
            lines.push(separator)
        }
    }

    return lines.join('\n')
}

export function renderBox(box: Box): string {
    const lines: string[] = []
    const { filled, content, autoSize, textAlign } = box

    // Parse content into lines
    const contentLines = content ? content.split('\n') : []

    // Calculate size based on autoSize
    let width: number
    let height: number

    if (autoSize && contentLines.length > 0) {
        const maxContentWidth = Math.max(...contentLines.map(l => l.length))
        width = Math.max(maxContentWidth + 4, 5) // +4 for borders and padding
        height = contentLines.length + 2 // +2 for top and bottom borders
    } else {
        width = box.size.width
        height = box.size.height
    }

    const innerWidth = width - 2
    const innerHeight = height - 2

    // Parse alignment
    const [vAlign, hAlign] = (textAlign || 'top-left').split('-') as ['top' | 'center' | 'bottom', 'left' | 'center' | 'right']

    // Calculate vertical offset for content (rounded for ASCII)
    let verticalOffset: number
    if (vAlign === 'top') {
        verticalOffset = 0
    } else if (vAlign === 'center') {
        verticalOffset = Math.floor((innerHeight - contentLines.length) / 2)
    } else { // bottom
        verticalOffset = innerHeight - contentLines.length
    }
    verticalOffset = Math.max(0, verticalOffset)

    // Helper function to align a single line horizontally
    function alignLine(text: string): string {
        if (hAlign === 'left') {
            return (' ' + text).padEnd(innerWidth)
        } else if (hAlign === 'center') {
            const totalPad = innerWidth - text.length
            const leftPad = Math.floor(totalPad / 2)
            const rightPad = totalPad - leftPad
            return ' '.repeat(leftPad) + text + ' '.repeat(rightPad)
        } else { // right
            return (text + ' ').padStart(innerWidth)
        }
    }

    // Top border
    lines.push(BOX_CHARS.topLeft + BOX_CHARS.horizontal.repeat(innerWidth) + BOX_CHARS.topRight)

    // Content rows
    for (let i = 0; i < innerHeight; i++) {
        let rowContent: string

        if (filled) {
            rowContent = BOX_CHARS.fill.repeat(innerWidth)
        } else {
            const contentIndex = i - verticalOffset
            if (contentIndex >= 0 && contentIndex < contentLines.length) {
                rowContent = alignLine(contentLines[contentIndex])
            } else {
                rowContent = ' '.repeat(innerWidth)
            }
        }

        lines.push(BOX_CHARS.vertical + rowContent + BOX_CHARS.vertical)
    }

    // Bottom border
    lines.push(BOX_CHARS.bottomLeft + BOX_CHARS.horizontal.repeat(innerWidth) + BOX_CHARS.bottomRight)

    return lines.join('\n')
}

export function renderLine(line: Line): string {
    const { position, end, horizontal } = line
    const length = horizontal
        ? Math.abs(end.x - position.x) + 1
        : Math.abs(end.y - position.y) + 1

    const char = horizontal ? BOX_CHARS.horizontal : BOX_CHARS.vertical

    if (horizontal) {
        return char.repeat(length)
    } else {
        return Array(length).fill(char).join('\n')
    }
}

export function renderToGrid(elements: CanvasElement[], gridWidth: number, gridHeight: number): string[][] {
    const grid: string[][] = Array.from({ length: gridHeight }, () =>
        Array(gridWidth).fill(' ')
    )

    const sorted = [...elements].sort((a, b) => {
        const order: Record<string, number> = { table: 0, box: 1, line: 2, text: 3 }
        return (order[a.type] || 0) - (order[b.type] || 0)
    })

    for (const element of sorted) {
        let ascii = ''
        if (element.type === 'table') {
            ascii = renderTable(element as Table)
        } else if (element.type === 'box') {
            ascii = renderBox(element as Box)
        } else if (element.type === 'line') {
            ascii = renderLine(element as Line)
        } else if (element.type === 'text') {
            ascii = (element as TextElement).content
        }

        const lines = ascii.split('\n')
        for (let y = 0; y < lines.length; y++) {
            const line = lines[y]
            for (let x = 0; x < line.length; x++) {
                const gridY = element.position.y + y
                const gridX = element.position.x + x
                if (gridY >= 0 && gridY < grid.length && gridX >= 0 && gridX < grid[0].length) {
                    const incomingChar = line[x]
                    if (incomingChar !== ' ') {
                        const existingChar = grid[gridY][gridX]
                        // Smart merge box-drawing characters
                        if (isBoxChar(existingChar) && isBoxChar(incomingChar)) {
                            grid[gridY][gridX] = mergeBoxChars(existingChar, incomingChar)
                        } else {
                            grid[gridY][gridX] = incomingChar
                        }
                    }
                }
            }
        }
    }

    return grid
}

export function gridToString(grid: string[][]): string {
    return grid.map(row => row.join('')).join('\n')
}

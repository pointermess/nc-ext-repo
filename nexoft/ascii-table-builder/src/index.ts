/**
 * ASCII Table Builder Extension
 * Provides an interactive table builder for creating ASCII tables
 */
import { renderTable } from './utils/renderer'
import type { Table } from './types'

declare const nexcode: any

export function activate(context: any) {
    console.log('[ASCII Table Builder] Activated')

    // Register command to open the table builder
    nexcode.commands.register('ascii-table-builder.open', () => {
        console.log('[ASCII Table Builder] Opening table builder...')
        nexcode.window.openEditorView('ascii-table-builder.view', { viewColumn: 2 })
    })

    // Register command to insert a table at cursor
    nexcode.commands.register('ascii-table-builder.insert', () => {
        console.log('[ASCII Table Builder] Inserting table...')
        const table: Table = {
            id: 'temp',
            type: 'table',
            position: { x: 0, y: 0 },
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
        nexcode.editor.insertText(renderTable(table))
    })
}

export function deactivate() {
    console.log('[ASCII Table Builder] Deactivated')
}

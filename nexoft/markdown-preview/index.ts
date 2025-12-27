/**
 * Markdown Preview Extension
 */

declare const nexcode: any

export function activate(context: any) {
    console.log('[Markdown Preview] Activated')

    nexcode.commands.register('markdown-preview.open', () => {
        console.log('[Markdown Preview] Opening preview... (command triggered)')
        nexcode.window.openEditorView('markdown-preview.view', { viewColumn: 2 })
    })
}

export function deactivate() {
    console.log('[Markdown Preview] Deactivated')
}

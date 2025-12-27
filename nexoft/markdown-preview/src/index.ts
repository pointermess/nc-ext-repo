/**
 * Markdown Preview Extension - Entry Point
 * 
 * Provides real-time Markdown preview in NexCODE.
 */

declare const nexcode: {
    window: {
        showMessage(message: string, type?: 'info' | 'warn' | 'error'): void
        openEditorView(viewId: string, options?: { viewColumn?: number }): Promise<void>
    }
    commands: {
        register(id: string, handler: (...args: unknown[]) => unknown): { dispose(): void }
    }
}

interface ExtensionContext {
    extensionPath: string
    subscriptions: { dispose(): void }[]
    storage: {
        get<T>(key: string, defaultValue?: T): Promise<T | undefined>
        set(key: string, value: unknown): Promise<void>
    }
}

export function activate(context: ExtensionContext): void {
    console.log('[Markdown Preview] Extension activated!')

    // Register the open preview command
    const openCommand = nexcode.commands.register('markdown-preview.open', () => {
        console.log('[Markdown Preview] Opening preview...')
        nexcode.window.openEditorView('markdown-preview.view', { viewColumn: 2 })
    })

    context.subscriptions.push(openCommand)
}

export function deactivate(): void {
    console.log('[Markdown Preview] Extension deactivated!')
}

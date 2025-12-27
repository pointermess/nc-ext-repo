/**
 * Todo List Extension - Entry Point
 * 
 * This file is executed when the extension is activated.
 * It registers commands and sets up the extension.
 */

// Note: In a real implementation, these would come from @nexcode/api
// For now, we access the global nexcode object
declare const nexcode: {
    window: {
        showMessage(message: string, type?: 'info' | 'warn' | 'error'): void
    }
    commands: {
        register(id: string, handler: () => void): { dispose(): void }
    }
    settings: {
        get<T>(key: string, defaultValue?: T): T
        update(key: string, value: unknown): Promise<void>
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

export function activate(context: ExtensionContext) {
    console.log('[Todo List] Extension activated!')

    // Register the "Add Todo" command
    const addTodoCommand = nexcode.commands.register('todo-list.addTodo', () => {
        // This will trigger the input in the panel
        // For now, just show a message
        nexcode.window.showMessage('Use the Todo List panel to add todos', 'info')
    })

    // Register the "Clear Completed" command
    const clearCompletedCommand = nexcode.commands.register('todo-list.clearCompleted', () => {
        // Dispatch event for the panel to handle
        window.dispatchEvent(new CustomEvent('todo-list:clearCompleted'))
        nexcode.window.showMessage('Cleared completed todos', 'info')
    })

    // Add to subscriptions for cleanup
    context.subscriptions.push(addTodoCommand)
    context.subscriptions.push(clearCompletedCommand)

    // Log settings
    const showCompleted = nexcode.settings.get('todo-list.showCompleted', true)
    console.log('[Todo List] Show completed setting:', showCompleted)
}

export function deactivate() {
    console.log('[Todo List] Extension deactivated!')
}

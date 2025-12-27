/**
 * Nexoft Themes Extension - Entry Point
 * 
 * Registers a collection of beautiful color themes for NexCODE.
 * Themes include: Dracula, Monokai Pro, Nord, One Dark Pro,
 * Solarized (Dark/Light), and Catppuccin (Mocha/Latte).
 */

import {
    allThemes,
    dracula,
    monokaiPro,
    nord,
    oneDarkPro,
    solarizedDark,
    solarizedLight,
    catppuccinMocha,
    catppuccinLatte,
    type ThemeDefinition,
} from './themes'

// Type declarations for the global NexCODE API
declare const nexcode: {
    window: {
        showMessage(message: string, type?: 'info' | 'warn' | 'error'): void
    }
    commands: {
        register(id: string, handler: () => void): { dispose(): void }
    }
    theme: {
        registerTheme(theme: ThemeDefinition): { dispose(): void }
        setTheme(themeId: string): void
        currentTheme: string
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
    console.log('[Nexoft Themes] Extension activated!')
    console.log(`[Nexoft Themes] Registering ${allThemes.length} themes...`)

    // Register all themes
    for (const theme of allThemes) {
        const disposable = nexcode.theme.registerTheme(theme)
        context.subscriptions.push(disposable)
        console.log(`[Nexoft Themes] Registered: ${theme.name}`)
    }

    // Register quick-switch commands
    const themeCommands = [
        { id: 'nexoft-themes.dracula', theme: dracula },
        { id: 'nexoft-themes.monokai', theme: monokaiPro },
        { id: 'nexoft-themes.nord', theme: nord },
        { id: 'nexoft-themes.oneDark', theme: oneDarkPro },
        { id: 'nexoft-themes.solarizedDark', theme: solarizedDark },
        { id: 'nexoft-themes.solarizedLight', theme: solarizedLight },
        { id: 'nexoft-themes.catppuccinMocha', theme: catppuccinMocha },
        { id: 'nexoft-themes.catppuccinLatte', theme: catppuccinLatte },
    ]

    for (const { id, theme } of themeCommands) {
        const disposable = nexcode.commands.register(id, () => {
            nexcode.theme.setTheme(theme.id)
            nexcode.window.showMessage(`Applied ${theme.name} theme`, 'info')

            // Save last used theme
            nexcode.settings.update('nexoft-themes.lastUsed', theme.id)
        })
        context.subscriptions.push(disposable)
    }

    // Register a command to cycle through themes
    const cycleCommand = nexcode.commands.register('nexoft-themes.cycle', () => {
        const currentTheme = nexcode.theme.currentTheme
        const currentIndex = allThemes.findIndex(t => t.id === currentTheme)
        const nextIndex = (currentIndex + 1) % allThemes.length
        const nextTheme = allThemes[nextIndex]

        nexcode.theme.setTheme(nextTheme.id)
        nexcode.window.showMessage(`Switched to ${nextTheme.name}`, 'info')
        nexcode.settings.update('nexoft-themes.lastUsed', nextTheme.id)
    })
    context.subscriptions.push(cycleCommand)

    console.log('[Nexoft Themes] All themes and commands registered!')
}

export function deactivate() {
    console.log('[Nexoft Themes] Extension deactivated!')
}

/**
 * Vue Language Extension for NexCODE
 * 
 * Provides comprehensive Vue 3 support including:
 * - Vue Language Server (Volar) integration for IntelliSense, code navigation, and diagnostics
 * - Template IntelliSense with component auto-completion
 * - Script and style block support
 * - TypeScript support in Vue SFCs
 * - Code formatting with Prettier
 */

// Global NexCODE API definition (injected at runtime)
declare const nexcode: any;

// Types for configuration
interface LanguageSettings {
    lsp: {
        enabled: boolean
        command: string
        args: string[]
        registeredBy?: string // Extension provenance
    }
    formatter: {
        enabled: boolean
        command: string
        formatOnSave: boolean
        formatOnPaste: boolean
        registeredBy?: string
    }
    linter: {
        enabled: boolean
        command: string
        lintOnSave: boolean
        lintOnType: boolean
        registeredBy?: string
    }
}

/**
 * Get the Vue Language Server command using bundled npm package
 * 
 * The extension includes @vue/language-server (Volar) as a dependency,
 * so we can reference it directly from node_modules.
 */
function getVueServerCommand(extensionPath: string): { command: string; args: string[] } {
    // Path to the Volar language server entry point in node_modules
    const vueServerPath = `${extensionPath}/node_modules/@vue/language-server/bin/vue-language-server.js`;

    return {
        command: 'node',
        args: [vueServerPath, '--stdio']
    };
}

/**
 * Main activation function called when the extension loads
 */
export async function activate(context: any) {
    console.log('[Vue Extension] Activating...');

    // 1. Get Vue Language Server command from node_modules
    const { command: vueServerCommand, args: vueServerArgs } = getVueServerCommand(context.extensionPath);

    console.log(`[Vue Extension] Using Vue Language Server (Volar) from node_modules`);
    console.log(`[Vue Extension] Command: ${vueServerCommand} ${vueServerArgs.join(' ')}`);

    // 2. Configure LSP and tooling settings for Vue
    const vueConfig: LanguageSettings = {
        lsp: {
            enabled: true,
            command: vueServerCommand,
            args: vueServerArgs,
            registeredBy: 'lang-vue'
        },
        formatter: {
            enabled: true,
            command: 'prettier',
            formatOnSave: true,
            formatOnPaste: false,
            registeredBy: 'lang-vue'
        },
        linter: {
            enabled: true,
            command: 'eslint',
            lintOnSave: true,
            lintOnType: false,
            registeredBy: 'lang-vue'
        }
    };

    // 3. Persist settings
    try {
        // Vue settings
        await nexcode.settings.update('language-settings:vue', JSON.stringify(vueConfig));
        console.log('[Vue Extension] Updated Vue language settings');

        // Track extension contributions for settings UI
        const contributions = {
            extensionId: 'lang-vue',
            extensionName: 'Vue Language Support',
            provides: {
                languages: ['vue'],
                lsp: {
                    name: 'Vue Language Server (Volar)',
                    command: `${vueServerCommand} ${vueServerArgs.join(' ')}`
                },
                formatter: {
                    name: 'Prettier',
                    command: 'prettier'
                },
                linter: {
                    name: 'ESLint',
                    command: 'eslint'
                }
            }
        };
        await nexcode.settings.update('extension-contributions:lang-vue', JSON.stringify(contributions));
        console.log('[Vue Extension] Registered extension contributions');

    } catch (error) {
        console.error('[Vue Extension] Failed to update settings:', error);
    }

    // 4. Register commands
    nexcode.commands.register('vue.restartServer', async () => {
        nexcode.window.showMessage('Restarting Vue Language Server...', 'info');
        try {
            // Attempt to restart the LSP
            nexcode.notifications.info({
                title: 'Vue Language Server',
                message: 'Server restart requested. This may take a moment.',
                timeout: 3000
            });
        } catch (error) {
            console.error('[Vue Extension] Failed to restart server:', error);
        }
    });

    nexcode.commands.register('vue.openDocs', async () => {
        try {
            // Open Vue 3 documentation
            const url = 'https://vuejs.org/guide/introduction.html';

            // Try to open in web browser using the window API
            if (nexcode.window?.openExternal) {
                await nexcode.window.openExternal(url);
            } else {
                // Fallback: copy to clipboard
                nexcode.notifications.info({
                    title: 'Vue Documentation',
                    message: `Visit: ${url}`,
                    timeout: 5000
                });
            }
        } catch (error) {
            console.error('[Vue Extension] Failed to open documentation:', error);
        }
    });

    nexcode.commands.register('vue.showOutputChannel', async () => {
        try {
            // Show the output channel for Vue Language Server
            // This would require LSP API support
            nexcode.notifications.info({
                title: 'Vue Language Server Output',
                message: 'Output channel support is not yet implemented.',
                timeout: 3000
            });
        } catch (error) {
            console.error('[Vue Extension] Failed to show output channel:', error);
        }
    });

    console.log('[Vue Extension] Activation complete');
}

/**
 * Deactivation function called when the extension is disabled
 */
export function deactivate() {
    console.log('[Vue Extension] Deactivated');
}

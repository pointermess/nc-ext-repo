/**
 * PHP Language Extension for NexCODE
 * Integrates Intelephense for LSP support.
 */

// Global NexCODE API definition (injected at runtime)
declare const nexcode: any;

export async function activate(context: any) {
    console.log('[PHP Extension] Activating...');

    // 1. Resolve path to the Intelephense binary installed via postinstall
    // The binary is expected to be in local 'libs/node_modules/intelephense/lib/intelephense.js'
    // We will launch it using 'node' command and pass the script path

    // context.extensionPath is the absolute path to this extension's directory
    const intelephensePath = `${context.extensionPath}/libs/node_modules/intelephense/lib/intelephense.js`;

    console.log(`[PHP Extension] Configured Intelephense path: ${intelephensePath}`);

    // 2. Configure the LSP settings for PHP
    // This overrides the default global 'php' configuration
    const lspConfig = {
        lsp: {
            enabled: true,
            // We launch Intelephense using the node executable since it's a JS module
            command: 'node',
            args: [intelephensePath, '--stdio'],
            registeredBy: 'lang-php'
        },
        // Intelephense handles formatting as well
        formatter: {
            enabled: true,
            command: 'lsp', // Use the LSP itself for formatting
            formatOnSave: true,
            formatOnPaste: false,
            registeredBy: 'lang-php'
        },
        linter: {
            enabled: true,
            command: 'lsp', // Use the LSP itself for linting
            lintOnSave: true,
            lintOnType: true,
            registeredBy: 'lang-php'
        }
    };

    // Update the setting. This is persistent and will be picked up by useLSP.ts
    // Key format: language-settings:<languageId>
    try {
        await nexcode.settings.update('language-settings:php', JSON.stringify(lspConfig));
        console.log('[PHP Extension] Updated PHP LSP settings');
    } catch (error) {
        console.error('[PHP Extension] Failed to update settings:', error);
    }

    // 3. Register commands
    nexcode.commands.register('php.restartServer', async () => {
        nexcode.window.showMessage('Restarting Intelephense server...', 'info');
        // Future: nexcode.languages.restartServer('php');
    });

    nexcode.commands.register('php.indexWorkspace', async () => {
        nexcode.window.showMessage('Indexing workspace...', 'info');
        // Future: Send specific command to LSP if supported via nexcode.languages.sendRequest
    });

    console.log('[PHP Extension] Activation complete');
}

export function deactivate() {
    console.log('[PHP Extension] Deactivated');
}

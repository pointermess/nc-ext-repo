/**
 * Rust Language Extension for NexCODE
 * Integrates Rust Analyzer for LSP support.
 */

// Global NexCODE API definition (injected at runtime)
declare const nexcode: any;

export async function activate(context: any) {
    console.log('[Rust Extension] Activating...');

    // 1. Resolve path to the bundled rust-analyzer binary
    // The binary is expected to be in local 'libs' folder
    const isWindows = navigator.userAgent.includes('Windows');
    const binName = isWindows ? 'rust-analyzer.exe' : 'rust-analyzer';

    // context.extensionPath is the absolute path to this extension's directory
    const rustAnalyzerPath = `${context.extensionPath}/libs/${binName}`;

    console.log(`[Rust Extension] Found bundled LSP at: ${rustAnalyzerPath}`);

    // 2. Configure the LSP settings for Rust
    // This overrides the default global 'rust' configuration
    const lspConfig = {
        lsp: {
            enabled: true,
            command: rustAnalyzerPath,
            args: [] // Add any default args if necessary
        },
        formatter: {
            enabled: true,
            command: 'rustfmt', // Assumes rustfmt is in PATH for now, or could use bundled one
            formatOnSave: true,
            formatOnPaste: false
        },
        linter: {
            enabled: true,
            command: 'clippy',
            lintOnSave: true,
            lintOnType: false
        }
    };

    // Update the setting. This is persistent and will be picked up by useLSP.ts
    // Key format: language-settings:<languageId>
    try {
        await nexcode.settings.update('language-settings:rust', JSON.stringify(lspConfig));
        console.log('[Rust Extension] Updated Rust LSP settings');
    } catch (error) {
        console.error('[Rust Extension] Failed to update settings:', error);
    }

    // 3. Register commands
    nexcode.commands.register('rust.restartServer', async () => {
        // Since we don't have direct access to restart specific LSPs via API yet,
        // we can potentially toggle the setting or implementation dependent.
        // For now, just show a message or trigger a fictional reload.
        nexcode.window.showMessage('Restarting Rust Analyzer is not yet supported via API.', 'info');
        // In the future: nexcode.languages.restartServer('rust');
    });

    console.log('[Rust Extension] Activation complete');
}

export function deactivate() {
    console.log('[Rust Extension] Deactivated');
}

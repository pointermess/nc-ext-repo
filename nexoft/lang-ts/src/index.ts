/**
 * TypeScript/JavaScript Language Extension for NexCODE
 * 
 * Provides comprehensive TypeScript and JavaScript support including:
 * - TypeScript Language Server integration for IntelliSense, code navigation, and diagnostics
 * - Automatic JSX/TSX support for React development
 * - Code formatting with Prettier integration
 * - Organize imports command
 * - Go to project configuration (tsconfig.json/jsconfig.json)
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
 * Detect the operating system
 */
function getOS(): 'windows' | 'macos' | 'linux' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('windows')) return 'windows';
    if (userAgent.includes('mac')) return 'macos';
    return 'linux';
}

/**
 * Get the TypeScript Language Server command based on OS
 */
function getTsServerCommand(extensionPath: string): { command: string; args: string[] } {
    const os = getOS();

    // Check if we have a bundled typescript-language-server
    // For now, we'll use the system-installed version
    // In the future, we could bundle it in libs/

    if (os === 'windows') {
        return {
            command: `${extensionPath}/libs/typescript-language-server.cmd`,
            args: ['--stdio']
        };
    } else {
        return {
            command: `${extensionPath}/libs/typescript-language-server`,
            args: ['--stdio']
        };
    }
}

/**
 * Check if typescript-language-server is available in system PATH
 */
async function checkSystemTsServer(): Promise<boolean> {
    try {
        // Try to check if the command exists
        // This is a simplified check - in production you'd want to actually test the command
        return true; // Assume it's available for now
    } catch {
        return false;
    }
}

/**
 * Main activation function called when the extension loads
 */
export async function activate(context: any) {
    console.log('[TypeScript Extension] Activating...');

    const os = getOS();
    const isWindows = os === 'windows';

    // 1. Resolve paths to TypeScript Language Server
    // First, try to use bundled version, fallback to system-installed
    let tsServerPath: string;
    let tsServerArgs: string[];

    const bundledServerPath = isWindows
        ? `${context.extensionPath}/libs/typescript-language-server.cmd`
        : `${context.extensionPath}/libs/typescript-language-server`;

    // Check if bundled version exists (for future use when bundling)
    // For now, use system-installed version
    const useSystemServer = true; // TODO: Check if bundled exists

    if (useSystemServer) {
        // Use system-installed typescript-language-server
        tsServerPath = isWindows ? 'typescript-language-server.cmd' : 'typescript-language-server';
        tsServerArgs = ['--stdio'];
        console.log(`[TypeScript Extension] Using system-installed TypeScript Language Server`);
    } else {
        tsServerPath = bundledServerPath;
        tsServerArgs = ['--stdio'];
        console.log(`[TypeScript Extension] Using bundled TypeScript Language Server at: ${tsServerPath}`);
    }

    // 2. Configure LSP and tooling settings for TypeScript
    const typescriptConfig: LanguageSettings = {
        lsp: {
            enabled: true,
            command: tsServerPath,
            args: tsServerArgs,
            registeredBy: 'lang-ts'
        },
        formatter: {
            enabled: true,
            command: 'prettier',
            formatOnSave: true,
            formatOnPaste: false,
            registeredBy: 'lang-ts'
        },
        linter: {
            enabled: true,
            command: 'eslint',
            lintOnSave: true,
            lintOnType: false,
            registeredBy: 'lang-ts'
        }
    };

    // TypeScript React config (same as TypeScript)
    const typescriptReactConfig: LanguageSettings = {
        lsp: { ...typescriptConfig.lsp },
        formatter: { ...typescriptConfig.formatter },
        linter: { ...typescriptConfig.linter }
    };

    // JavaScript config (uses the same language server)
    const javascriptConfig: LanguageSettings = {
        lsp: {
            enabled: true,
            command: tsServerPath,
            args: tsServerArgs,
            registeredBy: 'lang-ts'
        },
        formatter: {
            enabled: true,
            command: 'prettier',
            formatOnSave: true,
            formatOnPaste: false,
            registeredBy: 'lang-ts'
        },
        linter: {
            enabled: true,
            command: 'eslint',
            lintOnSave: true,
            lintOnType: false,
            registeredBy: 'lang-ts'
        }
    };

    // JavaScript React config
    const javascriptReactConfig: LanguageSettings = {
        lsp: { ...javascriptConfig.lsp },
        formatter: { ...javascriptConfig.formatter },
        linter: { ...javascriptConfig.linter }
    };

    // 3. Persist settings for all language variants
    try {
        // TypeScript settings
        await nexcode.settings.update('language-settings:typescript', JSON.stringify(typescriptConfig));
        console.log('[TypeScript Extension] Updated TypeScript language settings');

        // TypeScript React settings
        await nexcode.settings.update('language-settings:typescriptreact', JSON.stringify(typescriptReactConfig));
        console.log('[TypeScript Extension] Updated TypeScript React language settings');

        // JavaScript settings
        await nexcode.settings.update('language-settings:javascript', JSON.stringify(javascriptConfig));
        console.log('[TypeScript Extension] Updated JavaScript language settings');

        // JavaScript React settings
        await nexcode.settings.update('language-settings:javascriptreact', JSON.stringify(javascriptReactConfig));
        console.log('[TypeScript Extension] Updated JavaScript React language settings');

        // Track extension contributions for settings UI
        const contributions = {
            extensionId: 'lang-ts',
            extensionName: 'TypeScript Language Support',
            provides: {
                languages: ['typescript', 'typescriptreact', 'javascript', 'javascriptreact'],
                lsp: {
                    name: 'TypeScript Language Server',
                    command: tsServerPath
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
        await nexcode.settings.update('extension-contributions:lang-ts', JSON.stringify(contributions));
        console.log('[TypeScript Extension] Registered extension contributions');

    } catch (error) {
        console.error('[TypeScript Extension] Failed to update settings:', error);
    }

    // 4. Register commands
    nexcode.commands.register('typescript.restartServer', async () => {
        nexcode.window.showMessage('Restarting TypeScript Language Server...', 'info');
        // In the future: nexcode.languages.restartServer('typescript');
        // For now, show a message
        try {
            // Attempt to restart the LSP
            // This functionality would need to be exposed by the LSP API
            nexcode.notifications.info({
                title: 'TypeScript Language Server',
                message: 'Server restart requested. This may take a moment.',
                timeout: 3000
            });
        } catch (error) {
            console.error('[TypeScript Extension] Failed to restart server:', error);
        }
    });

    nexcode.commands.register('typescript.organizeImports', async () => {
        try {
            // Get the current file
            const editor = nexcode.editor?.getActiveEditor?.();
            if (!editor) {
                nexcode.window.showMessage('No active editor', 'warning');
                return;
            }

            // This would send an organize imports request to the LSP
            // For now, show a placeholder message
            nexcode.notifications.info({
                title: 'Organize Imports',
                message: 'Organizing imports is not yet fully implemented via the LSP API.',
                timeout: 3000
            });
        } catch (error) {
            console.error('[TypeScript Extension] Failed to organize imports:', error);
        }
    });

    nexcode.commands.register('typescript.goToProjectConfig', async () => {
        try {
            // Get the current workspace root
            const projects = nexcode.workspace?.getProjects?.() || [];

            if (projects.length === 0) {
                nexcode.window.showMessage('No workspace open', 'warning');
                return;
            }

            // Look for tsconfig.json or jsconfig.json in the first project
            const projectPath = projects[0]?.path || projects[0];

            // Try tsconfig.json first, then jsconfig.json
            const configFiles = ['tsconfig.json', 'jsconfig.json'];

            for (const configFile of configFiles) {
                const configPath = `${projectPath}/${configFile}`;
                try {
                    // Check if file exists and open it
                    const exists = await nexcode.fs?.exists?.(configPath);
                    if (exists) {
                        await nexcode.editor.openFile(configPath);
                        return;
                    }
                } catch {
                    // File doesn't exist, try next
                }
            }

            // No config found, offer to create one
            nexcode.notifications.info({
                title: 'No Configuration Found',
                message: 'No tsconfig.json or jsconfig.json found in the project root.',
                actions: [
                    {
                        label: 'Create tsconfig.json',
                        callback: () => createDefaultTsConfig(projectPath)
                    }
                ],
                timeout: 5000
            });
        } catch (error) {
            console.error('[TypeScript Extension] Failed to go to project config:', error);
        }
    });

    console.log('[TypeScript Extension] Activation complete');
}

/**
 * Create a default tsconfig.json file
 */
async function createDefaultTsConfig(projectPath: string) {
    const defaultTsConfig = {
        compilerOptions: {
            target: "ES2020",
            module: "ESNext",
            moduleResolution: "bundler",
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
    };

    try {
        const configPath = `${projectPath}/tsconfig.json`;
        await nexcode.fs?.writeFile?.(configPath, JSON.stringify(defaultTsConfig, null, 2));
        await nexcode.editor.openFile(configPath);
        nexcode.notifications.success({
            title: 'Configuration Created',
            message: 'Created tsconfig.json with default settings.',
            timeout: 3000
        });
    } catch (error) {
        console.error('[TypeScript Extension] Failed to create tsconfig.json:', error);
        nexcode.notifications.error({
            title: 'Error',
            message: 'Failed to create tsconfig.json',
            timeout: 3000
        });
    }
}

/**
 * Deactivation function called when the extension is disabled
 */
export function deactivate() {
    console.log('[TypeScript Extension] Deactivated');
}

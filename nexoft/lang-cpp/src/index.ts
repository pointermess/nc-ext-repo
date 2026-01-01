/**
 * C/C++ Language Extension for NexCODE
 * 
 * Provides comprehensive C/C++ support including:
 * - Clangd LSP integration for IntelliSense, code navigation, and diagnostics
 * - Compiler profile management (GCC, Clang, MSVC)
 * - Launch configurations for debugging and running
 * - Code formatting with clang-format
 * - Linting with cppcheck
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
    debugger?: {
        enabled: boolean
        command: string
        type: string
        registeredBy?: string
    }
    compilerProfile?: {
        id: string
        name: string
        command: string
        args: string[]
        registeredBy?: string
    }
}

interface CompilerProfile {
    id: string
    name: string
    command: string
    args: string[]
    outputFlag: string
    registeredBy: string
}

interface LaunchProfile {
    id: string
    name: string
    type: string
    configurations: Record<string, any>
    registeredBy: string
}

/**
 * Main activation function called when the extension loads
 */
export async function activate(context: any) {
    console.log('[C++ Extension] Activating...');

    // 1. Resolve path to the bundled clangd binary
    const isWindows = navigator.userAgent.includes('Windows');
    const binName = isWindows ? 'clangd.exe' : 'clangd';
    const clangdPath = `${context.extensionPath}/libs/${binName}`;

    console.log(`[C++ Extension] Found bundled Clangd at: ${clangdPath}`);

    // 2. Default compiler profiles
    const defaultCompilerProfiles: CompilerProfile[] = [
        {
            id: 'cpp.gcc',
            name: 'GCC (g++)',
            command: 'g++',
            args: ['-g', '-Wall', '-Wextra', '-std=c++17'],
            outputFlag: '-o',
            registeredBy: 'lang-cpp'
        },
        {
            id: 'cpp.clang',
            name: 'Clang (clang++)',
            command: 'clang++',
            args: ['-g', '-Wall', '-Wextra', '-std=c++17'],
            outputFlag: '-o',
            registeredBy: 'lang-cpp'
        },
        {
            id: 'cpp.msvc',
            name: 'MSVC (cl)',
            command: 'cl',
            args: ['/EHsc', '/W4', '/std:c++17'],
            outputFlag: '/Fe:',
            registeredBy: 'lang-cpp'
        }
    ];

    // 3. Default launch profiles
    const defaultLaunchProfiles: LaunchProfile[] = [
        {
            id: 'cpp.launch.debug',
            name: 'Debug C++ Application',
            type: 'cppdbg',
            configurations: {
                program: '${workspaceFolder}/${fileBasenameNoExtension}${executableExtension}',
                args: [],
                stopAtEntry: false,
                cwd: '${workspaceFolder}',
                environment: [],
                externalConsole: false,
                MIMode: isWindows ? 'gdb' : 'lldb'
            },
            registeredBy: 'lang-cpp'
        },
        {
            id: 'cpp.launch.run',
            name: 'Run C++ Application',
            type: 'run',
            configurations: {
                program: '${workspaceFolder}/${fileBasenameNoExtension}${executableExtension}',
                args: [],
                cwd: '${workspaceFolder}'
            },
            registeredBy: 'lang-cpp'
        }
    ];

    // 4. Configure LSP and tooling settings for C++
    const cppConfig: LanguageSettings = {
        lsp: {
            enabled: true,
            command: clangdPath,
            args: [
                '--background-index',
                '--clang-tidy',
                '--completion-style=detailed',
                '--header-insertion=iwyu',
                '--suggest-missing-includes',
                '--log=info'
            ],
            registeredBy: 'lang-cpp'
        },
        formatter: {
            enabled: true,
            command: 'clang-format',
            formatOnSave: true,
            formatOnPaste: false,
            registeredBy: 'lang-cpp'
        },
        linter: {
            enabled: true,
            command: 'cppcheck',
            lintOnSave: true,
            lintOnType: false,
            registeredBy: 'lang-cpp'
        },
        debugger: {
            enabled: true,
            command: isWindows ? 'gdb' : 'lldb',
            type: 'cppdbg',
            registeredBy: 'lang-cpp'
        }
    };

    // Same config for C
    const cConfig: LanguageSettings = {
        lsp: { ...cppConfig.lsp },
        formatter: { ...cppConfig.formatter },
        linter: { ...cppConfig.linter },
        debugger: cppConfig.debugger ? {
            enabled: cppConfig.debugger.enabled,
            command: cppConfig.debugger.command,
            type: cppConfig.debugger.type,
            registeredBy: cppConfig.debugger.registeredBy
        } : undefined
    };

    // 5. Persist settings
    try {
        // Language settings for C++
        await nexcode.settings.update('language-settings:cpp', JSON.stringify(cppConfig));
        console.log('[C++ Extension] Updated C++ language settings');

        // Language settings for C
        await nexcode.settings.update('language-settings:c', JSON.stringify(cConfig));
        console.log('[C++ Extension] Updated C language settings');

        // Compiler profiles
        await nexcode.settings.update('compiler-profiles:cpp', JSON.stringify(defaultCompilerProfiles));
        await nexcode.settings.update('compiler-profiles:c', JSON.stringify(defaultCompilerProfiles));
        console.log('[C++ Extension] Registered compiler profiles');

        // Launch profiles
        await nexcode.settings.update('launch-profiles:cpp', JSON.stringify(defaultLaunchProfiles));
        await nexcode.settings.update('launch-profiles:c', JSON.stringify(defaultLaunchProfiles));
        console.log('[C++ Extension] Registered launch profiles');

        // Track extension contributions for settings UI
        const contributions = {
            extensionId: 'lang-cpp',
            extensionName: 'C/C++ Language Support',
            provides: {
                languages: ['cpp', 'c'],
                lsp: {
                    name: 'Clangd',
                    command: clangdPath
                },
                formatter: {
                    name: 'clang-format',
                    command: 'clang-format'
                },
                linter: {
                    name: 'cppcheck',
                    command: 'cppcheck'
                },
                debuggers: [
                    { name: 'GDB', command: 'gdb' },
                    { name: 'LLDB', command: 'lldb' }
                ],
                compilerProfiles: defaultCompilerProfiles,
                launchProfiles: defaultLaunchProfiles
            }
        };
        await nexcode.settings.update('extension-contributions:lang-cpp', JSON.stringify(contributions));

    } catch (error) {
        console.error('[C++ Extension] Failed to update settings:', error);
    }

    // 6. Register commands
    nexcode.commands.register('cpp.restartServer', async () => {
        nexcode.window.showMessage('Restarting Clangd language server...', 'info');
        // In the future: nexcode.languages.restartServer('cpp');
    });

    nexcode.commands.register('cpp.selectCompiler', async () => {
        try {
            const profilesJson = await nexcode.settings.get('compiler-profiles:cpp');
            const profiles: CompilerProfile[] = profilesJson ? JSON.parse(profilesJson) : defaultCompilerProfiles;

            // Show quick pick for compiler selection
            const selected = await nexcode.window.showQuickPick(
                profiles.map(p => ({ label: p.name, value: p.id, detail: p.command })),
                { title: 'Select C++ Compiler' }
            );

            if (selected) {
                const profile = profiles.find(p => p.id === selected.value);
                if (profile) {
                    await nexcode.settings.update('selected-compiler:cpp', JSON.stringify(profile));
                    nexcode.window.showMessage(`Selected compiler: ${profile.name}`, 'info');
                }
            }
        } catch (error) {
            console.error('[C++ Extension] Failed to select compiler:', error);
        }
    });

    nexcode.commands.register('cpp.createLaunchConfig', async () => {
        try {
            const profilesJson = await nexcode.settings.get('launch-profiles:cpp');
            const profiles: LaunchProfile[] = profilesJson ? JSON.parse(profilesJson) : defaultLaunchProfiles;

            const selected = await nexcode.window.showQuickPick(
                profiles.map(p => ({ label: p.name, value: p.id, detail: p.type })),
                { title: 'Create Launch Configuration' }
            );

            if (selected) {
                nexcode.window.showMessage(`Created launch configuration: ${selected.label}`, 'info');
            }
        } catch (error) {
            console.error('[C++ Extension] Failed to create launch config:', error);
        }
    });

    console.log('[C++ Extension] Activation complete');
}

/**
 * Deactivation function called when the extension is disabled
 */
export function deactivate() {
    console.log('[C++ Extension] Deactivated');
}

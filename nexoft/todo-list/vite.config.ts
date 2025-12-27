import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

// Automatically discover Vue components in src/components
function getComponentEntries(): Record<string, string> {
    const entries: Record<string, string> = {}
    const componentsDir = resolve(__dirname, 'src/components')

    try {
        const files = readdirSync(componentsDir)
        for (const file of files) {
            if (file.endsWith('.vue')) {
                const name = file.replace('.vue', '')
                entries[`components/${name}`] = resolve(componentsDir, file)
            }
        }
    } catch {
        // Components directory doesn't exist yet
    }

    return entries
}

export default defineConfig({
    plugins: [vue()],

    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                ...getComponentEntries(),
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}.mjs`,
        },

        rollupOptions: {
            // Externalize Vue - it's provided by the host app
            external: ['vue'],
            output: {
                // Preserve module structure
                preserveModules: false,
                // Global for externals
                globals: {
                    vue: 'Vue',
                },
            },
        },

        // Output to dist folder
        outDir: 'dist',
        emptyDirBeforeWrite: true,

        // Generate source maps for debugging
        sourcemap: true,

        // Don't minify for better debugging
        minify: false,
    },

    // Resolve @ alias for imports
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})

import { defineConfig, type Plugin, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/**
 * Plugin to inline CSS into JavaScript for dynamic component loading.
 */
function cssInjectedByJsPlugin(): Plugin {
    return {
        name: 'css-injected-by-js',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const cssChunks: string[] = []

            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (fileName.endsWith('.css') && chunk.type === 'asset') {
                    cssChunks.push(chunk.source as string)
                    delete bundle[fileName]
                }
            }

            if (cssChunks.length === 0) return

            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type === 'chunk' && chunk.isEntry) {
                    const cssCode = cssChunks.join('\n')
                    const injection = `
(function() {
    const style = document.createElement('style');
    style.setAttribute('data-extension-css', '${fileName}');
    style.textContent = ${JSON.stringify(cssCode)};
    document.head.appendChild(style);
})();
`
                    chunk.code = injection + chunk.code
                }
            }
        }
    }
}

// Default export for Vite CLI usage
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
    ],

    build: {
        // We handle the building of entries manually in rollupOptions to 
        // ensure complete isolation (no shared chunks).
        lib: {
            entry: resolve(__dirname, 'src/index.ts'), // Placeholder for Vite
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
            input: {
                index: resolve(__dirname, 'src/index.ts'),
                'components/TableBuilderView': resolve(__dirname, 'src/components/TableBuilderView.vue'),
            },
            output: {
                format: 'es',
                entryFileNames: '[name].mjs',
                // This is the magic: tell rollup not to create shared chunks
                // and instead duplicate the shared code in both files.
                manualChunks: () => null,
                inlineDynamicImports: false,
                globals: {
                    vue: 'Vue',
                },
            },
        },

        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        minify: false,
        cssCodeSplit: false,
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})

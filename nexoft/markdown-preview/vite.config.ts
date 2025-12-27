import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/**
 * Plugin to inline CSS into JavaScript for dynamic component loading.
 * When loading components via Blob URL, external CSS files won't load,
 * so we need to inject styles at runtime.
 */
function cssInjectedByJsPlugin(): Plugin {
    return {
        name: 'css-injected-by-js',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            // Find CSS chunks and inline them into JS
            const cssChunks: string[] = []

            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (fileName.endsWith('.css') && chunk.type === 'asset') {
                    cssChunks.push(chunk.source as string)
                    // Remove the CSS file from output
                    delete bundle[fileName]
                }
            }

            if (cssChunks.length === 0) return

            // Find the main JS entry and inject CSS
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

export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
    ],

    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'components/MarkdownView': resolve(__dirname, 'src/components/MarkdownView.vue'),
            },
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.mjs`,
        },

        rollupOptions: {
            // Externalize Vue - it's provided by the host app
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },

        outDir: 'dist',
        emptyDirBeforeWrite: true,
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

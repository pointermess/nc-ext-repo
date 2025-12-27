import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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

export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/components/TableBuilderView.vue'),
            formats: ['es'],
            fileName: () => 'components/TableBuilderView.mjs',
        },
        rollupOptions: {
            external: ['vue'],
        },
        outDir: 'dist',
        emptyOutDir: false,
        sourcemap: true,
        minify: false,
    },
    resolve: {
        alias: { '@': resolve(__dirname, 'src') },
    },
})

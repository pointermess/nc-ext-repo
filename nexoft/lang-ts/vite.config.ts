import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'LangTs',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: ['vue', '@nexcode/api'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    }
})

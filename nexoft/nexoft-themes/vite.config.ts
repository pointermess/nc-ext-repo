import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: () => 'index.mjs',
        },

        rollupOptions: {
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
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})

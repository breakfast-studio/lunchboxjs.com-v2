import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {

        rollupOptions: {

            input: {
                main: 'index.html',

                'noise-field': 'noise-field/index.html',
                'particle-boxes': 'particle-boxes/index.html',
            },
        },
    },
})

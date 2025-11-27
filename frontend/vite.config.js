import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // listen on 0.0.0.0
        port: 5173,
        strictPort: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
        proxy: {
            '/api': {
                target: 'http://backend:3000',
                changeOrigin: true,
            },
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTesting.js',
        },
    },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// UWAGA: ten serwer działa WEWNĄTRZ kontenera, więc proxy kierujemy na 'http://backend:8000'
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://backend:8000',
                changeOrigin: true
            }
        }
    }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CAS/',
  build: {
    // Desactivamos la minificación de CSS para que no rompa el efecto glass
    cssMinify: false,
    minify: true, // El JS sí lo minificamos
  }
})

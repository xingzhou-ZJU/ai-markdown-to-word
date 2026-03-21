import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ai-markdown-to-word/',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules\/@md2docx\/.*/, /node_modules\/.*/]
    }
  }
})
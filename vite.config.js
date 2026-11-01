import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.resolve(__dirname, 'src/styles')],
        additionalData (content, filename) {
          const f = String(filename || '').replace(/\\/g, '/')
          if (
            f.includes('/styles/_helpers.scss') ||
            f.includes('/styles/common/_helpers.scss') ||
            f.includes('/styles/common/_variables.scss') ||
            f.includes('/styles/common/_mixins.scss') ||
            f.includes('/styles/common/_animations.scss')
          ) {
            return content
          }
          return '@import "helpers";\n' + content
        }
      }
    }
  },
  server: {
    port: 8090,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: false
  },
  publicDir: 'public'
})

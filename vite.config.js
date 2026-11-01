import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.resolve(__dirname, 'src/styles')

export default defineConfig({
  plugins: [vue()],
  publicDir: 'static',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [stylesDir],
        additionalData: function (content, filename) {
          var file = String(filename || '').replace(/\\/g, '/')
          if (
            file.includes('/styles/_helpers') ||
            file.includes('/styles/common/_helpers') ||
            file.includes('/styles/common/_variables') ||
            file.includes('/styles/common/_mixins') ||
            file.includes('/styles/common/_animations')
          ) {
            return content
          }
          var helpersPath = path.resolve(stylesDir, '_helpers.scss').replace(/\\/g, '/')
          return '@import "' + helpersPath + '";\n' + content
        },
        silenceDeprecations: ['import', 'legacy-js-api']
      }
    }
  },
  server: {
    host: 'localhost',
    port: 8088,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import PostcssNested from 'postcss-nested'
import PostcssHexrgba from 'postcss-hexrgba'
import PostcssSimpleVars from 'postcss-simple-vars'
import PostcssFor from 'postcss-for'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        PostcssNested,
        PostcssHexrgba,
        PostcssSimpleVars,
        PostcssFor,
      ],
    },
  },
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, './src')}/`,
      '@cp/': `${resolve(__dirname, './src/components')}/`,
    },
    extensions: ['.vue', '.js'],
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import scss from 'rollup-plugin-scss'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        style: './src/style.ts'
      }
    }
  },
  plugins: [
    react(),
    scss({
      outputStyle: 'compressed',
      output: 'casion-reviews.css',
    }),
  ],
})


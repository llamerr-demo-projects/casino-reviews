import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import scss from 'rollup-plugin-scss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    scss({
      outputStyle: 'compressed',
      output: 'casion-reviews.css',
    }),
  ],
})



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss({
    config: {
      theme: {
        extend: {
          animation: {
            'infinite-scroll': 'infinite-scroll 25s linear infinite',
          },
          keyframes: {
            'infinite-scroll': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            }
          }
        }
      }
    }
  })],
})
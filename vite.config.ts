import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: 'ods-playground-react/',
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8080,
  },
})

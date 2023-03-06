import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    include: ['jsonwebtoken']
  }
})

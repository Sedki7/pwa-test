import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
  import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  VitePWA({
      
      registerType : 'autoUpdate'
  }),
    basicSsl()
  ],
  server: {
        https: true // Enable HTTPS
      }
  
})
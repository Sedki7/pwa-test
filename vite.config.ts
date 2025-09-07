import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
  

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  VitePWA({  
    registerType: 'autoUpdate',
    manifest: {
      name: 'Fikir education',
      short_name: 'Fikir',
      description: 'My Awesome App description',
      theme_color: '#ffffff',
      icons: [
        {
      "src": "/pwa-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/pwa-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }]
    }
  }),
  
  ],
  
})
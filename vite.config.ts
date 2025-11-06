import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor_three';
            if (id.includes('@react-three')) return 'vendor_r3f';
            if (id.includes('framer-motion')) return 'vendor_framer';
            if (id.includes('lucide-react')) return 'vendor_lucide';
            return 'vendor_misc';
          }
        },
      },
    },
  },
});

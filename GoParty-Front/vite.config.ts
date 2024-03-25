import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [
    react(),
    WindiCSS({
      // Adicione quaisquer opções de configuração necessárias aqui
    }),
  ],
});

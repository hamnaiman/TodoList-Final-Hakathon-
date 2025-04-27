import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-todo-app/',  // Replace 'my-todo-app' with your actual repo name
});

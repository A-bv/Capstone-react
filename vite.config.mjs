import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    // Served under https://<user>.github.io/Capstone-react/
    base: '/Capstone-react/',
    plugins: [react()],
    // The codebase keeps JSX in .js files (CRA style); tell esbuild to parse it.
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: { '.js': 'jsx' },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        css: false,
    },
});

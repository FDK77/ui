import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@features': path.resolve(__dirname, './src/features'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@assets': path.resolve(__dirname, './src/shared/assets'),
			'@styles': path.resolve(__dirname, './src/shared/styles'),
			'@lib': path.resolve(__dirname, './src/shared/lib'),
			'@utils': path.resolve(__dirname, './src/shared/utils'),
			'@hooks': path.resolve(__dirname, './src/shared/lib/hooks'),
			'@api': path.resolve(__dirname, './src/shared/api'),
			'@components': path.resolve(__dirname, './src/shared/ui/components'),
			'@ui': path.resolve(__dirname, './src/shared/ui'),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
					tailwind: ['tailwindcss'],
				},
			},
		},
		chunkSizeWarningLimit: 1000, // Лимит предупреждений о размере чанка (в KB)
	},
})

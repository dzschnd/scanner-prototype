import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	base: '/scanner-prototype/',
	plugins: [
		tailwindcss(),
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Сканер АНКФ/Лахта Склад',
				short_name: 'Сканер',
				description: 'Прототип PWA-сканера для интеграции «АНКФ» и «Лахта Склад»',
				theme_color: '#0f172a',
				background_color: '#0f172a',
				display: 'standalone',
				start_url: '/scanner-prototype/',
				scope: '/scanner-prototype/',
				"icons": [{ "purpose": "maskable", "sizes": "512x512", "src": "icon512_maskable.png", "type": "image/png" }, { "purpose": "any", "sizes": "512x512", "src": "icon512_rounded.png", "type": "image/png" }],
			},
		}),
	],
})

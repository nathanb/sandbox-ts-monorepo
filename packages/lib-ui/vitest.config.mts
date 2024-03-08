/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		globals: true,
		mockReset: true,
		clearMocks: true,
		environment: 'jsdom',
		setupFiles: ['./setupTests']
	}
})

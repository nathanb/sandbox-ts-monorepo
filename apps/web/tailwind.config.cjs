/** @type {import('tailwindcss').Config} */

module.exports = {
	mode: 'jit',
	future: {
		hoverOnlyWhenSupported: true
	},
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/index.html',
		'../../packages/lib-ui/src/**/*.{jsx,js,tsx,ts}'
	],
	plugins: [require('@tailwindcss/typography')]
}

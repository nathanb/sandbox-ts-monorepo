module.exports = {
	presets: [
		'@babel/preset-env',
		['@babel/preset-react', { runtime: 'automatic' }],
		['@babel/typescript', { isTSX: true, allExtensions: true }]
	]
}

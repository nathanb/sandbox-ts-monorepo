#!/usr/bin/env node
import { main } from './dist/index.mjs'

try {
	main(process.argv.slice(2))
} catch (err) {
	console.error(err)
	process.exit(1)
}

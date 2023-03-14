import { multiply } from "./index.mjs"

describe('index', () => {
	test('multiply', async () => {
		expect(multiply(2, 3)).to.eq(6)
	})
})
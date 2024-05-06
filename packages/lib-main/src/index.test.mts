import { add } from './add.mjs'

describe('index', () => {
	test('add', () => {
		const result = add(1, 2)
		expect(result).to.eq(3)
	})
})

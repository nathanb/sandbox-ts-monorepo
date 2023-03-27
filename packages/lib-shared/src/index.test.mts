import { divide, exponent, multiply } from './index.mjs'

describe('index', () => {
	test('multiply', async() => {
		expect(multiply(2, 3)).to.eq(6)
	})
	test('exponent', async() => {
		expect(exponent(2, 3)).to.eq(8)
	})
	test('divide', async() => {
		expect(divide(4,2)).to.eq(2)
	})
})

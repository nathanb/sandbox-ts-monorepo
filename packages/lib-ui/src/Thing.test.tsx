import { render, screen } from '@testing-library/react'
import { Thing } from './Thing.js'

describe('Thing', () => {
	test('Simple render', () => {
		render(<Thing />)
		expect(screen.findByText('Thing 3')).to.be.ok
	})
})

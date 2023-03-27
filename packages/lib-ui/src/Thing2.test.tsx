import { render, screen } from '@testing-library/react'
import { Thing2 } from './Thing2.js'

describe('Thing2', () => {
	test('Simple render', () => {
		const { container } = render(<Thing2/>)

		const valueDom = screen.getByTestId('value')
		expect(valueDom.textContent).to.eq('6') // just showing this; intentionally redundant.
		expect(container.textContent).to.eq('Thing: 6 should be six.')
	})
})
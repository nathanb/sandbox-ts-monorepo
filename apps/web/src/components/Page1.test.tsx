import { FC, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import Page1 from './Page1.js'
import { BrowserRouter } from 'react-router-dom'
import * as things from '@potatoes/lib-ui/Thing'

vi.mock('@potatoes/lib-ui/Thing') // just auto mocks exports of the module

/**
 * NOTE: Normal automocking (local modules)
 * Local modules already resolving with extension locally can be auto-mocked normally.
 */
vi.mock('./TestComponent.js')

const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => {
	return <BrowserRouter>{children}</BrowserRouter>
}

describe('page-1', () => {
	test('page-1, simple render', async () => {
		vi.spyOn(things, 'Thing').mockImplementation(() => <div data-testid="Thing">Thing</div>)
		render(<Page1 />, { wrapper: Wrapper })
		expect(screen.getByTestId('Thing')).to.be.ok
		expect(screen.getByTestId('TestComponent')).to.be.ok
	})
})

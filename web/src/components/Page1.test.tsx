import { FC, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import Page1 from './Page1.js'
import { BrowserRouter } from 'react-router-dom'

/**
 * NOTE: This is not how vitest automocking is supposed to work. Our actual
 * ref in the component excludes extensions because of our package.json
 * exports mapping config. `import { Thing } from '@potatoes/lib-ui/Thing'`
 * Inter-package references follow the package.json rules; but here, they do not because
 * the reference is made within the module. Therefore it has to follow ESM resolve
 * rules and include the extension. So we're importing it directly.
 */
vi.mock('@potatoes/lib-ui/Thing', () => vi.importActual('../../__mocks__/@potatoes/lib-ui/Thing.js'))

/**
 * NOTE: Normal automocking (local modules)
 * Local modules already resolving with extension locally can be auto-mocked normally.
 */
vi.mock('./TestComponent.js')

const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => {
	return <BrowserRouter>{children}</BrowserRouter>
}

describe('page-1', () => {
	test('simple render', async () => {
		render(<Page1 />, { wrapper: Wrapper })
		expect(screen.getByText('Thing1')).to.be.ok
		expect(screen.getByText('TestComponent')).to.be.ok
	})
})

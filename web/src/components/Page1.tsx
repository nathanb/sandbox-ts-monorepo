
import { exponent } from '@potatoes/lib-shared'
import { Thing } from '@potatoes/lib-ui/Thing'
import { Link } from 'react-router-dom'
import { TestComponent } from './TestComponent.js'

export const Page1 = () => {
	return (
		<>
			<h1>Hello world</h1>
			<p>We have an app. {exponent(2, 3)}</p>
			<p>test two</p>
			<Thing />
			<TestComponent />
			<p><Link to="/page2">Page 2</Link></p>
		</>
	)
}

export default Page1

import React from 'react'
import { exponent } from '@ts-test/lib-shared'
import { Thing } from '@ts-test/lib-ui/Thing'
import { Link } from 'react-router-dom'

export const Page1 = () => {
	return (
		<>
			<h1>Hello world</h1>
			<p>We have an app. {exponent(2, 3)}</p>
			<p>test two</p>
			<Thing />
			<p><Link to="/page2">Page 2</Link></p>
		</>
	)
}

export default Page1

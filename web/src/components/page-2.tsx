import React from 'react'
import { Thing2 } from '@ts-test/lib-ui/Thing2'
import { Link } from 'react-router-dom'

export const Page2 = () => {
	return (
		<>
			<h1>Page 2</h1>
			<p>
				More content.
			</p>
			<Thing2 />
			<p><Link to="/">Page 1</Link></p>
		</>
	)
}

export default Page2

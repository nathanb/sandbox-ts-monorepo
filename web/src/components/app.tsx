import React from 'react'
import { exponent } from '@ts-test/lib-shared'
import { Thing } from '@ts-test/lib-ui/Thing'

export default function App() {
	return (
		<div>
			<h1>Hello world</h1>
			<p>We have an app. {exponent(2, 3)}</p>
			<p>test two</p>
			<Thing />
		</div>
	)
}
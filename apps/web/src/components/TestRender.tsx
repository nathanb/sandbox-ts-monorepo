import { useCallback, useContext, useState } from 'react'
import { TestContext } from './TestContext.js'

export const TestRender = () => {
	const [ix, setIx] = useState(0)

	const { setToggle } = useContext(TestContext)!

	const localFunc = useCallback(() => {
		console.log('localFunc called.')
	}, [])

	const handleSet = () => {
		setIx(_old => _old + 1)
		setToggle(localFunc, ix)
	}

	return (
		<p>
			<button type="button" className="p-1 w-10 border border-[blue]" onClick={handleSet}>set</button>
		</p>
	)
}

export const TestOther = () => {
	const { toggle } = useContext(TestContext)!

	return (
		<p>
			<button type="button" className="p-1 w-10 border border-[blue]" onClick={() => { toggle() }}>get</button>
		</p>
	)
}

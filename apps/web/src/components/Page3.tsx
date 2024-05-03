import { Callback, TestContext } from './TestContext.js'
import { TestOther, TestRender } from './TestRender.js'
import { FC, PropsWithChildren, useRef, useState } from 'react'

export const TestProvider:FC<PropsWithChildren> = ({ children }) => {
	const refCallback = useRef<Callback | undefined>(undefined)
	const refCallbackIx = useRef<number>(-1)
	const setToggle = (callback: Callback, ix: number) => {
		refCallback.current = callback
		refCallbackIx.current = ix
	}
	const toggle = () => {
		if (refCallback.current) {
			refCallback.current()
			return
		}
		console.log('toggle called, but not set.')
	}
	return <TestContext.Provider value={{ toggle, setToggle, ix: refCallbackIx.current }}>{children}</TestContext.Provider>
}

export const TestProvider2:FC<PropsWithChildren> = ({ children }) => {
	const [callback, setCallback] = useState<{callback: Callback, ix: number} | undefined>(undefined)
	const setToggle = (callback: Callback, ix: number) => {
		setCallback(_old => ({ callback, ix }))
	}
	const toggle = () => {
		if (callback?.callback) {
			callback.callback()
			return
		}
		console.log('toggle called, but not set.')
	}
	return <TestContext.Provider value={{ toggle, setToggle, ix: callback?.ix ?? -1 }}>{children}</TestContext.Provider>
}

export const Page3 = () => {
	return (
		<TestProvider>
			<h1>Page 3</h1>
			<TestRender />
			<TestOther />
		</TestProvider>
	)
}

export default Page3

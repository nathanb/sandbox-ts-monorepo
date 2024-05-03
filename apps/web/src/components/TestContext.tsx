import { createContext } from 'react'

export type Callback = () => void
export type SetCallback = (callback: Callback, ix: number) => void

export type ContextValue = {
	toggle: Callback
	ix: number
	setToggle: SetCallback
}
export const TestContext = createContext<ContextValue | undefined>(undefined)

import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Page1 = lazy(() => import('./page-1.js'))
const Page2 = lazy(() => import('./page-2.js'))

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Page1 />} />
					<Route path="/page2" element={<Page2 />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

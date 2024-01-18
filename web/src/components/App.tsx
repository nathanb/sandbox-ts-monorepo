import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout.js'

const Page1 = lazy(() => import('./Page1.js'))
const Page2 = lazy(() => import('./Page2.js'))

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="" element={<Page1 />} />
						<Route path="page2" element={<Page2 />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

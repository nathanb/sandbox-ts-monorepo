import { Outlet } from 'react-router-dom'

export const Layout = () => {
	return (
		<div className="prose pl-10 pt-10">
			<Outlet />
		</div>
	)
}

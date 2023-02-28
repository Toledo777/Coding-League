import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
	return (
		<>
			<nav className='panel'>
				<NavLink to={'/'}>Home</NavLink>
				<NavLink to={'/solve/282A'}>Solve</NavLink>
			</nav>
			<main className='content'>
				<Outlet />
			</main>
		</>
	);
}
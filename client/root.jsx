import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
	return (
		<>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>
			</nav>
			<main className='content'>
				<Outlet />
			</main>
		</>
	);
}
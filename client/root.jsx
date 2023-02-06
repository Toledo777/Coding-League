import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
	return (
		<>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/example'}>Example</Link>
			</nav>
			<main className='content'>
				<Outlet />
			</main>
		</>
	);
}
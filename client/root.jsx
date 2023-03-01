import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Root() {
	return (
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
				<nav>
					<Link to={'/'}>Home</Link>
					<Link to={'/solve/282A'}>Solve</Link>
				</nav>
				<main className='content'>
					<Outlet />
				</main>
			</GoogleOAuthProvider>
	);
}
import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import usePost from './hooks/usePost';

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/api/google-client-id', [])
	
	// fetch google crendetials using token
	const [credentials, setCredentials] = useState(null);
	const [authError, authLoad, authData] = usePost('auth', credentials, []);


	// reword error message for user
	if (error) {
		error = "Error loading google authentification";
	}

	// handles error google login fails
	// TODO change from console.error to proper handling
	function handleError(authErr) {
		console.error(authErr);
	}

	// handles google login, makes fetch to auth api
	function handleLogin(googleData) {
		setCredentials({token: googleData.credentials});
		console.log(googleData.credentials);
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>
				<GoogleLogin
					onSuccess={handleLogin}
				/>
			</nav>
			<main className='content'>
				<h3>
					{error}
					{loading && 'Loading google authentication'}
				</h3>
				<Outlet />
			</main>
		</GoogleOAuthProvider>
	);
}
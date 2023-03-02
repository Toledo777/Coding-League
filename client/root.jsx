import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import usePost from './hooks/usePost';

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/api/google-client-id', []);

	// fetch google crendetials using token
	const [credential, setCredential] = useState(null);
	//const [authError, authLoad, authData] = usePost('auth/login', credential, []);


	// reword error message for user
	if (error) {
		error = 'Error loading google authentification';
	}

	// handles error google login fails
	// TODO change from console.error to proper handling
	function handleError(authErr) {
		console.error(authErr);
	}

	// handles google login, makes fetch to auth api
	async function handleLogin(googleData) {
		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				token: googleData.credential
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		//setCredential({ token: googleData.credential });
		const data = await res.json();
		console.log(data.userData);
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
import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
// import usePost from './hooks/usePost';

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/api/google-client-id', []);
	//const [authError, authLoad, authData] = usePost('auth/login', credential, []);
	const [username, setUser] = useState('');


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

		// call POST request for logging in
		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				token: googleData.credential
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Retrieve data as json and set user's name
		const data = await res.json();

		if(data.state === 'not-registered'){
			// This path will redirect to profile setup page
			console.log('redirect to setup page');
		}

		// This will eventually be in else if for 'registered' state
		setUser(data.user.name);
	}

	/**
	 * Call fetch to logout the user
	 */
	async function handleLogout() {
		await fetch('/auth/logout');
		setUser();
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>

				{!username && <GoogleLogin onSuccess={handleLogin} onError={handleError}/>}
				{username ? username : ''}
				{username && <button onClick={handleLogout}>Logout</button>}

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
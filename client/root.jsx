import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import useCredentials from './hooks/useCredentials';
import { retrieveLoginCredentials } from './utils/authentication.mjs';

//TODO: if user has nickname, once creds are fetch, use email to retrieve user from DB and use username

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/auth/google-client-id', []);
	const user = useCredentials();
	const navigate = useNavigate();

	// // reword error message for user
	// if (error) {
	// 	error = 'Error loading google authentification';
	// }

	// handles error google login fails
	// TODO change from console.error to proper handling
	function handleError(authErr) {
		console.error(authErr);
	}

	/**
	 * handles google login, makes fetch to auth api
	 */
	async function handleLogin(googleData) {
		
		// call POST request for logging in and then
		// retrieve data as json and set user's name
		const data = await retrieveLoginCredentials(googleData);

		if (data.state === 'not-registered') {
			// This path will redirect to profile setup page
			navigate('user/setup');
		} else {
			navigate('/');
		}
		dispatchEvent(new Event('login'));
	}

	/** 
	 * handles google logout, makes fetch to auth api
	 */
	async function handleLogout() {
		await fetch('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		dispatchEvent(new Event('login'));
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>

				{!user && !error && <GoogleLogin onSuccess={handleLogin} onError={handleError} />}
				{user && user.name}
				{user && <button onClick={handleLogout}>Logout</button>}

			</nav>
			<main className='content'>
				<h3>
					{error && 'Error loading google authentification'}
					{loading && 'Loading google authentication'}
				</h3>
				<Outlet />
			</main>
		</GoogleOAuthProvider>
	);
}
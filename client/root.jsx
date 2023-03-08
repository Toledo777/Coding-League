import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import useCredentials from './hooks/useCredentials';
import { retrieveLoginCredentials } from './utils/authentication.mjs';

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/auth/google-client-id', []);
	const [user, setUser] = useCredentials();

	// reword error message for user
	if (error) {
		error = 'Error loading google authentification';
	}

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
			console.log('redirect to setup page');
		}
		// setUser will eventually be in else if for 'registered' state
		setUser(data.user);

		//TODO: reload page after completed
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
		setUser(null);
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>

				{!user && <GoogleLogin onSuccess={handleLogin} onError={handleError} />}
				{user && user.name}
				{user && <button onClick={handleLogout}>Logout</button>}

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
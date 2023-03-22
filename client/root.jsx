import React, {useState} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import useCredentials from './hooks/useCredentials';
import { retrieveLoginCredentials } from './utils/authentication.mjs';

export default function Root() {
	
	// fetch google client id
	let [error, loading, data] = useFetch('/auth/google-client-id', []);

	const user = useCredentials();
	const navigate = useNavigate();
	const [authError, setAuthError] = useState();

	// handles error google login fails
	function handleError(authErrMsg) {
		console.error(authErrMsg);
		setAuthError('An error occured logging into Google. Try again.');
	}

	/**
	 * handles google login, makes fetch to auth api
	 */
	async function handleLogin(googleData) {
		setAuthError();

		// call POST request for logging in and then
		// retrieve data as json and set user's name
		const user = await retrieveLoginCredentials(googleData);

		// Redirect user depending on their registered status
		if (!user.isRegistered) {
			navigate('user/setup');
		}

		// Trigger useCredentials() to fetch for user creds
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
		navigate('/');
		// Trigger useCredentials() to fetch for user creds
		dispatchEvent(new Event('login'));
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/solve/282A'}>Solve</Link>
				
				{/* temporarily hardcode route to user in the db */}
				<Link to={'/profile/640617c088ab3d8cf157cf9f'}>Profile</Link>
				
				{!user && !error && <GoogleLogin onSuccess={handleLogin} onError={handleError} />}
				{user && user.username}
				{authError}
				{user && <button onClick={handleLogout}>Logout</button>}

			</nav>
			<main className='content'>
				<h3>
					{error && 'Error loading google authentication'}
					{loading && 'Loading google authentication'}
				</h3>
				<Outlet />
			</main>
		</GoogleOAuthProvider>
	);
}
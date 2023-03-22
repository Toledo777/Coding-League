import React, { useState } from 'react';
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

	function getProbId(){
		if (user){
			return window.localStorage.getItem(`${user.email}-recentProblem`);
		} else {
			return '282A';
		}
	}

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav className='panel'>
				<Link to={'/'}>Home</Link>
				<Link to={`/solve/${getProbId()}`}>Solve</Link>
				<Link to={'/search'}>Search</Link>
				
				{/* temporarily hardcode route to user in the db */}
				<Link to={'/profile/cooluser123'}>Profile</Link>

				{!user && !error && <GoogleLogin onSuccess={handleLogin} onError={handleError} />}
				{user && user.username}
				{authError}
				{user && <button onClick={handleLogout}>Logout</button>}
				<h3>
					{error && 'Error loading google authentication'}
					{loading && 'Loading google authentication'}
				</h3>
			</nav>
			<main className='content'>

				<Outlet />
			</main>
		</GoogleOAuthProvider>
	);
}
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import useCredentials from './hooks/useCredentials';

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
		if (!res.ok) {
			const set = await res.json();
			setAuthError(set.error);
		} else {
			// Trigger useCredentials() to fetch for user creds, and display user's name
			dispatchEvent(new Event('login'));
		}
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
		// Trigger useCredentials() to fetch for user creds, and show google login component
		dispatchEvent(new Event('login'));
	}

	// event handler to route to profile
	const viewProfile = () => {
		// construct path to user's profile
		let path = '/profile/' + user._id;
		navigate(path);
	};

	return (
		<GoogleOAuthProvider clientId={data}>
			<nav className='panel'>
				<Link to={'/'}>Home</Link>
				<Link to={'/search'}>Search</Link>
				<Link to={'/leaderboard/'}>Leaderboard</Link>

				<div className='user' onClick={viewProfile} >
					{!user && !error && <GoogleLogin onSuccess={handleLogin} onError={handleError} />}
					<p>{user && user.username}</p>
					{user && <img src={user.avatar_uri} alt='user profile' referrerPolicy='no-referrer'></img>}
					{authError}
					{user && <button onClick={handleLogout}>Logout</button>}
				</div>

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
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/useFetch';
import useAuthFetch from './hooks/useAuthFetch';

export default function Root() {
	// fetch google client id
	let [error, loading, data] = useFetch('/api/google-client-id', [])
	
	// fetch google crendetials using token
	const [authError, authLoad, authData] = useAuthFetch('auth', credentials,[]);
	const [credentials, setCredentials] = useState(null);

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
		setCredentials(googleData.credentials)
		console.log(googleData);
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
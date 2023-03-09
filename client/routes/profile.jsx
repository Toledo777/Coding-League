import React from 'react';
import useCredentials from '../hooks/useCredentials';
import { useParams } from 'react-router-dom';

// profile page of a signed in user
// TODO reroute to sign in if user is not signed in
export default function Profile() {
    const [user, setUser] = useCredentials();
    // Get the username from the route
	const params = useParams();
	const { username } = params;

	return (
		<div>
			<h1>Profile!</h1>
		</div>
	);
}
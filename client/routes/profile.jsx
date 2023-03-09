import React from 'react';
import useCredentials from '../hooks/useCredentials';
import { useParams } from 'react-router-dom';
import user from '../components/user'

// profile page of a signed in user
// TODO reroute to sign in if user is not signed in
export default function Profile() {
    // const [user, setUser] = useCredentials();
    // Get the username from the route
	const params = useParams();
	const { username } = params;
	// fetch user with data to pass to user component
	const [userErr, userLoading, user] = useFetch('/api/user/username?=' + username, '');

	return (
		<div>
			<h1>Profile Page</h1>
			{userErr && <div>{userErr}</div>}
            {loading && <div>{userLoading}</div>}
            {user && <user user={user}/>}
		</div>
	);
}
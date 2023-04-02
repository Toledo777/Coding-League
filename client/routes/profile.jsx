import React from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import User from '../components/user/user';

// profile page of a signed in user
// TODO reroute to sign in if user is not signed in
export default function Profile() {
	// Get the username from the route
	const params = useParams();
	const { id } = params;
	// fetch user with data to pass to user component
	const [userErr, userLoading, userData] = useFetch('/api/user?id=' + id, '');
	return (
		<>
			<h1>Profile Page</h1>
			{userErr && <div>{userErr?.message}</div>}
			{userLoading && <div>{userLoading}</div>}
			{userData && <User user={userData} />}
		</>
	);
}
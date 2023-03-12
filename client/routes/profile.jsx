import React from 'react';
import useCredentials from '../hooks/useCredentials';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import User from '../components/user'
import EditForm from '../components/editForm';

// profile page of a signed in user
// TODO reroute to sign in if user is not signed in
export default function Profile() {
    // Get the username from the route
	const params = useParams();
	const { username } = params;
	// fetch user with data to pass to user component
	const [userErr, userLoading, userData] = useFetch('/api/user?username=' + username, '');

	return (
		<div>
			<h1>Profile Page</h1>
			{userErr && <div>{userErr}</div>}
            {userLoading && <div>{userLoading}</div>}
            {userData && <User user={userData} />}
			<button id="editBtn">Edit Profile</button>

			{/* button that could be used hide userEdit form */}
			<EditForm user={userData} />
		</div>
	);
}
import React from 'react';
import useCredentials from '../hooks/useCredentials';
import { useParams } from 'react-router-dom';
import User from '../components/user'

// profile page of a signed in user
// TODO reroute to sign in if user is not signed in
export default function Profile() {
    // Get the username from the route
	const params = useParams();
	const { username } = params;
	// fetch user with data to pass to user component

	// const [userErr, userLoading, user] = useFetch('/api/user/username?=' + username, '');
	const user = {username: "cooluser132", rank: "Bronze", avatar: "https://media.istockphoto.com/id/1284693553/vector/anonymous-vector-icon-incognito-sign-privacy-concept-human-head-with-glitch-face-personal.jpg?s=612x612&w=is&k=20&c=e4_EGMByg3W9Dm4ByRYIp1OWjqZbAmwVe8N7j9S5-iM=", wins: 999,  losses: 0, bio: "This is my biography"}

	return (
		<div>
			<h1>Profile Page</h1>
			{/* {userErr && <div>{userErr}</div>}
            {loading && <div>{userLoading}</div>} */}
            {user && <User user={user}/>}
		</div>
	);
}
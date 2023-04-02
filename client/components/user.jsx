import React from 'react';

// component to display user data, take user as input
export default function User({user}) {
	return(
		<>
			<div>
				<h2>{user.username}</h2>
				<img src={user.avatar_uri} alt="profile avatar"/>
				<p>Exp: {user.exp}</p>
			</div>
		</>
	);
}
import React from 'react';

// component to display user data, take user as input
export default function User({user}) {


	// TODO hide the email field a user is visiting someone elses profile
	return(
		<>
			<div>
				<h2>{user.username}</h2>
				<img src={user.avatar_uri} alt="profile avatar"/>
				<p>Rank: {user.exp}</p>
			</div>
		</>
	);
}
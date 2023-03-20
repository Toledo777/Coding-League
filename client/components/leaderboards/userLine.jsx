import React from 'react';


export default function userLine({ user }) {

	return (
		<div>
			{user.username} | {user.rank} | {parseInt(user.wins) / parseInt(user.losses)}
		</div>
	);
}
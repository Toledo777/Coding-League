import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function userLine({ user }) {

	const toUser = () => {
		navigate('/profile/' + user.username);
	};

	let navigate = useNavigate();
	return (
		<div onClick={toUser}>
			{user.username} | {user.rank} | {parseInt(user.wins) / parseInt(user.losses)}
		</div>
	);
}
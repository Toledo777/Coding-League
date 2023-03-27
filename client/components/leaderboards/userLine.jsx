import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function userLine({ user }) {

	const toUser = () => {
		if (user.username != 'error') {
			navigate('/profile/' + user.username);

		}
	};

	let navigate = useNavigate();
	return (
		<div onClick={toUser}>
			{user.username} | {user.exp}
		</div>
	);
}
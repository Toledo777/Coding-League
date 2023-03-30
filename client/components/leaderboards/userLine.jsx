import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function userLine({ user, index }) {

	const toUser = () => {
		if (user.username != 'error') {
			navigate('/profile/' + user._id);

		}
	};

	if (user.position) {
		index = '';
	}

	let navigate = useNavigate();
	if (user.username === '...') {
		return (
			<div onClick={toUser}>
				{user.username}
			</div>
		);
	}
	else {
		return (
			<div onClick={toUser}>
				{user.position} {index} {user.username} | {user.exp}
			</div>
		);
	}

}
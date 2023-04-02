import React from 'react';
import './leaderboard.css';
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
	if (user.username === '---' && !user.exp) {
		return (
			<div className='board_ellipsis' onClick={toUser}>
				<div className='row_elem'>{user.username}</div>
			</div>
		);
	}
	else {
		return (
			<div className='board_row' id={'user'+index} onClick={toUser}>
				<div className='row_elem'>{user.position}</div>
				<div className='row_elem'>{index}</div>
				<div className='row_elem'>{user.username}</div>
				<div className='align'>
					<div className='row_elem'>{user.exp}</div>
				</div>
			</div>
		);
	}

}
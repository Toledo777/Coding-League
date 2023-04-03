import React from 'react';
import './user.css';

// component to display user data, take user as input
export default function User({user}) {
	return(
		<>
			<div className='user_info'>
				<img src={user.avatar_uri} alt="profile avatar"/>
				<div className='name_exp'>
					<h2 className='username'>{user.username}</h2>
					<p className='exp'>Experience: <span id='exp_num'>{user.exp}</span></p>
				</div>
			</div>
		</>
	);
}
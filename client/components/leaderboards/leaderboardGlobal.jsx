import React from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';

export default function Leaderboard({ global }) {

	let [error, loading, users] = [];

	//if a global leaderboard is requested through the nav bar
	if (global === 'global') {
		[error, loading, users] = useFetch('/api/users?count=15', []);
	}
	//if a user is logged in and they request a local leaderboard, if they arent logged in the api will send them a global one
	else if (global === 'current') {
		[error, loading, users] = useFetch('/api/userNeighbors?count=3', []);
	}

	else {
		users = [{ username: 'error', exp: 'no users found' }];
	}

	return (
		<div>
			<div>
				<h1>Leaderboard!</h1>
			</div>
			<div>
				<h3>
					{error && error}
					{loading && 'loading...'}
				</h3>
				<div>
					{users.map(u => <div key={u._id}> <UserLine user={u}></UserLine> </div>)}
				</div>
			</div>
		</div>
	);
}
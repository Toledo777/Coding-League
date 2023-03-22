import React from 'react';
// import useCredentials from '../../hooks/useCredentials';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';

export default function Leaderboard({ global }) {

	let [error, loading, users] = [];

	//if a global leaderboard is requested through the nav bar
	if (global) {
		[error, loading, users] = useFetch('/api/users?count=15', []);
	}
	//otherwise a user-based leaderboard showing a few users above and below you
	else {
		// users = useCredentials();
		[error, loading, users] = useFetch('/api/userNeighbors?count=6&userExp=900', []);
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
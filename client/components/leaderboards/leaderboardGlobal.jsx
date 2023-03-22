import React from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';

export default function Leaderboard({ global }) {

	let [error, loading, users] = [];

	//if a global leaderboard is requested through the nav bar
	if (global) {
		[error, loading, users] = useFetch('/api/users?count=10', []);
		//sort by descending
		users.sort((a, b) => b.rank - a.rank);

	}
	//otherwise a user-based leaderboard showing a few users above and below you
	else {
		[error, loading, users] = useFetch('/api/users?count=1', []);
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
import React from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';

export default function Leaderboard({ global }) {

	let [error, loading, users] = [];

	if (global) {
		[error, loading, users] = useFetch('/api/users?count=5', []);
	}
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
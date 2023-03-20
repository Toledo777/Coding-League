import React from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';

export default function Leaderboard() {

	let [error, loading, users] = useFetch('/api/users?count=5', []);


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
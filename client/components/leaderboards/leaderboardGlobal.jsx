import React from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';
export default function Leaderboard() {

	let [error, loading, users] = [];
	let url = '/api/topUsers?count=3';

	[error, loading, users] = useFetch(url, [], [url]);


	if (users == undefined || users.count == 0) {
		error = 'no users found';
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
				<div className='leaderboard'>
					{!error && users.map((u, index) => <div key={u._id}> <UserLine index={index + 1} user={u}></UserLine> </div>)}
				</div>
			</div>
		</div >
	);
}
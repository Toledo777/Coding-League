import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import UserLine from './userLine';
import { useState } from 'react';
export default function Leaderboard({ global }) {

	let [error, loading, users] = [];
	let [url, setUrl] = useState('/api/users?count=15');


	useEffect(() => {
		//if a global leaderboard is requested through the nav bar
		if (global === 'global') {
			setUrl('/api/users?count=15');
		}

		//if a user is logged in and they request a local leaderboard, if they arent logged in the api will send them a global one
		else if (global === 'current') {
			console.log('setting');
			setUrl('/api/userNeighbors?count=3');
		}
	}, [global]);


	[error, loading, users] = useFetch(url, [url]);


	if (users == undefined || users.count == 0) {
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
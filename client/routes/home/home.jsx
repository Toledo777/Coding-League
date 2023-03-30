
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import './home.css';

export default function Home() {
	let [error, loading, data] = useFetch('/api/problem/random', []);
	const [msg, setMsg] = useState('');
	let navigate = useNavigate();

	const routeChange = () => {
		setMsg('');
		if (data) {
			let path = '/solve/' + data._id;

			navigate(path);
		} else {
			setMsg('Something happend. Please try again');
		}

	};
	return (
		<div className='home'>
			<div className='panel header'>
				<h1>Coding League</h1>
				<h2>Take your title as #1 of the Coding League</h2>
				<p>Over 3000 unique problems to try. Compete against other coders and climb your way up the leaderboard</p>

				<h3>
					{error && error}
					{loading && 'loading...'}
					{msg}
				</h3>
				{!loading && <button onClick={routeChange}>Try Random Problem :)</button>}
				{!loading && <button onClick={() => navigate('/search')}>Search Problem</button>}
			</div>
			<div className='cta'>

			</div>
		</div>
	);
}


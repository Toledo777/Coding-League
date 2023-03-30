
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './home.css';

export default function Home() {
	const [msg, setMsg] = useState('');
	let navigate = useNavigate();

	const randomProblem = async () => {
		try {
			let res = await fetch('/api/problem/random');
			let data = await res.json();
			navigate(`/solve/${data._id}`);
		} catch {
			setMsg('Failed to get random problem');
		}
	};


	return (
		<div className='home'>
			<div className='panel header'>
				<h1>Coding League</h1>
				<h2>Take your title as #1 of the Coding League</h2>
				<p>Over 3000 unique problems to try. Compete against other coders and climb your way up the leaderboard</p>

				<h3>
					{msg}
				</h3>
				{<button onClick={randomProblem}>Try Random Problem :)</button>}
				{<button onClick={() => navigate('/search')}>Search Problem</button>}
			</div>
			<div className='cta'>

			</div>
		</div>
	);
}


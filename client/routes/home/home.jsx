
import { IconDice6, IconSearch } from '@tabler/icons-react';
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
				<div className='cta'>
					<button className='btn warn' onClick={randomProblem}><p>Try Random Problem</p> <IconDice6 /> </button>
					<button className='btn confirm' onClick={() => navigate('/search')}><p>Search Problems</p> <IconSearch /> </button>
				</div>
				{msg}
			</div>
		</div>
	);
}


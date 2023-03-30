
import React from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import './home.css';

export default function Home() {
	let navigate = useNavigate();

	return (
		<div className='home'>
			<div className='panel header'>
				<h1>Coding League</h1>
				<p>Welcome to Coding League. To test your skills navigate to the solve page to try a random coding challenge!</p>
			</div>
			<div className='cta'>

			</div>
		</div>
	);
}


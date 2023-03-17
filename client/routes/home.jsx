
import React from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';

export default function Home() {


	let [error, loading, data] = useFetch('/api/problem/random', []);
	let navigate = useNavigate();

	const routeChange = () => {
		let path = '/solve/' + data._id;
		navigate(path);
	};


	return (
		<div>
			<h1>Home!</h1>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			<button onClick={routeChange}>Random Problem :)</button>
			<p>Welcome to Coding League. To test your skills navigate to the solve page to try a random coding challenge!</p>
			
		</div>
	);
}



import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import './home.css';

export default function Home() {
	let [error, loading, data] = useFetch('/api/problem/random', []);
	const [msg, setMsg] = useState('');
	let navigate = useNavigate();

	const routeChange = () => {
		setMsg('');
		if(data){
			let path = '/solve/' + data._id;
			
			navigate(path);
		} else {
			setMsg('Something happend. Please try again');
		}

	};
	return (
		<div className='home'>
			<h1 className='panel header'>Coding League</h1>
			<h3>
				{error && error}
				{loading && 'loading...'}
				{msg}
			</h3>
			{!loading && <button onClick={routeChange}>Random Problem :)</button>}
		
			<p>Welcome to Coding League. To test your skills navigate to the solve page to try a random coding challenge!</p>
		</div>
	);
}


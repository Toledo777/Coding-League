import React from 'react';
import Problem from '../components/problem';

export default function Home() {
	return (
		<div>
			<h1>Home!</h1>
			<Problem random='5'></Problem>
		</div>
	);
}
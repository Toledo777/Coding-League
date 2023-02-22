import React from 'react';
import Problem from '../components/problem';
import Editor from '../components/editor';

export default function Home() {
	return (
		<div>
			<h1>Home!</h1>
			<Problem range='5'></Problem>
		</div>
	);
}
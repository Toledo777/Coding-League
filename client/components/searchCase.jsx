import React from 'react';
import './searchCase.css';
export default function SearchCase() {
	return (
		<div className='outer'>
			<div className='insideProblem'>
				<h1>
					Problem title
				</h1>
				<h3>
					difficulty - type
				</h3>
				<h5>
					description goes here
				</h5>
			</div>
			<div className='insideButton'>
				<button className='actualButton'>
					Code
				</button>
			</div>
		</div >
	);
}
import React from 'react';
import './searchCase.css';
export default function SearchCase({ title, type }) {
	return (
		<div className='outer'>
			<div className='insideProblem'>
				Title:
				<div dangerouslySetInnerHTML={{ __html: title }} />
				Type:
				<div dangerouslySetInnerHTML={{ __html: type }} />
			</div>
			<div className='insideButton'>
				<button className='actualButton'>
					Code
				</button>
			</div>
		</div >
	);
}
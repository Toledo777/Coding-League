import React from 'react';
import './searchCase.css';
export default function SearchCase({ title, difficulty, type }) {
	if (difficulty == undefined) {
		difficulty = 'Not Applicable';
	}
	return (
		<div className='outer'>
			<div className='insideProblem'>
				Title:
				<div dangerouslySetInnerHTML={{ __html: title }} />
				Difficulty:
				<div dangerouslySetInnerHTML={{ __html: difficulty }} />
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
import React from 'react';
import { useNavigate } from 'react-router';
import './searchCase.css';
export default function SearchCase({ title, type, id }) {

	let navigate = useNavigate();

	const routeChange = () => {
		let path = '/solve/' + id;
		navigate(path);
	};

	return (
		<div className='outer'>
			<div className='insideProblem'>
				Title:
				<div dangerouslySetInnerHTML={{ __html: title }} />
				Type:
				<div dangerouslySetInnerHTML={{ __html: type }} />
			</div>
			<div className='insideButton'>
				<button className='actualButton' onClick={routeChange}>
					Code
				</button>
			</div>
		</div >
	);
}
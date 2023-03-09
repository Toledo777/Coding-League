import React from 'react';
import { useNavigate } from 'react-router';
import './searchResult.css';
export default function SearchResult({ title, type, id }) {

	const navigate = useNavigate();

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
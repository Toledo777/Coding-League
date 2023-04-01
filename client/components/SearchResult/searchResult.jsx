import React from 'react';
import { useNavigate } from 'react-router';
import './searchResult.css';
export default function SearchResult({ problem }) {
	const { title, _id } = problem;
	const navigate = useNavigate();
	return (
		<div className='search_result panel'>
			<h3>{title}</h3>
			<button onClick={() => navigate(`/solve/${_id}`)}>
				Code
			</button>
		</div >
	);
}
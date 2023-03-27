import React from 'react';
import { useNavigate } from 'react-router';

// mostly copied from SearchResult

export default function HistoryResult({ passed, submission, id }) {
	const navigate = useNavigate();
	return (
		<div className='history_result panel'>
			<h3>Problem ID: {id}</h3>
            <h3>Submission:</h3>
            <h3>Passed: {passed}</h3>
            <p>{submission}</p>
			<button onClick={() => navigate(`/solve/${id}`)}>
				Code
			</button>
		</div >
	);

}
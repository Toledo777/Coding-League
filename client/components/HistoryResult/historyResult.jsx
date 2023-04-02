import React from 'react';
import { useNavigate } from 'react-router';
import './historyResult.css';

// component for problem box on History page

// mostly copied from SearchResult
export default function HistoryResult({ passed, submission, id, title }) {
	const navigate = useNavigate();
	return (
		<div className='history_result panel'>
			<h3>{id} {title}</h3>
			<h3>Passed: {passed ? 'True': 'False'}</h3>
			<h3>Submission:</h3>
			<pre>
				<code>{submission}</code>
			</pre>
			<button onClick={() => navigate(`/solve/${id}`)}>
				View Problem
			</button>
		</div >
	);

}
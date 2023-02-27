import React from 'react';
import { useState } from 'react';
import Problem from '../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';
import AttemptOutput from '../components/attemptOutput';
import Editor from '../components/editor';

export default function Solve() {
	// Get the problem id from the route
	const params = useParams();
	const { id } = params;

	const [debugCode, setDebugCode] = useState(null);
	const [solution, setSolution] = useState('');

	const debugSubmission = { code: debugCode, problem_id: id };

	const [debugError, debugLoading, debugResult] = usePost('/api/problem/debug', debugSubmission, null, [debugCode]);

	const debugSolution = () => {
		setDebugCode(solution);
	};

	return <div>
		<Problem id={id} />
		<Editor onChange={(value) => setSolution(value)} />


		{debugError && <div>{debugError}</div>}
		{debugLoading && <div>{debugLoading}</div>}
		{debugResult && <AttemptOutput result={debugResult} />}


		<div className='form-div'>
			<div className='form-buttons'>
				<button className='debug' onClick={debugSolution}>Debug</button>
			</div>
		</div>
		<div className='status'>
			<h2 className='status-text'></h2>
		</div>
		<div className='after-running' style={{ visibility: 'hidden' }}>
			<p className='completed'></p>
			<button className='next' style={{ display: 'none' }}>Next problem</button>
			<button className='skip'>Skip problem</button>
		</div>
	</div>;
}
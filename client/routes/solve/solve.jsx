import React from 'react';
import { useState } from 'react';
import Problem from '../../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import AttemptOutput from '../../components/attemptOutput/attemptOutput';
import Editor from '../../components/editor/editor';
import './solve.css';

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

	return <div className='solve'>
		<div className='vertical-panel'>
			<Problem id={id} />

			<div>
				{debugError && <div>{debugError}</div>}
				{debugLoading && <div>{debugLoading}</div>}
				{debugResult && <AttemptOutput result={debugResult} />}
			</div>
		</div>

		<div className='editor-container panel'>
			<div className='editor-sizer'>
				<Editor onChange={(value) => setSolution(value)} />
			</div>
			<div className='editor-buttons'>
				<button className='debug btn' onClick={debugSolution}>Debug</button>
				<button className='submit btn' onClick={debugSolution}>Submit</button>
			</div>
		</div>
	</div>;
}
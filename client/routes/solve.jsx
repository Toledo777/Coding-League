import React from 'react';
import { useState } from 'react';
import Problem from '../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';
import AttemptOutput from '../components/attemptOutput';

export default function Solve() {
	// Get the problem id from the route
	const params = useParams();
	const { id } = params;

	const [debugCode, setDebugCode] = useState(null);
	const [solution, setSolution] = useState('');

	const debugSubmission = { code: debugCode, problem_id: id };

	const [debugError, debugLoading, debugResult] = usePost('/api/problem/debug', debugSubmission, null, [debugCode]);

	// const status = {
	// 	running: 'running',
	// 	stopped: 'stopepd',
	// 	correct: 'correct',
	// 	incorrect: 'incorrect'
	// };

	// const [codeStatus, setCodeStatus] = useState(status.stopped);

	/**
	 * update textArea as user types
	 * @param {Object} event 
	 */
	function handleSolutionChange(event) {
		setSolution(event.target.value);
	}

	/**
	 * clear textArea on "clear" button press
	 */
	function clearSolution() {
		setSolution('');
	}

	/**
	 * grab text from textArea (to be replaced with proper IDE)
	 * simulate running code using timeout promises to mimick the code taking time to run
	 * update page with post-execution stats (test case completion, passed/failed, etc.)
	 */
	async function debugSolution() {
		setDebugCode(solution);
	}

	return <div>
		<Problem id={id} />

		{debugError && <div>{debugError}</div>}
		{debugLoading && <div>{debugLoading}</div>}
		{debugResult && <AttemptOutput result={debugResult} />}

		<div className='form-div'>
			<div className='form-input'>
				<textarea className='solution' rows='15' cols='60' onChange={handleSolutionChange} value={solution}>
				</textarea>
			</div>
			<div className='form-buttons'>
				<button className='clear' onClick={clearSolution}>Clear</button>
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
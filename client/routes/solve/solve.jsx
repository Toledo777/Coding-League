import React, { useState } from 'react';
import Problem from '../../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import AttemptOutput from '../../components/attemptOutput/attemptOutput';
import Editor from '../../components/editor/editor';
import SplitPane from '../../components/splitPane/splitPane';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loader/loader';
import './solve.css';

export default function Solve() {
	// Get the problem id from the route
	const { id } = useParams();
	const [error, loading, problem] = useFetch(`/api/problem/id/?id=${id}`);
	const [solution, setSolution] = useState('');

	const [debugError, debugLoading, debugResult, sendDebug] = usePost('/api/problem/debug');
	const [submitError, submitLoading, submitResult, sendSubmit] = usePost('/api/problem/submit');

	const submitSolution = () => {
		sendSubmit({
			code: solution,
			problem_id: id
		});
	};

	const debugSolution = () => {
		sendDebug({
			code: solution,
			problem_id: id
		});
	};

	return <div className='solve'>
		<SplitPane labels={['problem', 'debug', 'submission']}>
			{loading && 'Loading...' || error || <Problem problem={problem} />}
			<div>
				{<AttemptOutput result={debugResult} />}
				{debugError && { debugError }}
				{debugLoading && <Loading />}
			</div>
			<div>
				{<AttemptOutput result={submitResult} />}
				{submitError && { submitError }}
				{submitLoading && <Loading />}
			</div>
		</SplitPane>

		<div className='editor-container panel'>
			<div className='editor-sizer'>
				<Editor onChange={setSolution} />
			</div>
			<div className='editor-buttons'>
				<button disabled={debugLoading} className='debug btn' onClick={debugSolution}>Debug</button>
				<button disabled={submitLoading} className='submit btn confirm' onClick={submitSolution}>Submit</button>
			</div>
		</div>
	</div>;
}
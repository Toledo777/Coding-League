import React, { useState, useEffect } from 'react';
import Problem from '../../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import AttemptOutput from '../../components/attemptOutput/attemptOutput';
import Editor from '../../components/editor/editor';
import SplitPane from '../../components/splitPane/splitPane';
import useFetch from '../../hooks/useFetch';
import useCredentials from '../../hooks/useCredentials';
import Loading from '../../components/loader/loader';
import './solve.css';

export default function Solve() {
	// Get the problem id from the route
	const params = useParams();
	const { id } = params;
	const [error, loading, problem] = useFetch(`/api/problem/id/?id=${id}`);
	const [solution, setSolution] = useState('');
	const [debugError, debugLoading, debugResult, sendDebug] = usePost('/api/problem/debug');

	const user = useCredentials();

	const debugSolution = () => {
		sendDebug({
			code: solution,
			problem_id: id
		});
	};

	const handleSolutionChange = (value) => {
		setSolution(value);
		window.localStorage.setItem(`${id}-${user.email}`, value);
	};

	useEffect(() => {
		if (user.email !== undefined){
			setSolution(window.localStorage.getItem(`${id}-${user.email}`));
		}
	});

	return <div className='solve'>
		<SplitPane labels={['problem', 'output']}>
			{loading && 'Loading...' || error || <Problem problem={problem} />}
			<div>
				{<AttemptOutput result={debugResult} />}
				{debugError && <div>{debugError}</div>}
				{debugLoading && <Loading />}
			</div>
		</SplitPane>

		<div className='editor-container panel'>
			<div className='editor-sizer'>
				<Editor onChange={(value) => handleSolutionChange(value)} solution={solution} />
			</div>
			<div className='editor-buttons'>
				<button className='debug btn' onClick={debugSolution}>Debug</button>
				<button className='submit btn confirm' onClick={debugSolution}>Submit</button>
			</div>
		</div>
	</div>;
}
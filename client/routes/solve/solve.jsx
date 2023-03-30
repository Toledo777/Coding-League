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
	const [submitError, submitLoading, submitResult, sendSubmission] = usePost('/api/problem/submit');

	const user = useCredentials();

	const debugSolution = async () => {
		const response = await fetch('/auth/protected');

		// check if user is signed in
		if (!response.ok) {
			alert('Please sign in to debug and submit your code.');
		}

		else {
			sendDebug({
				code: solution,
				problem_id: id
			});
		}
	};

	const submitSolution = () => {
		sendSubmission({
			email: user.email,
			code: solution,
			problem_id: id,
			problem_title: problem.title
		});
	};

	const handleSolutionChange = (value) => {
		setSolution(value);
		if (user){
			window.localStorage.setItem(`${id}-${user.email}`, value);
		}
	};

	useEffect(() => {
		if (user){
			setSolution(window.localStorage.getItem(`${id}-${user.email}`));
		}
	}, [user]);

	return <div className='solve'>
		<SplitPane labels={['problem', 'output']}>
			{loading && 'Loading...' || error || <Problem problem={problem} />}
			<div>
				{<AttemptOutput result={debugResult || submitResult} />}
				{debugError && <div>{debugError.message}</div>}
				{submitError && <div>{submitError.message}</div>}
				{debugLoading && <Loading />}
				{submitLoading && <Loading />}
			</div>
		</SplitPane>

		<div className='editor-container panel'>
			<div className='editor-sizer'>
				<Editor onChange={(value) => handleSolutionChange(value)} solution={solution} />
			</div>
			<div className='editor-buttons'>
				<button className='debug btn' onClick={debugSolution}>Debug</button>
				<button className='submit btn confirm' onClick={submitSolution}>Submit</button>
			</div>
		</div>
	</div>;
}
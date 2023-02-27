import React from 'react';
import { useState } from 'react';
import Problem from '../../components/problem';
import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import AttemptOutput from '../../components/attemptOutput/attemptOutput';
import Editor from '../../components/editor/editor';
import style from './solve.module.css';

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

	return <div className={style.solve}>
		<div className={style.verticalPanel}>
			<Problem id={id} />
		</div>

		<div className={style.editorContainer}>
			<Editor onChange={(value) => setSolution(value)} />
			<div className={style['editor-buttons']}>
				<button className='debug' onClick={debugSolution}>Debug</button>
			</div>
		</div>

		<div>
			{debugError && <div>{debugError}</div>}
			{debugLoading && <div>{debugLoading}</div>}
			{debugResult && <AttemptOutput result={debugResult} />}
		</div>
	</div>;
}
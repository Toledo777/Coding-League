import React from 'react';
import TestCaseView from './testCase';
import './attemptOutput.css';

export default function AttemptOutput({ result }) {
	if (!result) {
		return <div>Empty :(</div>;
	}

	const {
		all_ok,
		total_ran,
		failures,
		individual_tests
	} = result;

	return (
		<div>
			<div className='status'>{all_ok ? 'Passed' : 'Failed'}</div>
			<div className='counts'>
				Passed: {total_ran - failures}/{total_ran}
			</div>
			<div>
				{individual_tests
					.map((testCase, index) => ({ testCase, index }))
					.map(TestCaseView)}
			</div>
		</div>
	);
}



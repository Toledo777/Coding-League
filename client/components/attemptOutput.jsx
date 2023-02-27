import React from 'react';
import propTypes from 'prop-types';
import TestCaseView from './testCaseView';

export default function AttemptOutput({ result }) {
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
				{individual_tests.map((testCase, index) => ({ testCase, index })).map(TestCaseView)}
			</div>
		</div>
	);
}

AttemptOutput.propTypes = {
	result: {
		all_ok: propTypes.bool,
		total_ran: propTypes.number,
		failures: propTypes.number,
		individual_tests: propTypes.arrayOf(
			{
				ok: propTypes.bool,
				stdout: propTypes.string,
				stderr: propTypes.string,
				answer: propTypes.string,
				expected: propTypes.string,
			}
		),
	}
};

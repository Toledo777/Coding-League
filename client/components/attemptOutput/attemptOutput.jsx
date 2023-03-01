import React from 'react';
import propTypes from 'prop-types';
import TestCaseView from './testCase';
import style from './attemptOutput.module.css';

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
		<div className={style.testCase}>
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

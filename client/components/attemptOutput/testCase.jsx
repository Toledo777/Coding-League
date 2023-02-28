import React, { useState } from 'react';
import propTypes from 'prop-types';
import { IconCircleX, IconCircleCheck, IconCaretRight, IconCaretDown } from '@tabler/icons-react';
import style from './attemptOutput.module.css';
import TermView from '../terminal/termView';

export default function TestCase({ testCase, index }) {
	const [expanded, setExpanded] = useState(false);
	const { ok, stderr, stdout, answer, expected } = testCase;

	return <div className={style.testCase}>
		<div className='case-heading'>
			<span className='case-status'>
				{ok ? <IconCircleCheck color='green' /> : <IconCircleX color='red' />}
			</span>
			<span className='case-label'>Test Case #{index}</span>

			<span className='dropdown-toggle' onClick={() => setExpanded(!expanded)}>
				{expanded ? <IconCaretDown /> : <IconCaretRight />}
			</span>
			{expanded && <div>
				<div>
					expected: <code>{expected}</code>
					but received: <code>{answer}</code>
				</div>
				<TermView data={stderr} label="Stderr" />
				<TermView data={stdout} label="Stdout" />
			</div>}
		</div>
	</div >;
}

TestCase.propTypes = {
	index: propTypes.number,
	testCase: {
		ok: propTypes.bool,
		stdout: propTypes.string,
		stderr: propTypes.string,
		answer: propTypes.string,
		expected: propTypes.string,
	}
};
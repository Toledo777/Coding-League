import React, { useState } from 'react';
import { IconCircleX, IconCircleCheck, IconCaretRight, IconCaretDown } from '@tabler/icons-react';
import TermView from '../terminal/termView';
import SplitPane from '../splitPane/splitPane';
import './attemptOutput.css';

export default function TestCase({ testCase, index }) {
	const [expanded, setExpanded] = useState(false);
	const { ok, stderr, stdout, answer, expected } = testCase;

	return <div className='test-case' key={index}>
		<div className='case-heading'>
			<span className='case-status'>
				{ok ? <IconCircleCheck color='green' /> : <IconCircleX color='red' />}
			</span>

			<span className='case-label'>Test Case #{index}</span>

			<span className='dropdown-toggle' onClick={() => setExpanded(!expanded)}>
				{expanded ? <IconCaretDown /> : <IconCaretRight />}
			</span>
			{expanded && <>
				<div>
					expected: <code>{expected}</code>
					but received: <code>{answer}</code>
				</div>
				<SplitPane labels={['stderr', 'stdout']} value={stderr.length ? 'stderr' : 'stdout'}>
					<TermView data={stderr} label="Stderr" />
					<TermView data={stdout} label="Stdout" />
				</SplitPane>
			</>}
		</div>
	</div >;
}


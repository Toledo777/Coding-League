import React, { useState } from 'react';
import { IconCircleX, IconCircleCheck, IconCaretRight, IconCaretDown } from '@tabler/icons-react';
export default function TestCaseView({ testCase, index }) {
	const [expanded, setExpanded] = useState(false);
	const { ok, stderr, stdout, answer, expected } = testCase;
	console.log(answer);

	return <div>
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
				<div className='stderr-container'>
					<div>stderr</div>
					<code className='stderr'>{stderr}</code>
				</div>
				<div className='stdout-container'>
					<div>stdout</div>
					<code className='stdout'>{stdout}</code>
				</div>
			</div>}
		</div>
	</div >;
}


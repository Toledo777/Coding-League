import React from 'react';

export default function Problem({ problem }) {
	return (
		<div className='problem'>
			<h3 className='header'>
				{problem.title}
			</h3>
			<i>{problem._id}</i>
			<div className='problem-content'>
				<div className='description'>
					<div dangerouslySetInnerHTML={{ __html: problem.description }} />
					<div dangerouslySetInnerHTML={{ __html: problem.input_specification }} />
					<div dangerouslySetInnerHTML={{ __html: problem.output_specification }} />
					<div dangerouslySetInnerHTML={{ __html: problem.memory_limit }} />
					<div dangerouslySetInnerHTML={{ __html: problem.time_limit }} />
					<div dangerouslySetInnerHTML={{ __html: problem.note }} />
				</div>
			</div>
		</div>
	);
}

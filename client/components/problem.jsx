import React from 'react';

export default function Problem({ problem }) {
	return (
		<div className='problem'>
			<label htmlFor='language-select'>Language:</label>
			<select name='language' id='language-select'>
				<option value='javascript'>Javascript</option>
			</select>

			<h3 className='header'>
				{problem.title}
			</h3>
			<i>{problem._id}</i>
			<div className='problem-content'>
				<div className='description'>
					<div dangerouslySetInnerHTML={{ __html: problem.description }} />
					<div dangerouslySetInnerHTML={{ __html: problem.inputSpecification }} />
					<div dangerouslySetInnerHTML={{ __html: problem.outputSpecification }} />
					<div dangerouslySetInnerHTML={{ __html: 'Memory Limit : ' + problem.memoryLimit }} />
					<div dangerouslySetInnerHTML={{ __html: 'Time Limit: ' + problem.timeLimit }} />
					<div dangerouslySetInnerHTML={{ __html: problem.notes }} />
				</div>
			</div>
		</div>
	);
}

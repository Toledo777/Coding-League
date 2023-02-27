import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem({ id }) {
	let [error, loading, data] = useFetch('/api/problem/id/?id=' + id, []);

	return (
		<div className='problem'>
			<h3>
				{error && error}
				{loading && 'loading...' + id}
			</h3>
			<h3 className='header'>
				<div dangerouslySetInnerHTML={{ __html: data.id }} />
				<div dangerouslySetInnerHTML={{ __html: data.title }} />
			</h3>
			<div className='problem-content'>
				<div className='description'>
					<div dangerouslySetInnerHTML={{ __html: data.description }} />
					<div dangerouslySetInnerHTML={{ __html: data.input_specification }} />
					<div dangerouslySetInnerHTML={{ __html: data.output_specification }} />
					<div dangerouslySetInnerHTML={{ __html: data.memory_limit }} />
					<div dangerouslySetInnerHTML={{ __html: data.time_limit }} />
					<div dangerouslySetInnerHTML={{ __html: data.note }} />
				</div>
			</div>
		</div>
	);
}
Problem.propTypes = {
	id: PropTypes.string
};
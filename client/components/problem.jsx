import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem(props) {


	const [error, loading, data] = useFetch('/api/problem/random?range=' + props.range, 1, []);



	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			<div dangerouslySetInnerHTML={{ __html: data.description }} />
			<div dangerouslySetInnerHTML={{ __html: data.input_specification }} />
			<div dangerouslySetInnerHTML={{ __html: data.output_specification }} />
			<div dangerouslySetInnerHTML={{ __html: data.memory_limit }} />
			<div dangerouslySetInnerHTML={{ __html: data.time_limit }} />
			<div dangerouslySetInnerHTML={{ __html: data.note }} />
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
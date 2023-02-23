import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem(props) {

	let specification;
	//stratgy pattern, depending on prop specification, api url will change
	for (let key in props) {
		specification = `${key}?${key}=${props[key]}`
	}
	//preliminary difficulty implementation
	let extra = '&difficulty=10';
	let [error, loading, data] = useFetch('api/problem/' + specification + extra, 1, []);

	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			<h3>
				<div dangerouslySetInnerHTML={{ __html: data._id }} />
				<div dangerouslySetInnerHTML={{ __html: data.title }} />
			</h3>
			<div dangerouslySetInnerHTML={{ __html: data.description }} />
			<div dangerouslySetInnerHTML={{ __html: data.input_specification }} />
			<div dangerouslySetInnerHTML={{ __html: data.output_specification }} />
			<div dangerouslySetInnerHTML={{ __html: data.memory_limit }} />
			<div dangerouslySetInnerHTML={{ __html: data.time_limit }} />
			<div dangerouslySetInnerHTML={{ __html: data.notes }} />
		</div>
	);
}
Problem.propTypes = {
	random: PropTypes.string
};
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
				<div dangerouslySetInnerHTML={{ __html: data.description }} />
			</h3>
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
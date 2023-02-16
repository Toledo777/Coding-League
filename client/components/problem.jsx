import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem(props) {


	const [error, loading, data] = useFetch('/api/problem?range=' + props.range, 1, []);

	console.log(data);
	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
				<div dangerouslySetInnerHTML={{ __html: data }} />
			</h3>
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
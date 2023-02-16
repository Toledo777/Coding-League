import React from 'react';

import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem(props) {


	const [error, loading, data] = useFetch('/api/problem?range=' + props.range, 1, []);

	if (error !== undefined) {
		console.log('there is an error!!!');
		data.text = error;
	}

	if (loading == true) {
		console.log('still loading');
		data.text = 'loading...';
	}

	return (
		<div>
			<h3>
				{data.text}
			</h3>
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
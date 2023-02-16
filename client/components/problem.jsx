import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Problem(props) {

	return (
		<div>
			<h3>
				{(useFetch('/api/one-problem?range=' + props.range, 1, [])[2].text)}
			</h3>
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
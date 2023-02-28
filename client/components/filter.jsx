import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Filter() {
	const [filterParams, setFilterParams] = useState({ type: ['all'], range: [0, 3500] });

	function setFilter(value) {
		console.log(value);
	}

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select multiple="true" onChange={(value) => setFilter(value)}>
				<option value="val1">math</option>
				<option value="val2">probabilities</option>
				<option value="val3">data structures</option>
				<option value="val4">geometry</option>
			</select>
		</div>
	);
}

// Filter.propTypes = {
// 	id: PropTypes.string
// };
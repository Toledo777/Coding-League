import React from 'react';
import { useState, useEffect } from 'react';
// import { RangeSlider } from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';

export default function Filter({ setTags, setRange }) {
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(0);
	const [minValue2, setMinValue2] = useState(0);
	const [maxValue2, setMaxValue2] = useState(0);

	const handleChangeInput = (e) => {
		setMinValue(e.minValue);
		setMaxValue(e.maxValue);
	};

	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		setTags(choices);
	}

	function setRangeHelper(event) {
		setRange(event);
		// updateFilter(tags, range);
	}

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select multiple={true} onChange={(event) => setTagsHelper(event)}>
				<option value="val1">math</option>
				<option value="val2">probabilities</option>
				<option value="val3">data structures</option>
				<option value="val4">geometry</option>
			</select>
			
			{/* <RangeSlider /> */}
		</div>
	);
}
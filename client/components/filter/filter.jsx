import React from 'react';

export default function Filter({ setTags, setRange }) {

	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		setTags(choices);
	}

	function setRangeHelper(value) {
		setRange(value);
		// updateFilter(tags, range);
	}

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select className="tags" multiple={true} onChange={(event) => setTagsHelper(event)}>
				<option value="val1">math</option>
				<option value="val2">probabilities</option>
				<option value="val3">data structures</option>
				<option value="val4">geometry</option>
			</select>
			<input className="slider" type="range" min="800" max="2500" value="50"></input>
		</div>
	);
}
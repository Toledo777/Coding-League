import React from 'react';
import './filter.css';
import { useState, useEffect } from 'react';

export default function Filter({ tags, setTags, diffRange, setDiffRange }) {
	const MultiRangeSlider = require('multi-range-slider-react').default;
	// const [minValue, setMinValue] = useState(800);
	// const [maxValue, setMaxValue] = useState(3500);
	const [sliderRange, setSliderRange] = useState([800, 3500]);

	// Check in with others to see if we can get tags programatically instead of... this.
	const tagLabels = [
		'math',
		'probabilities',
		'data structures',
		'geometry',
		'bitmasks',
		'dfs and similar',
		'dp',
		'combinatorics',
		'binary search',
		'brute force',
		'greedy',
		'sortings',
		'constructive algorithms',
		'dsu',
		'implementation',
		'strings',
		'trees',
		'graphs',
		'divide and conquer',
		'two pointers',
		'fft',
		'number theory',
		'hashing',
		'shortest paths',
	];

	// When user selects from multi-select, update the tags state to currently selected options
	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		if (choices.length === 0) {
			choices = ['all'];
		}
		setTags(choices);
	}

	// When either the min or max value of the slider changes, update the difficulty range state accordingly
	// useEffect(() => {
	// 	setDiffRange([minValue, maxValue]);
	// }, [minValue, maxValue]);

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select className='tagSelect' multiple={true} onChange={(event) => setTagsHelper(event)}>
				{tagLabels.length > 0 && tagLabels.map((label, index) => <option key={index} value={label}>{label}</option>)}
			</select>
			<button className='clearTags' onClick={() => { setTags(['all']); }}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag} </li>)}
			</ul>
			<h3>Difficulty</h3>
			<MultiRangeSlider className='diffSlider' min='800' max='3500' minValue={sliderRange[0]} maxValue={sliderRange[1]} step={100} stepOnly={true} onChange={(event) => { setSliderRange([event.minValue, event.maxValue]); }} />
			<button className='clearRange' onClick={() => { setSliderRange([800, 3500]); }}>Clear difficulty</button>
			<p>Range: {sliderRange[0]} - {sliderRange[1]}</p>
			<button className='resetParams' onClick={() => { setTags(['all']); setSliderRange([800, 3500]); }}>Reset filters</button>
		</div>
	);
}

// () => { setMinValue(800); setMaxValue(3500); }
// clearSlider
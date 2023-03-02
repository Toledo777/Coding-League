import React from 'react';
import './filter.css';
import { useState, useEffect } from 'react';

export default function Filter({ tags, setTags, diffRange, setDiffRange }) {
	const MultiRangeSlider = require('multi-range-slider-react').default;
	const [minValue, setMinValue] = useState(800);
	const [maxValue, setMaxValue] = useState(3500);

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

	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		if (choices.length === 0){
			choices = ['all'];
		}
		setTags(choices);
	}

	useEffect (() => {
		setDiffRange([minValue, maxValue]);
	}, [minValue, maxValue]);

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select className='tagSelect' multiple={true} onChange={(event) => setTagsHelper(event)}>
				{tagLabels.length > 0 && tagLabels.map((label, index) => <option key={index} value={label}>{label}</option>)}
			</select>
			<button className='clearTags' onClick={() => {setTags(['all']);}}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag} </li>)}
			</ul>
			<h3>Difficulty</h3>
			<MultiRangeSlider className='diffSlider' min='800' max='3500' minValue={minValue} maxValue={maxValue} step={100} stepOnly={true} onChange={(event) => {setMinValue(event.minValue); setMaxValue(event.maxValue);}} />
			<button className='clearRange' onClick={() => {setMinValue(800); setMaxValue(3500);}}>Clear difficulty</button>
			<p>Range: {diffRange[0]} - {diffRange[1]}</p>
			<button className='resetParams' onClick={() => {setTags(['all']); setMinValue(800); setMaxValue(3500);}}>Reset filters</button>
		</div>
	);
}
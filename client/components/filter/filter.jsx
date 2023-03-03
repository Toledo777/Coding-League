import React, { useEffect } from 'react';
import './filter.css';
import useFetch from '../../hooks/useFetch';

export default function Filter({ tags, setTags, diffMin, diffMax, setDiffMin, setDiffMax }) {
	const MultiRangeSlider = require('multi-range-slider-react').default;

	const [error, loading, tagLabels] = useFetch('/api/allTags', []);

	// When user selects from multi-select, update the tags state to currently selected options
	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		if (choices.length === 0) {
			choices = ['all'];
		}
		setTags(choices);
	}

	useEffect(() => {
		console.log((tagLabels.length));
	}, [tagLabels]);

	const sliderChange = (min, max) => {
		setDiffMin(min);
		setDiffMax(max);
	};

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select className='tagSelect' multiple={true} onChange={(event) => setTagsHelper(event)}>
				{ tagLabels.length > 0 && tagLabels.map((tag, index) => <option key={index} value={tag.name}>{tag.name}</option>)}
			</select>
			<button className='clearTags' onClick={() => { setTags(['all']); }}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag} </li>)}
			</ul>
			<h3>Difficulty</h3>
			<MultiRangeSlider className='diffSlider' min='800' max='3500' minValue={diffMin} maxValue={diffMax} step={100} stepOnly={true} onChange={(event) => sliderChange(event.minValue, event.maxValue)} />
			<button className='clearRange' onClick={() => { sliderChange(800, 3500); }}>Clear difficulty</button>
			<p>Range: {diffMin} - {diffMax}</p>
			<button className='resetParams' onClick={() => { setTags(['all']); sliderChange(800, 3500); }}>Reset filters</button>
		</div>
	);
}
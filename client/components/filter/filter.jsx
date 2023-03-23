import React, { useState, useEffect } from 'react';
import './filter.css';
import useFetch from '../../hooks/useFetch';
import 'react-range-slider-input/dist/style.css';
// const RangeSlider = require('react-range-slider-input').default;
import { default as _RangeSlider } from 'react-range-slider-input';
const RangeSlider = _RangeSlider.default;

export default function Filter({ filterChange }) {
	// Fetch all tags for tag multielect
	const [error, loading, tagLabels] = useFetch('/api/allTags', []);

	const [tags, setTags] = useState([]);
	const [diffMin, setDiffMin] = useState(800);
	const [diffMax, setDiffMax] = useState(3500);

	// Update the tags state to currently selected options (or empty array when clicking 'Clear tags' button)
	const setTagsHelper = (tagsList) => {
		let choices = tagsList.map(({ value }) => value);
		setTags(choices);
	};

	// Clear selected tags list
	const clearTags = () => {
		setTags([]);
	};

	// Update range state, slider appearance and thumb positions when user moves either thumb (or resets state and appearance when clicking 'Clear difficulty' button)
	const setDiffRangeHelper = (min, max) => {
		setDiffMin(min);
		setDiffMax(max);
		calculateColor([min, max]);
	};

	// Reset range state, slider appearance and thumb positions
	const clearDiffRange = () => {
		setDiffRangeHelper(800, 3500);
	};

	// Reset all filter components to default
	const clearFilters = () => {
		setTagsHelper([]);
		setDiffRangeHelper(800, 3500);
	};

	// Calculate slider gradient color in realtime using current range value attached to each thumb
	const calculateColor = (values) => {
		const [minColor, maxColor] = values.map(v => (255 * ((v - 800) / (3500 - 800))));

		const newStart = `rgba(${minColor},${255 - minColor},0,1.0)`;
		const newEnd = `rgba(${maxColor},${255 - maxColor},0,1.0)`;

		const slider = document.querySelector('.diffSlider');
		slider.style.setProperty('--gradient-start', newStart);
		slider.style.setProperty('--gradient-end', newEnd);
	};

	// Calculate slider gradient color on first page load
	useEffect(() => {
		calculateColor([diffMin, diffMax]);
	}, []);

	useEffect(() => {
		filterChange(tags, [diffMin, diffMax]);
	}, [tags]);


	const newSetter = () => {
		filterChange(tags, [diffMin, diffMax]);
	};

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			{error && error}
			{loading && 'loading...'}
			<select className='tagSelect' multiple={true} onInput={(event) => setTagsHelper(Array.from(event.target.selectedOptions))}>
				{tagLabels.map((tag, index) => <option key={index} value={tag}>{tag}</option>)}
			</select>
			<button className='clearTags' onClick={() => { clearTags(); }}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0
					? tags.map((tag, index) => <li key={index}>{tag}</li>)
					: <li key={0}>all</li>
				}
			</ul>
			<h3>Difficulty</h3>
			<RangeSlider
				className='diffSlider'
				id="diffSlider"
				style='--gradient-start: rgba(0,0,255,1.0); --gradient-end: rgba(255,0,0,1.0);'
				min='800'
				max='3500'
				step='100'
				value={[diffMin, diffMax]}
				defaultValue={[diffMin, diffMax]}
				onInput={(event) => { setDiffRangeHelper(event[0], event[1]); }}
				onThumbDragEnd={newSetter} />
			<button className='clearRange' onClick={() => { clearDiffRange(); }}>Clear difficulty</button>
			<p>Range: {diffMin} - {diffMax}</p>
			<button className='resetParams' onClick={() => { clearFilters(); }}>Reset filters</button>
		</div>
	);
}
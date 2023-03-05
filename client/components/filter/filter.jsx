import React, { useEffect } from 'react';
import './filter.css';
import useFetch from '../../hooks/useFetch';
import 'react-range-slider-input/dist/style.css';
const RangeSlider = require('react-range-slider-input').default;

export default function Filter({ tags, setTags, diffMin, diffMax, setDiffMin, setDiffMax }) {

	// Fetch all tags for tag multielect
	const [error, loading, tagLabels] = useFetch('/api/allTags', []);

	// When user selects from multi-select, update the tags state to currently selected options
	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		setTags(choices);
	}

	// Handle slider value changing
	const sliderChange = (min, max) => {
		setDiffMin(min);
		setDiffMax(max);
		calculateColor([min, max]);
	};

	// Handle slider clear button or filters clear button click
	const sliderClear = () => {
		sliderChange(800, 3500);
		document.querySelector('.diffSlider').value = [800, 3500];
	};

	// Calculate slider gradient color in realtime using current values of the thumbs
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

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select className='tagSelect' multiple={true} onChange={(event) => setTagsHelper(event)}>
				{ tagLabels.error === undefined && tagLabels.map((tag, index) => <option key={index} value={tag}>{tag}</option>)}
			</select>
			<button className='clearTags' onClick={() => { setTags(['all']); }}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag}</li>) || tags.length === 0 && (() => <li key={0}>all</li>)}
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
				onInput={(event) => { sliderChange(event[0], event[1]); }}/>
			<button className='clearRange' onClick={() => { sliderClear(); }}>Clear difficulty</button>
			<p>Range: {diffMin} - {diffMax}</p>
			<button className='resetParams' onClick={() => { setTags(['all']); sliderClear(); }}>Reset filters</button>
		</div>
	);
}
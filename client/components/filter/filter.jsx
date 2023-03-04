import React, { useEffect } from 'react';
import './filter.css';
import useFetch from '../../hooks/useFetch';
import 'react-range-slider-input/dist/style.css';

export default function Filter({ tags, setTags, diffMin, diffMax, setDiffMin, setDiffMax }) {
	const RangeSlider = require('react-range-slider-input').default;

	// Fetch all tags for tag multielect
	const [error, loading, tagLabels] = useFetch('/api/allTags', []);

	// When user selects from multi-select, update the tags state to currently selected options
	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		if (choices.length === 0) {
			choices = ['all'];
		}
		setTags(choices);
	}

	// Handle slider value changing
	const sliderChange = (event) => {
		setDiffMin(event[0]);
		setDiffMax(event[1]);
		calculateColor(event);
	};

	// Handle slider clear button or filters clear button click
	const sliderClear = (values) => {
		sliderChange(values);
		document.querySelector('.diffSlider').value = values;
	};

	// Calculate slider gradient color in realtime using current values of the thumbs
	const calculateColor = (values) => {
		let newStart = `rgba(${0+(255*((values[0]-800)/(3500-800)))},${255-(255*((values[0]-800)/(3500-800)))},0,1.0)`;
		let newEnd = `rgba(${0+(255*((values[1]-800)/(3500-800)))},${255-(255*((values[1]-800)/(3500-800)))},0,1.0)`;
		let slider = document.querySelector('.diffSlider');
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
				{ tagLabels.length > 0 && tagLabels.map((tag, index) => <option key={index} value={tag.name}>{tag.name}</option>)}
			</select>
			<button className='clearTags' onClick={() => { setTags(['all']); }}>Clear tags</button>
			<ul className='tags'>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag} </li>)}
			</ul>
			<h3>Difficulty</h3>
			{/* <MultiRangeSlider className='diffSlider' min='800' max='3500' minValue={diffMin} maxValue={diffMax} step={100} stepOnly={true} onChange={(event) => sliderChange(event.minValue, event.maxValue)} /> */}
			{/* <ReactRangeSlider min={800} max={3500} value={[diffMin, diffMax]} onInput={(event) => {}}/> */}
			
			<RangeSlider className='diffSlider' id="diffSlider" style='--gradient-start: rgba(0,0,255,1.0); --gradient-end: rgba(255,0,0,1.0);' min='800' max='3500' step='100' value={[diffMin, diffMax]} defaultValue={[diffMin, diffMax]} onInput={(event) => { sliderChange(event); }}/>
			{/* <RangeSliderElement className='diffSlider'></RangeSliderElement> */}
			<button className='clearRange' onClick={() => { sliderClear([800, 3500]); }}>Clear difficulty</button>
			<p>Range: {diffMin} - {diffMax}</p>
			<button className='resetParams' onClick={() => { setTags(['all']); sliderClear([800, 3500]); }}>Reset filters</button>
		</div>
	);
}
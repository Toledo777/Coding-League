import React, { useState, useEffect } from 'react';
import './filter.css';
import 'react-range-slider-input/dist/style.css';
// const RangeSlider = require('react-range-slider-input').default;
import { default as _RangeSlider } from 'react-range-slider-input';
import TagSelector from './tagSelector';
const RangeSlider = _RangeSlider.default;

export default function Filter({ filterChange }) {
	// Fetch all tags for tag multielect
	const [diffMin, setDiffMin] = useState(800);
	const [diffMax, setDiffMax] = useState(3500);
	const [tags, setTags] = useState([]);


	// Update range state, slider appearance and thumb positions when user moves either thumb (or resets state and appearance when clicking 'Clear difficulty' button)
	const setDiffRangeHelper = (min, max) => {
		setDiffMin(min);
		setDiffMax(max);
		calculateColor([min, max]);
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
	}, [tags, diffMax, diffMin]);

	return (
		<div className='filter-pane'>
			<TagSelector tagsChange={setTags} />
			<h3>Difficulty</h3>
			<p> {diffMin} - {diffMax}</p>
			<RangeSlider
				className='diffSlider'
				min='800'
				max='3500'
				step='100'
				value={[diffMin, diffMax]}
				defaultValue={[diffMin, diffMax]}
				onInput={range => { setDiffRangeHelper(...range); }} />
		</div>
	);
}
import React from 'react';
import { useState, useEffect } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
// import 'react-range-slider-input/dist/style.css';

export default function Filter({ tags, setTags, range, setRange }) {
	// var MultiRangeSlider = require('multi-range-slider-react');yarn add -D @types/react-slider
	const [minValue, setMinValue] = useState(800);
	const [maxValue, setMaxValue] = useState(3500);

	function setTagsHelper(event) {
		let choices = Array.from(event.target.selectedOptions).map(({ value }) => value);
		if (choices.length === 0){
			choices = ['all'];
		}
		setTags(choices);
	}

	function handleMinChange(min){
		if (min < 800){
			setMinValue(800);
		}
		else if (min > maxValue){
			setMinValue(maxValue);
		}
		else {
			setMinValue(min);
		}
	}

	function handleMaxChange(max){
		if (max > 3500){
			setMaxValue(3500);
		}
		else if (max < minValue){
			setMaxValue(minValue);
		}
		else {
			setMaxValue(max);
		}
	}

	useEffect (() => {
		setRange([minValue, maxValue]);
	}, [minValue, maxValue]);

	// function setRangeHelper(event) {
	// 	setRange(event.minValue, event.maxValue);
	// 	// updateFilter(tags, range);
	// }

	return (
		<div className='filter-pane'>
			<h2>Filters</h2>
			<h3>Tags</h3>
			<select multiple={true} onChange={(event) => setTagsHelper(event)}>
				<option value="math">math</option>
				<option value="probabilities">probabilities</option>
				<option value="data structures">data structures</option>
				<option value="geometry">geometry</option>
			</select>
			<ul className='tags' style={{'listStyle': 'none', 'textIndent': '-2em'}}>
				{tags.length > 0 && tags.map((tag, index) => <li key={index}>{tag} </li>)}
			</ul>
			<h3>Difficulty</h3>
			<div className='range-inputs'>
				<label htmlFor="min">Min:</label>
				<input type='number' min='800' max={maxValue} value={minValue} className='min' name="min" onInput={(event) => setMinValue(event.target.value)} onBlur={(event) => handleMinChange(event.target.value)}></input>
				<label htmlFor="max">Max:</label>
				<input type='number' min={minValue} max='3500' value={maxValue} className='max' name="max" onInput={(event) => setMaxValue(event.target.value)} onBlur={(event) => handleMaxChange(event.target.value)}></input>
			</div>
			<p>Range: {range[0]} - {range[1]}</p>
		</div>
	);
}
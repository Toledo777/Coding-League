import React from 'react';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState(['']);
	const [range, setRange] = useState([0, 3500]);

	function updateFilter(newTags, newRange){
		setTags(newTags);
		setRange(newRange);
	}
	
	return (
		<div>
			<h1>Search!</h1>
			<Filter setTags={setTags} setRange={setRange} />
			<h2>Search params:</h2>
			<p>Tags: {tags}</p>
			<p>Range: {range[0]} - {range[1]}</p>
		</div>
	);
}
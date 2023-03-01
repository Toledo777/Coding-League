import React from 'react';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState(['all']);
	const [range, setRange] = useState([800, 3500]);

	function updateFilter(newTags, newRange){
		setTags(newTags);
		setRange(newRange);
	}
	
	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter tags={tags} setTags={setTags} range={range} setRange={setRange} />
		</div>
	);
}
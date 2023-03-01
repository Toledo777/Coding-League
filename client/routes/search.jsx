import React from 'react';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState(['all']);
	const [range, setRange] = useState([800, 3500]);

	useEffect (() => {
		// pass parameters to SearchCaseAndHolder component here
	}, [search, tags, range]);
	
	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter tags={tags} setTags={setTags} range={range} setRange={setRange} />
			<SearchHolder></SearchHolder>
		</div>
	);
}
import React from 'react';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState(['all']);
	const [diffRange, setDiffRange] = useState([800, 3500]);

	useEffect (() => {
		// pass parameters to SearchCaseAndHolder component here
	}, [search, tags, diffRange]);
	
	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter tags={tags} setTags={setTags} diffRange={diffRange} setDiffRange={setDiffRange} />
			<SearchHolder></SearchHolder>
			<SearchHolder count={3} start={0} title={''} tag={[]} ></SearchHolder>
		</div>
	);
}
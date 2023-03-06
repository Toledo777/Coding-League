import React from 'react';
import Filter from '../components/filter/filter';
import { useState } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);

	const filterChange = (newTags, newDiffRange) => {
		setTags(newTags);
		setDiffRange(newDiffRange);
	};
	
	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter
				key='filters'
				filterChange={filterChange} />
			<SearchHolder></SearchHolder>
			<SearchHolder count={3} start={0} title={''} tag={[]} ></SearchHolder>
		</div>
	);
}
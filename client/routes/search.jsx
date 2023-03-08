import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [title, setTitle] = useState('');

	//a log for the linter so diffRance doesn't go unused
	console.log(diffRange);

	const filterChange = (newTags, newDiffRange) => {
		setTags(newTags);
		setDiffRange(newDiffRange);
	};

	function titleChange(input) {
		setTitle(input);
	}

	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter
				key='filters'
				filterChange={filterChange} />
			<SearchHolder count={3} start={0} title={title} tag={tags} ></SearchHolder>
			<SearchBar titleChange={input => titleChange(input)}> </SearchBar>
		</div>
	);
}

import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';
import SearchHolder from '../components/searchHolder';
import useFetch from '../hooks/useFetch';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [title, setTitle] = useState('2');

	let [error, loading, data] = useFetch('/api/searchProblems?search=' + title, [], [title]);


	//a log for the linter so diffRange doesn't go unused
	console.log(diffRange);
	console.log(tags);


	tags.map(t => {
		if (data.tags.includes(t)) {
			console.log('has tag');
		}
	});


	const filterChange = (newTags, newDiffRange) => {
		setTags(newTags);
		setDiffRange(newDiffRange);
		console.log('inside filter change');
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
			<SearchHolder error={error} loading={loading} data={data} ></SearchHolder>
			<SearchBar titleChange={input => titleChange(input)}> </SearchBar>
		</div>
	);
}

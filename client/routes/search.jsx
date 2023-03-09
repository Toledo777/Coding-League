import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState } from 'react';
import SearchHolder from '../components/searchHolder';
import useFetch from '../hooks/useFetch';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [title, setTitle] = useState('');

	let [error, loading, data] = useFetch('/api/searchProblems?search=' + title, [], [title]);


	//a log for the linter so diffRange doesn't go unused
	console.log(diffRange);


	let newData = [];
	if (data.error === undefined){
		newData = data.filter(problem => {
			let valid = true;
			tags.forEach(t => {
				if (!problem.tags.includes(t)){
					valid = false;
				}
			});
			if (valid){
				return problem;
			}
		});
	}

	const filterChange = (newTags, newDiffRange) => {
		setTags(newTags);
		setDiffRange(newDiffRange);
		console.log('inside filter change');
	};

	function doSearch(input) {
		setTitle(input);
	}

	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter
				key='filters'
				filterChange={filterChange} />
			<SearchBar doSearch={input => doSearch(input)}> </SearchBar>
			<SearchHolder error={error} loading={loading} data={newData} ></SearchHolder>
		</div>
	);
}

import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState, useEffect } from 'react';
import SearchHolder from '../components/searchHolder';
import useFetch from '../hooks/useFetch';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [title, setTitle] = useState('');

	let [error, loading, data] = useFetch('/api/searchProblems?search=' + title, [], [title]);


	//a log for the linter so diffRange doesn't go unused
	console.log(diffRange);


	let newData = data;
	if (tags.length > 0 && data.error === undefined) {
		newData = [];
		tags.map(t => {
			console.log('tag = ' + t);
			data.map((d) => {
				console.log(d.tags);
				if (d.tags.includes(t)) {
					newData.push(d);
				}
			});
		});
	}



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
			<SearchBar titleChange={input => titleChange(input)}> </SearchBar>
			<SearchHolder error={error} loading={loading} data={newData} ></SearchHolder>
		</div>
	);
}

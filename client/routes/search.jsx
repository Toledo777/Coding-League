import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState, useMemo } from 'react';
import SearchHolder from '../components/searchHolder';
import useFetch from '../hooks/useFetch';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [title, setTitle] = useState('');

	let [error, loading, data] = useFetch(`/api/searchProblems?search=${title}&limit=100`, [], [title]);

	const filteredProblems = useMemo(() => {
		return data.filter(problem => {
			return tags.every(t => problem.tags.includes(t));
		}).filter((d) => {
			let diff = parseInt(d.tags[d.tags.length - 1].slice(1));
			return diff <= diffRange[1] && diff >= diffRange[0];
		});
	}, [data, tags]);

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
			<SearchBar doSearch={setTitle}> </SearchBar>
			<SearchHolder error={error} loading={loading} data={filteredProblems} ></SearchHolder>
		</div>
	);
}

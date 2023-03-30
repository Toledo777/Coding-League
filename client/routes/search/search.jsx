import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filter from '../../components/filter/filter';
import { useState, useMemo } from 'react';
import SearchResult from '../../components/SearchResult/searchResult';
import './search.css';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [data, setData] = useState([]);

	const fetchData = (async (title) => {
		if (title !== '') {
			const data = await fetch(`/api/searchProblems?search=${title}&limit=100`);
			setData(await data.json());
		} else {
			setData([]);
		}
	});

	const filteredProblems = useMemo(() => {
		return data.filter(problem => {
			return tags.every(t => problem.tags.includes(t));
		}).filter((d) => {
			let diff = parseInt(d.tags[d.tags.length - 1]?.slice(1));
			return diff <= diffRange[1] && diff >= diffRange[0];
		});
	}, [data, tags, diffRange]);

	const filterChange = (newTags, newDiffRange) => {
		setTags(newTags);
		setDiffRange(newDiffRange);
	};

	return (
		<div className='search'>
			<div className='options panel'>
				<SearchBar doSearch={fetchData} />
				<div>{data.length} results found</div>
				<Filter filterChange={filterChange} />
			</div>
			<div className='results panel'>
				<div className='problems'>
					{filteredProblems.map(
						problem => <SearchResult key={problem._id} problem={problem} />
					)}
				</div>
			</div>
		</div>
	);
}

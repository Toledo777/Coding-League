import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/filter/filter';
import { useState, useMemo } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [tags, setTags] = useState([]);
	const [diffRange, setDiffRange] = useState([800, 3500]);
	const [data, setData] = useState(['default']);
	
	const fetchData = (async (title) => {
		if (title !== ''){
			const data = await fetch(`/api/searchProblems?search=${title}&limit=100`);
			setData(await data.json());
		} else {
			setData([]);
		}
	});

	const filteredProblems = useMemo(() => {
		if (data[0] !== 'default'){
			return data.filter(problem => {
				return tags.every(t => problem.tags.includes(t));
			}).filter((d) => {
				let diff = parseInt(d.tags[d.tags.length - 1].slice(1));
				return diff <= diffRange[1] && diff >= diffRange[0];
			});
		}
	}, [data, tags, diffRange]);

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
			<SearchBar doSearch={fetchData}> </SearchBar>
			{data[0] === 'default'
				? <p className='resultCount'>Type in the search bar to search for problems!</p>
				: (
					<>
						<p className='resultCount'>{data.length} problems found</p>
						<SearchHolder data={filteredProblems}></SearchHolder>
					</>
				)
			}
		</div>
	);
}

import React from 'react';
import Filter from '../components/filter/filter';
import { useState } from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	const [diffMin, setDiffMin] = useState(800);
	const [diffMax, setDiffMax] = useState(3500);
	
	return (
		<div>
			<h1>Search!</h1>
			<h2>Search params:</h2>
			<Filter
				key='filters'
				tags={tags}
				setTags={setTags}
				diffMin={diffMin}
				diffMax={diffMax}
				setDiffMin={setDiffMin}
				setDiffMax={setDiffMax} />
			<SearchHolder></SearchHolder>
			<SearchHolder count={3} start={0} title={''} tag={[]} ></SearchHolder>
		</div>
	);
}
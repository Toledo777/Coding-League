import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';

export default function SearchHolder({ range }) {

	let count = 0;
	let [error, loading, data] = useFetch('/api/problem/list?range=' + range + '&count=' + count, []);



	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			{data.map(d => <div key={d._id}> <SearchCase title={d.title} type={d.tags}></SearchCase> </div>)}

		</div>
	);
}
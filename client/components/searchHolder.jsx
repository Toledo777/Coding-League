import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';

export default function SearchHolder({ range }) {

	let [error, loading, data] = useFetch('/api/problem/random?range=' + range, []);

	console.log(data);

	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			{data.map(d => <div key={d._id}> <SearchCase title={d.title} type={d.tags}></SearchCase> </div>)}
			<div>
				<h3>
					pagination implmentation
				</h3>
			</div>
		</div>
	);
}
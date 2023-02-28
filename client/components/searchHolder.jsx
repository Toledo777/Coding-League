import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';

export default function SearchHolder() {

	let [error, loading, data] = useFetch('/api/problem/random?range=' + '5', []);

	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			{data.map(d => <div key={d.id}> <SearchCase title={d.title} difficulty={d.difficulty} type={d.tags}></SearchCase> </div>)}
			<div>
				<h3>
					pagination implmentation
				</h3>
			</div>
		</div>
	);
}
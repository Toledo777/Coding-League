import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';

export default function SearchHolder() {

	let [error, loading, data] = useFetch('/api/problem/id?id=' + '1234E', []);




	data = [{
		id: 1,
		title: 'hello',
		difficulty: 'super hard',
		tags: 'these are the tags'
	},
	{
		id: 2,
		title: 'hello2',
		difficulty: 'not very hard',
		tags: 'even more tags'
	}];

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
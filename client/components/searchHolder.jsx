import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';


//count = how many problems to fetch
//start = page to start on
//title = search param
//tag = also search param
export default function SearchHolder({ count, start, title, tag }) {



	let [error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);

	//these logs are here for the linter, it was suggested to add title and tag as params for now because they will be used in filtering and searching
	console.log(title);
	console.log(tag);


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
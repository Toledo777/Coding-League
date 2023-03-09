import React from 'react';
import SearchResult from './SearchResult/searchResult';


//error, loading, data = problem data from fetch passed in to SearchHolder
export default function SearchHolder({ error, loading, data }) {
	//TODO: implement a list type of "default" problems to show the user on the search page
	// 	[error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);

	//for the linter
	console.log(error);


	return (
		<div>
			<h3>
				{data.error && data.error}
				{loading && 'loading...'}
			</h3>
			{data.error === undefined && data.map(d => <div key={d._id}> <SearchResult title={d.title} type={d.tags} id={d._id}></SearchResult> </div>)}
		</div>
	);
}
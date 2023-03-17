import React from 'react';
import SearchResult from './SearchResult/searchResult';


//error, loading, data = problem data from fetch passed in to SearchHolder
export default function SearchHolder({ data }) {
	//TODO: implement a list type of "default" problems to show the user on the search page
	// 	[error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);

	return (
		<div>
			{/* <h3>
				{error && error.error}
				{loading && 'loading...'}
			</h3> */}
			{data.map(d => <div key={d._id}> <SearchResult title={d.title} type={d.tags} id={d._id}></SearchResult> </div>)}
		</div>
	);
}
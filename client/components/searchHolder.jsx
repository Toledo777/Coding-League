import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';


//count = how many problems to fetch
//start = page to start on
//title = search param
//tag = also search param
export default function SearchHolder({ count, start, title, tags, id }) {



	let [error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);

	//if there is an id sent to the holder, it will only show the problem associated with that id
	if (id) {
		[error, loading, data] = useFetch('/api/problem/id/?id=' + id, []);

	}
	//if there is a title sent to the holder, it will only show the problem associated with that title
	else if (title) {
		[error, loading, data] = useFetch('/api/problem/title/?title=' + title, []);
	}

	//this log is here for the linter, it was suggested to add tag as a param for now because it will be used in filtering and searching
	console.log(tags);


	//since we are mapping the data, if it returns as one object (in the case of id or title) we have to put it into an array
	if (!Array.isArray(data)) {
		data = [data];
	}

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
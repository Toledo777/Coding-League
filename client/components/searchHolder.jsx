import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';


//count = how many problems to fetch
//start = page to start on
//title = search param
//tags = also search param
export default function SearchHolder({ count, start, title, tags }) {

	if (title == '') {
		title = 'E. Necklace Assembly';
	}
	let [error, loading, data] = useFetch('/api/problem/title/?title=' + title, [], [title]);

	if (!Array.isArray(data)) {
		data = [data];
	}

	console.log(count);
	console.log(start);

	//if there is a title sent to the holder, it will only show the problem associated with that title



	//TODO: implement a list type of "default" problems to show the user on the search page
	// {
	// 	[error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);
	// 	console.log('inside else');
	// }

	//this log is here for the linter, it was suggested to add tag as a param for now because it will be used in filtering and searching
	console.log(tags);



	return (
		<div>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			{data.map(d => <div key={d._id}> <SearchCase title={d.title} type={d.tags} id={d._id}></SearchCase> </div>)}
		</div>
	);
}
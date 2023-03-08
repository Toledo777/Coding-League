import React from 'react';
import SearchCase from './SearchCase/searchCase';
import useFetch from '../hooks/useFetch';


//count = how many problems to fetch
//start = page to start on
//title = search param
//tags = also search param
export default function SearchHolder({ count, start, title, tags }) {

	if (title == '') {
		title = 'A. Two distinct points';
	}
	let [error, loading, data] = useFetch('/api/searchProblems?search=' + title, [], [title]);


	console.log(data);
	if (!Array.isArray(data)) {
		data = [data];
	}

	//for the linter
	console.log(count);
	console.log(start);
	console.log(tags);

	//TODO: implement a list type of "default" problems to show the user on the search page
	// {
	// 	[error, loading, data] = useFetch('/api/problem/list?start=' + start + '&count=' + count, []);
	// 	console.log('inside else');
	// }


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
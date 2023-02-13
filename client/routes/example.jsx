import React from 'react';
import useFetch from '../hooks/useFetch';

export default function Example() {
	const [error, loading, data, ] = useFetch('https://jsonplaceholder.typicode.com/todos');

	return <div>
		<h1>This is an example of how to use the useFetch hook</h1>
		<div className='status'>
			<div>Loading: {`${loading}`}</div>
			<div>Error: {`${error}`}</div>
		</div>
		<div>{JSON.stringify(data)}</div>
	</div>;
}
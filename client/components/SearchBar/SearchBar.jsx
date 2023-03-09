import React, { useState } from 'react';

export default function SearchBar({ doSearch }) {

	let [text, setText] = useState('');

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<label htmlFor='searchForm'>
				Search:
			</label>
			<div className='searchForm'>
				<input type='text' onChange={handleTextChange} />
				<button onClick={() => doSearch(text)}>Submit</button>
			</div>
		</div>
	);
}
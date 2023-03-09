import React, { useState } from 'react';

export default function SearchBar({ doSearch }) {

	let [text, setText] = useState('');

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<label>
				Search:
				<input type='text' onChange={handleTextChange} />
				<button onClick={() => doSearch(text)}>Submit</button>
			</label>
		</div>
	);
}
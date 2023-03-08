import React, { useState } from 'react';

export default function SearchBar({ titleChange }) {

	let [text, setText] = useState('');

	const texter = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<label>
				Search:
				<input type='text' onChange={texter} />
				<button onClick={() => titleChange(text)}>Submit</button>
			</label>
		</div>
	);
}
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import './searchBar.css';

export default function SearchBar({ doSearch }) {

	let [text, setText] = useState('');

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	const submit = (e) => {
		e.preventDefault();
		doSearch(text);
	};

	return (
		<form className='search_bar panel' onSubmit={submit}>
			<input type='text' onChange={handleTextChange} />
			<button disabled={!text.length} className='btn confirm'><IconSearch /></button>
		</form >
	);
}
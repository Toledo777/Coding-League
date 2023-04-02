import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import './searchBar.css';

export default function SearchBar({ doSearch }) {
	const submit = (e) => {
		e.preventDefault();
		doSearch(e.target.search_input.value);
	};

	return (
		<form className='search_bar panel' onSubmit={submit}>
			<input name='search_input' type='text' />
			<button className='btn confirm'><IconSearch /></button>
		</form >
	);
}
import React from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	return (
		<div>
			<h1>Search!</h1>
			<SearchHolder range={3}></SearchHolder>
		</div>
	);
}
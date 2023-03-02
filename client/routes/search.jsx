import React from 'react';
import SearchHolder from '../components/searchHolder';

export default function Search() {
	return (
		<div>
			<h1>Search!</h1>
			<SearchHolder count={3} start={0} title={''} tag={[]} ></SearchHolder>
		</div>
	);
}
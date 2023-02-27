import React from 'react';
import SearchCase from './searchCase';

export default function SearchHolder() {
	return (
		<div>
			<SearchCase></SearchCase>
			<SearchCase></SearchCase>
			<SearchCase></SearchCase>
			<SearchCase></SearchCase>
			<div>
				<h3>
					pagination implmentation
				</h3>
			</div>
		</div>
	);
}
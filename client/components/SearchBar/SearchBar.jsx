import React from 'react';

export default function SearchBar(title) {

	function searcher() {
		console.log(title);


	}

	return (
		<div>
			<form>
				<label>
					Search:
					<input type='text' onSubmit={searcher} />
				</label>
			</form>
		</div>
	);
}
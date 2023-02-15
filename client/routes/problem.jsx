import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Problem(props) {

	let [problem, setProblem] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch('/api/one-problem?range=' + props.range);
			if (res.ok) {
				let response = await res.json();
				setProblem(response.text);
			}
		})();
	}, []);

	return (
		<div>
			<h3>
				{problem}
			</h3>
		</div>
	);
}
Problem.propTypes = {
	range: PropTypes.string.isRequired
};
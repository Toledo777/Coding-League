import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import Editor from './editor';

export default function Problem(props) {

	let specification;
	//stratgy pattern, depending on prop specification, api url will change
	for (let key in props) {
		specification = `${key}?${key}=${props[key]}`;
	}
	//preliminary difficulty implementation
	let extra = '&difficulty=10';
	let [error, loading, data] = useFetch('api/problem/' + specification + extra, 1, []);

	return (
		<div className='problem'>
			<h3>
				{error && error}
				{loading && 'loading...'}
			</h3>
			<h3 className='header'>
				<div dangerouslySetInnerHTML={{ __html: data.id }} />
				<div dangerouslySetInnerHTML={{ __html: data.title }} />
			</h3>
			<div className='problem-content'>
				<div className='description'>
					<div dangerouslySetInnerHTML={{ __html: data.description }} />
					<div dangerouslySetInnerHTML={{ __html: data.input_specification }} />
					<div dangerouslySetInnerHTML={{ __html: data.output_specification }} />
					<div dangerouslySetInnerHTML={{ __html: data.memory_limit }} />
					<div dangerouslySetInnerHTML={{ __html: data.time_limit }} />
					<div dangerouslySetInnerHTML={{ __html: data.note }} />
				</div>
				<Editor/>
			</div>
		</div>
	);
}
Problem.propTypes = {
	random: PropTypes.string
};
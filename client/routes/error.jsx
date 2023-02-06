import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function Error() {
	const {status, error: {message} } = useRouteError();
	return <div className='error-page'>
		<h1>{status}</h1>
		<div>{message}</div>
	</div>;
}

import { useState } from 'react';

export default function usePost(url, defaultValue = null) {
	// This allows for dynamic updating deps

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(defaultValue);

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	const send = (body) => {
		setData(defaultValue);
		setLoading(true);
		setError(null);
		fetch(url, { headers, method: 'POST', body: JSON.stringify(body) })
			.then(res => res.json())
			.then(data => setData(data))
			.finally(() => setLoading(false))
			.catch(e => setError(e.toString()));
	};

	return [error, loading, data, send];
}
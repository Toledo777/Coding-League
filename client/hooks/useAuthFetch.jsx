import { useEffect, useState } from 'react';

export default function useAuthFetch(url, body, defaultValue, deps = []) {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(defaultValue);

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	useEffect(() => {
		setLoading(true);
		fetch(url, { headers, method: 'GET', body: JSON.stringify(body) })
			.then(res => res.json())
			.then(data => setData(data))
			.finally(() => setLoading(false))
			.catch(e => setError(e.toString()));
	}, deps);
	return [error, loading, data];
}
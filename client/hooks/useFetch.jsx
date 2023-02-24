import { useEffect, useState } from 'react';

export default function useFetch(url, defaultValue, deps = []) {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(defaultValue);
	const headers = { 'Accept': 'application/json' };

	useEffect(() => {
		setLoading(true);
		fetch(url, { headers })
			.then(res => res.json())
			.then(data => setData(data))
			.finally(() => setLoading(false))
			.catch(e => setError(e.toString()));
	}, deps);
	return [error, loading, data];
}
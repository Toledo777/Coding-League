import { useEffect, useState } from 'react';

export default function useFetch(url, defaultValue , deps = []) {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(defaultValue);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then(res => res.json())
			.then(data => setData(data))
			.finally(() => setLoading(false))
			.catch(e => setError(e.toString()));
	}, deps);

	return [ error, loading, data ];
}
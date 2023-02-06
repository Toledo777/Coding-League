import { useEffect, useState } from 'react';

export default function useFetch(url, defaultValue , deps = []) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(defaultValue);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then(res => res.json())
			.then(data => setData(data))
			.finally(() => setLoading(false))
			.catch(e => setError(e.toString()));
	}, deps);

	return [ loading, data, error ];
}
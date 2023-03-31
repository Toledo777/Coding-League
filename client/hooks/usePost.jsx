import { useState } from 'react';

export default function usePost(url, defaultValue = null) {

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(defaultValue);

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	const send = async (body) => {
		setData(defaultValue);
		setLoading(true);
		setError(null);

		let res = await fetch(url, { headers, method: 'POST', body: JSON.stringify(body) });

		if (res.ok){
			setData(await res.json());
		} else {
			setError({ message: res.statusText, status: res.status });
		}
		
		setLoading(false);
	};

	return [error, loading, data, send];
}
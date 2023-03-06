import { useEffect, useState } from 'react';

export default function useCredentials() {
	const [credentials, setCredentials] = useState(null);
	const headers = { 'Accept': 'application/json' };
	
	useEffect(() => {
		fetch('/auth/credentials', { headers })
			.then(res => res.json())
			.then(creds => !creds.error && setCredentials(creds))
			.catch(e => console.error(e));
	}, []);

	return [credentials, setCredentials];
}
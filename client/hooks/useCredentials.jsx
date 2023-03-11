import { useEffect, useState } from 'react';

export default function useCredentials() {
	const [credentials, setCredentials] = useState(null);
	const headers = { 'Accept': 'application/json' };
	
	// Attempts to fetch session credentials, used to then retrieve user data from DB
	const fetchCreds = async () => {
		try {
			const res = await fetch('/auth/credentials', { headers });
			const creds = await res.json();
			!creds.error ? setCredentials(creds): setCredentials(null);
		} catch(e){
			console.error(e);
		}
	};

	// Add listener so that fetchCreds could be triggered
	window.addEventListener('login', fetchCreds);

	useEffect(()=>{
		fetchCreds();
		return () =>{
			window.removeEventListener('login', fetchCreds);
		};
	}, []);
	

	return credentials;
}
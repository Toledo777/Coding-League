import { useEffect, useState } from 'react';
export default function useCredentials() {
	const [credentials, setCredentials] = useState(null);
	const headers = { 'Accept': 'application/json' };
	
	const fetchCreds = async () => {
		try {
			const res = await fetch('/auth/credentials', { headers });
			const creds = await res.json();
			!creds.error ? setCredentials(creds): setCredentials(null);
		} catch(e){
			console.error(e);
		}
	};
	window.addEventListener('login', fetchCreds);

	useEffect(()=>{
		fetchCreds();
		return () =>{
			window.removeEventListener('login', fetchCreds);
		};
	}, []);
	

	return credentials;
}
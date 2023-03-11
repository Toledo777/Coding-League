import { useEffect, useState, useCallback } from 'react';

export default function useCredentials() {
	const [credentials, setCredentials] = useState(null);
	const headers = { 'Accept': 'application/json' };
	
	// Attempts to fetch session credentials, used to then retrieve user data from DB
	const fetchCreds = useCallback(async () => {
		try {
			const res = await fetch('/auth/credentials', { headers });
			const user = await res.json();
			!user.notloggedIn ? setCredentials(user): setCredentials(null);
		} catch(e){
			console.error(e);
		}
	});



	useEffect(()=>{
		fetchCreds();	
		// Add listener so that fetchCreds could be triggered
		window.addEventListener('login', fetchCreds, true);
		return () =>{
			window.removeEventListener('login', fetchCreds, true);
		};
	}, []);
	

	return credentials;
}
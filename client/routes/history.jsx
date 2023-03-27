import React, { useEffect, useState } from 'react';
import HistoryResult from '../components/HistoryResult/historyResult';
import useCredentials from '../hooks/useCredentials';
export default function History() {
	const user = useCredentials();

	const[data , setData] = useState();
	// messages to help user
	const[message, setMessage] = useState();
	// error messages, unexpected behavior
	const[error, setError] = useState();
   
	// fetch problem history
	useEffect( () => {
		setupHistory();
		// setupMessages();
	}, [user]);

	const setupHistory = async () => {
		if (user.email) {
			try {
				const response = await fetch(`/api/user/answers?email=${user.email}`);
				if (response.ok) {
					const jsonData = await response.json();
					setData(jsonData);
				}
				else {
					setError('Error fetching problem history');
				}
			}
    
			catch(e) {
				console.error(e.toString());
			}
		}

		else {
			setMessage('Please login to view problem history');
		}
	};

	const setupMessages = () => {
		if (!user) {
			setMessage('Please login to view problem history');
		}

		else if (!data) {
			setMessage('No problem history. Time to start coding :)');
		}
	};
	return(
		<>
			<h1>Problem History</h1>
			{data && <ul> {data.map( (problem, index) => <li key={index}><HistoryResult passed={problem.pass_test} submission={problem.submission} id={problem.problem_id} /></li>)}</ul>}
			{!error && <h3>{message}</h3>}
			{error && <h3>{error}</h3>}
		</>
	);
}
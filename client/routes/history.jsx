import React, { useEffect, useState } from 'react';
import HistoryResult from '../components/HistoryResult/historyResult';
import useCredentials from '../hooks/useCredentials';

// page to display all attempts and answers of a user
export default function History() {
	const user = useCredentials();

	// array of problems
	const [data, setData] = useState();
	// messages to help user
	const [message, setMessage] = useState();
	// error messages, unexpected behavior
	const [error, setError] = useState();

	// fetch problem history
	useEffect(() => {
		setupHistory();
	}, [user]);

	const setupHistory = async () => {
		if (user) {
			try {
				const response = await fetch(`/api/user/answers?email=${user.email}`);
				if (response.ok) {
					const jsonData = await response.json();

					// check for data
					console.log(jsonData);
					if (jsonData.length != 0) {
						setMessage('');
						setData(jsonData);
					}
                    
					// fetch succeded but there are no problems in history
					else {
						setMessage('No problem history. Time to start coding :)');
					}
				}

				// error while fetching
				else {
					setError('Error fetching problem history');
				}
			}

			// error getting response
			catch (e) {
				console.error(e.toString());
				setError(error);
			}
		}

		else {
			setMessage('Please login to view problem history');
		}
	};

	return (
		<>
			<h1>Problem History</h1>
			{data && <ul> {data.map((problem, index) => <li key={index}><HistoryResult passed={problem.pass_test} submission={problem.submission} id={problem.problem_id} /></li>)}</ul>}
			{!error && <h3>{message}</h3>}
			{error && <h3>{error}</h3>}
		</>
	);
}
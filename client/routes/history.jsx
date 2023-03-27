import React, { useEffect, useState } from 'react';
import HistoryResult from '../components/HistoryResult/historyResult';
import useCredentials from '../hooks/useCredentials';
export default function History() {
    const user = useCredentials();

    const[data , setData] = useState();
    const[error, setError] = useState();
   
    useEffect(() => {
        fetchProblems();
    }, [user]);

    //console.log(user.email)

    const fetchProblems = async () => {
        try {
            const response = await fetch(`/api/user/answers?email=${user.email}`);
            if (response.ok) {
                const jsonData = await response.json()
                setData(jsonData)
            }

            else {
                setError("Error fetching problem history");
            }
        }

        catch(e) {
            setError(e.toString());
        }
        

    }

    console.log(data)

    // temporarily hardcode problem while api for problems is not done
    // let problemHistory = [{title: "test", type: "type test", id: "test id"}];
    // {problemHistory && <ul> {problemHistory.map( problem => <li key={problem.id}><SearchResult title={problem.title} type={problem.type} id={problem.id} /></li>)}</ul>}
    return(
        <>
            <h1>Problem History</h1>
            {data && <ul> {data.map( (problem, index) => <li key={index}><HistoryResult passed={problem.pass_test} submission={problem.submission} id={problem.problem_id} /></li>)}</ul>}
        </>
    )
}
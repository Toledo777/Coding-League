import React from 'react';
import SearchResult from '../components/SearchResult/searchResult';
export default function History() {

    // temporarily hardcode problem while api for problems is not done
    let problemHistory = [{title: "test", type: "type test", id: "test id"}];

    

    return(
        <>
            <h1>Problem History</h1>
            {problemHistory.map( problem => <div key={problem.id}><SearchResult title={problem.title} type={problem.type} id={problem.id} /></div>)}
        </>
    )
}
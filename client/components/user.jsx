import React from 'react';
import useFetch from '../hooks/useFetch';


// component to display user data, take user as input
export default function user({user}) {

    return(
        <div>
           <h2>Cooluser123 {user.username}</h2>
           <img src={user.avatar} alt="profile avatar"/>
           <p>Wins: {user.wins}</p>
           <p>Losses: {user.losses}</p>
           <p>Rank {user.rank}</p>
        </div>
    )
}
import React from 'react';

// component to display user data, take user as input
export default function User({user}) {

    return(
        <>
            <div>
                <h2>{user.username}</h2>
                <img src={user.avatar} alt="profile avatar"/>
                <p id="bio"></p>
                <p>Wins: {user.wins}</p>
                <p>Losses: {user.losses}</p>
                <p>Rank: {user.rank}</p>
            </div>
            <div id="previous answers">
                <h2>Previous Answers</h2>
                <p>console.log("hello world")</p>
            </div>
        </>
    )
}
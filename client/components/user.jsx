import React from 'react';

// component to display user data, take user as input
export default function User({user}) {


	// TODO hide the email field a user is visiting someone elses profile
	return(
		<>
			<div>
				<h2>{user.username}</h2>
				<img src={user.avatar} alt="profile avatar"/>
				<p>Email: {user.email}</p>
				<p>Bio: {user.bio}</p>
				<p>Wins: {user.wins}</p>
				<p>Losses: {user.losses}</p>
				<p>Rank: {user.rank}</p>
			</div>
			<div id="previous answers">
				<h2>Previous Answers (this section is currently hardcoded until answers are stored in db)</h2>
				<p>console.log("hello world")</p>
			</div>
		</>
	);
}
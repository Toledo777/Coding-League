import React, { useState } from 'react';
import useCredentials from '../hooks/useCredentials';
import {determineRank } from '../utils/profileSetup.mjs';
export default function Setup() {
	const [nickname, setNickname] = useState('');
	const [skillLevel, setSkillLevel] = useState('-------');
	const [bio, setBio] = useState('');
	//TODO: change useCredentials to not need setUser
	const [user, setUser] = useCredentials();

	async function submitProfile(e) {
		e.preventDefault();
		console.log('beginning: ' + user);
		if (user) {
			if (skillLevel !== '-------') {
				//TODO: check if username is unique
				const username = nickname.trim() ? nickname : user.name;
				try{
					const rank = determineRank(skillLevel);
					console.log(user.email, username, user.picture, rank);
					// await fetch('api/user/create', {
					// 	method: 'POST',
					// 	body: JSON.stringify({
					// 		email: user.email,
					// 		username: username,
					// 		avatar_uri: user.picture,
					// 		rank: rank
					// 	}),
					// 	headers: {
					// 		'Content-Type': 'application/json'
					// 	}
					// });
				} catch (e) {
					console.error(e);
				}
			}
		}
	}

	return (
		<div>
			<form id='profile-setup-form'>
				<label htmlFor='nickname'>Nickname: </label>
				<input id='nickname' type='text' onChange={(e) => setNickname(e.target.value.trim())} />
				<label htmlFor='skill-level'>Skill Level</label>
				<select id='skill-level' onChange={(e) => setSkillLevel(e.target.value.trim())}>
					<option className='blank'>-------</option>
					<option className='beginner'>Beginner</option>
					<option className='intermediate'>Intermediate</option>
					<option className='expert'>Expert</option>
				</select>
				<label>Bio</label>
				<textarea id='bio' rows="4" cols="50" onChange={(e) => setBio(e.target.value.trim())}></textarea>
				<input id='submit' onClick={(e) => submitProfile(e)} type='submit' />
			</form>
		</div>
	);
}
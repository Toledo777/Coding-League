import React, { useState } from 'react';
import useCredentials from '../hooks/useCredentials';
import { determineRank } from '../utils/profileSetup.mjs';
export default function Setup() {
	const [nickname, setNickname] = useState('');
	const [skillLevel, setSkillLevel] = useState('-------');
	const [bio, setBio] = useState('');
	const [error, setError] = useState('');
	const user = useCredentials();
	//TODO: bind labels to radio button
	async function submitProfile(e) {
		e.preventDefault();
		
		if (user) {
			if (skillLevel !== '-------') {
				//TODO: check if username is unique via database
				const username = nickname.trim() ? nickname : user.name;
				try {
					const rank = determineRank(skillLevel);
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
					setError('Error creating your account');
				}
			} else {
				setError('Please select skill level');
			}
		} else {
			setError('You are not signed in');
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
			<p>{error}</p>
		</div>
	);
}
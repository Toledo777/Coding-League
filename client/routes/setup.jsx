import React, { useState } from 'react';
import useCredentials from '../hooks/useCredentials';
import { determineRank } from '../utils/authentication.mjs';
import { useNavigate } from 'react-router-dom';

export default function Setup() {
	const [username, setNickname] = useState('');
	const [skillLevel, setSkillLevel] = useState('-------');
	const [bio, setBio] = useState('');
	const [message, setMessage] = useState('');
	const user = useCredentials();
	const navigate = useNavigate();
	const USERNAME_LIMIT = 100;

	//TODO: bind labels to radio button
	async function submitProfile(e) {
		e.preventDefault();

		// Series of guard clauses

		// Exit if useCredentials outputs null, meaning that user is not signed in
		if (!user) {
			setMessage('You are not signed in');
			return;
		}

		// Exit if the selection is blank
		if (skillLevel === '-------') {
			setMessage('Please select skill level');
			return;
		}

		// Exit if username given is blank or exceeds character limit
		if (username.length === 0 && username.length > USERNAME_LIMIT) {
			setMessage('Invalid username size');
			return;
		}

		// Depending on skill level, return associated starting rank number
		const rank = determineRank(skillLevel);

		// Post the user into DB, post message depending on operation success
		await postUser(rank);
	}

	async function postUser(rank) {
		const res = await fetch('/api/user/create', {
			method: 'POST',
			body: JSON.stringify({
				email: user.email,
				username: username,
				avatar_uri: user.picture,
				exp: 0,
				bio: bio
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const msg = await res.json();
		setMessage(msg.title);
		if (res.ok) {
			navigate('/');
		}
	}

	return (
		<div>
			<form id='profile-setup-form'>
				<label htmlFor='nickname'>Nickname </label>
				<input id='nickname' type='text' onChange={(e) => setNickname(e.target.value.trim())} />
				<label htmlFor='skill-level'>Skill Level </label>
				<select id='skill-level' onChange={(e) => setSkillLevel(e.target.value.trim())}>
					<option className='blank'>-------</option>
					<option className='beginner'>Beginner</option>
					<option className='intermediate'>Intermediate</option>
					<option className='expert'>Expert</option>
				</select>
				<label>Bio *Optional </label>
				<textarea id='bio' rows="4" cols="50" onChange={(e) => setBio(e.target.value.trim())}></textarea>
				<input id='submit' onClick={(e) => submitProfile(e)} type='submit' />
			</form>
			<p>{message}</p>
		</div>
	);
}
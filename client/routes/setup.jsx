import React from 'react';

export default function Setup() {

	async function submitProfile() {
		await fetch('api/user/create', {
			method: 'POST',
			body: JSON.stringify({
				token: googleData.credential
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return (
		<div>
			<form className='profile-setup-form'>
				<label>Nickname: </label>
				<input className='nickname' type='text' />
				<label>Skill Level</label>
				<select className='skill-level'>
					<option className='beginner'>Beginner</option>
					<option className='intermediate'>Intermediate</option>
					<option className='expert'>Expert</option>
				</select>
				<label>Bio</label>
				<textarea id='bio' rows="4" cols="50"></textarea>
				<input id='submit' onClick={submitProfile} type='submit' />
			</form>
		</div>
	);
}
import React from 'react';
import { useState, useEffect } from 'react';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {
	const [error, setError] = useState(false);

	// if the user ever gets changed, update the form and the updatedUser
	// user props is the source of truth
	useEffect(() => {
		// setUpdatedUser(user);
		setFormData(user);
	}, [user]);

	const [formData, setFormData] = useState(user);

	async function handleSubmit(e) {
		e.preventDefault();
		await submitUser(formData);
	}

	// sends put request and updates user
	async function submitUser(updatedUser) {
		const headers = {
			'Content-Type': 'application/json'
		};
		const url = '/api/user/update';

		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers,
				body: JSON.stringify(updatedUser),
			});

			// display an error message to user if api response is not ok
			if (! response.ok) {
				setError(true);
			}

		} catch (error) {
			setError(true);
			throw new Error(error);
		}
	}

	return(
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="formUsername">Username:</label>
				<input type="text" required name="formUsername" id="formUsername" value={formData.username || ''} onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>

				<label htmlFor="formAvatar">Avatar link:</label>
				<input type="text" required name="formAvatar" id="formAvatar" value={formData.avatar || ''} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}/>

				<label htmlFor="formBio">Bio:</label>
				<input type="text" required name="formBio" id="formBio" value={formData.bio || ''} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}/>

				<input type="submit" required name="submitBtn" id="submitBtn" value="Confirm"/>
			</form>

			{error && <div>Error updating profile</div>}
		</>
	);
}
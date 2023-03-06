/**
 * Make fetch to auth API to retrieve user data after login
 * @param {Object} googleData 
 * @returns response data of user's credentials
 */
async function retrieveLoginCredentials(googleData) {
	// call POST request for logging in
	const res = await fetch('/auth/login', {
		method: 'POST',
		body: JSON.stringify({
			token: googleData.credential
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// Retrieve data as json and set user's name
	return await res.json();
}

export { retrieveLoginCredentials };

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

	// Retrieve and return user state (registered / not registered)
	return await res.json();
}

/**
 * Assign intial ranking depending on skill level user chose
 * @param {String} skillLevel 
 * @returns intial ranking
 */
function determineRank(skillLevel) {
	const BEGINNER = 100;
	const INTERMEDIATE = 500;
	const EXPERT = 1000;

	switch (skillLevel) {
	case ('Beginner'):
		return BEGINNER;
	case ('Intermediate'):
		return INTERMEDIATE;
	case ('Expert'):
		return EXPERT;
	default: 
		throw new Error('did not specified correct skillLevel');
	}
}

export { retrieveLoginCredentials, determineRank };
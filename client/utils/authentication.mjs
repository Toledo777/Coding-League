
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

function determineRank(skillLevel) {
	let rank;
	const BEGINNER = 100;
	const INTERMEDIATE = 500;
	const EXPERT = 1000;

	switch (skillLevel) {
	case ('Beginner'):
		rank = BEGINNER;
		break;
	case ('Intermediate'):
		rank = INTERMEDIATE;
		break;
	case ('Expert'):
		rank = EXPERT;
		break;
	default: 
		throw new Error('did not specified right level');
	}
	return rank;
}

export { retrieveLoginCredentials, determineRank };
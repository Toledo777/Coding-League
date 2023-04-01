import express from 'express';
// import { MongoDBStore } from 'connect-mongodb-session';
import { OAuth2Client } from 'google-auth-library';
import { user as userModel } from './models/user.mjs';
import dotenv from 'dotenv';
//TODO: figure out why secure true doesn't work on production

dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.use(express.json());

/**
 * Returns google client id to be used in the client
 */
router.get('/google-client-id', (req, res) => {
	let clientID = process.env.GOOGLE_CLIENT_ID;
	res.json(clientID);
});

/**
 * Return user data by first verify ID Token, then determine user's registration status.
 */
router.post('/login', async (req, res) => {

	// Check if token in request
	if (!req.body.token) {
		return res.status(401).json({ error: 'no token' });
	}

	// Retrieve token, and verify it its valid
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	if (!ticket) {
		return res.sendStatus(401).json({ error: 'Google ticket invalid' });
	}

	// Extract user data 
	const { email, picture, name } = ticket.getPayload();
	// const user = { email, picture, name };


	let response = ENV_MODE !== 'dev' ? await userModel.findOne({ email: email }).cache(ONE_DAY) : await userModel.findOne({ email: email });
	if (!response) {
		// If no response: Newly registered use. Create a new user into DB.
		const user = new userModel({ email: email, username: name, avatar_uri: picture, exp: 0 });
		try {
			await user.save();
			// Once save. Re-find that user in DB
			response = ENV_MODE !== 'dev' ? await userModel.findOne({ email: email }).cache(ONE_DAY) : await userModel.findOne({ email: email });
			if (!response) {
				return res.sendStatus(500).json({ error: 'Could not find user after creating one.' });
			}
		} catch {
			res.sendStatus(500).json({ error: 'Error on user creation' });
		}

	} else {
		// If there is response: Update user into DB
		const updatedUser = new userModel({ _id: response._id, email: email, username: response.name, avatar_uri: response.picture, exp: response.exp });
		await userModel.updateOne({ email: email }, updatedUser);
	}

	// {ACCORDING TO JAYA's DEMO} 
	// Note: you may want to save the session to a datastore like Redis in production.

	// Add user details into session
	req.session.regenerate((err) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500).json({ error: 'Error trying to regenerate session' });
		}
		req.session.user = response;
		return res.sendStatus(200);
	});
});

/**
 * Retrieves user info from session
 * If user's info not in session, return value for client to handle non-login credentials
 */
router.get('/credentials', async (req, res) => {
	req.session.user ? res.json(req.session.user) : res.json({ notloggedIn: true });
});

//***** routes for authenticated users only *****\\

/** 
 * Checks if user is authenticated by checking its session
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns pass to the next route
 */
function isAuthenticated(req, res, next) {
	if (!req.session.user) {
		return res.sendStatus(401);
	}
	return next();
}

/**
 * Used to have certain features / pages accessible for authenticated users only
 */
router.get('/protected',
	isAuthenticated,
	function (req, res) {
		res.sendStatus(200);
	}
);

/**
 * Log out the user by clearing session cookies
 */
router.post('/logout', isAuthenticated, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.clearCookie('session-id');
		res.sendStatus(200);
	});
});

export default router;

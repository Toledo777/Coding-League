import express from 'express';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import { user as userModel } from './models/user.mjs';
import dotenv from 'dotenv';

dotenv.config();
const SESSION_MAX_AGE = 86400000; // 1 day
const ENV_MODE = process.env.NODE_ENV || 'dev';
const router = express.Router();

router.use(session({
	secret: process.env.SECRET, //used to sign the session id
	name: 'session-id', //name of the session id cookie
	saveUninitialized: false, //don't create session until something stored
	resave: false,
	cookie: {
		maxAge: SESSION_MAX_AGE, //time in ms
		secure: ENV_MODE === 'prod' ? true : false, //should only sent over https, but set to false for testing and dev on localhost
		httpOnly: true, //can't be read by clientside JS
		sameSite: 'strict' //only sent for requests to same origin
	}
}));

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
		return res.sendStatus(401).json({ state: 'invalid' });
	}

	// Extract user data 
	const { email, picture } = ticket.getPayload();
	const user = { email, picture };
	const response = await userModel.findOne({ email: user.email });

	const isRegistered = response ? true : false;

	// {ACCORDING TO JAYA's DEMO} 
	// Note: you may want to save the session to a datastore like Redis in production.
	req.session.regenerate((err) => {
		if (err) {
			return res.sendStatus(500);
		}
		req.session.user = user;
		res.json({ isRegistered });
	});
});

/**
 * Retrieves user info from session
 * If user's info is not in DB, return user info from session.
 * User session info will be used during profile-setup for POST to DB once submitted
 * User DB info will be used everywhere else once user registers.
 */
router.get('/credentials', async (req, res) => {
	if (req.session.user) {
		const user = await userModel.findOne({ email: req.session.user.email });
		user ? res.json(user) : res.json(req.session.user);
	} else {
		res.json({ notloggedIn: true });
	}
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

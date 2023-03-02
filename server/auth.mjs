import express from 'express';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import { user as userModel } from './models/user.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.use(session({
	secret: process.env.SECRET, //used to sign the session id
	name: 'id', //name of the session id cookie
	saveUninitialized: false, //don't create session until something stored
	resave: false,
	cookie: {
		maxAge: 20000, //time in ms
		//should only sent over https, but set to false for testing and dev on localhost
		secure: false,
		httpOnly: true, //can't be accessed via JS
		sameSite: 'strict' //only sent for requests to same origin
	}
}));

router.use(express.json());

router.post('/login', async (req, res) => {
	if (!req.body.token) {
		return res.status(401).json({ error: 'no token' });
	}
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	if (!ticket) {
		return res.sendStatus(401).json({ state: 'invalid' });
	}
	let resData = {};
	const { name, email, picture } = ticket.getPayload();
	const user = { name, email, picture };
	console.log(user);
	const response = userModel.findOne(email);
	if (response.email) {
		resData['state'] = 'registered';
		// Update
	} else {
		resData['state'] = 'not-registered';
		// Insert (Or not. Redirect to profile setup page)
		// put info into session
		// 3 responses: is registered (cred in google database), (cre not in database), (they aren't who they say they are)
		// logged, pending, error
	}
	resData['user'] = user;
	console.log(resData);
	req.session.regenerate((err) => {
		if (err) {
			// handle error
		}
		req.session.user = user;
		res.json({ userData: resData });
	});
});
// route if user is authenticated
// global state (user's name, email)
function isAuthenticated(req, res, next) {
	if (!req.session.user) {
		//handle error
	}
	return next();
}
router.get("/protected",
	isAuthenticated,
	function (req, res, next) {
		//would actually be doing something
		res.sendStatus(200);
	}
);

router.post('/logout', isAuthenticated, (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			//handle error
		}
		res.clearCookie('id');
		res.sendStatus(200);
	});
});

export default router;

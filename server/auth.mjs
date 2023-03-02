import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { user } from './models/user.mjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.use(express.json());

router.post('/auth', async (req, res, next) => {
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	if (!ticket) {
		return res.sendStatus(401);
	}
	const {name, email, picture} = ticket.getPayload();
	const response = user.findById(email);
	if(response) {
		// Update
	} else {
		// Insert
	}

	req.session.regenerate(function(err) {
		if (err) {
			// handle error
		}
		req.session.user = user;
		res.json({user: user});
	});
});


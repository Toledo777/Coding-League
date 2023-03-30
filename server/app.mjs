import express from 'express';
import api from '../server/api.mjs';
import auth from '../server/auth.mjs';
import compression from 'compression';
import session from 'express-session';


const app = express();

const SESSION_MAX_AGE = 86400000; // 1 day
const ENV_MODE = process.env.NODE_ENV || 'dev';

app.use(session({
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



/**
 * Compress all JSON responses, resulting in smaller data sizes
 */
app.use(compression());

app.use(express.static('dist'));

app.use('/auth', auth);
app.use('/api', api);



/**
 * 404 response if sub-query not provided
 */
app.get('/api', (req, res) => {
	res.status(404).send('query must be provided');
});

/**
 * React router will deal with the routes client side
 */
app.get('/*', (req, res) => {
	if (req.accepts('html')) {
		res.sendFile('index.html', { root: 'dist' });
	} else {
		res.status(404).send('404: Not found');
	}
});

export default app;
import express from 'express';
import api from '../server/api.mjs';
import auth from '../server/auth.mjs';
import api_doc from './api_doc.mjs';
import compression from 'compression';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

const app = express();

const SESSION_MAX_AGE = 86400000; // 1 day

// Create Session Store in MongoDB
const MongoDBStore = connectMongoDBSession(session);
const store = MongoDBStore({
	uri: process.env.ATLAS_URI,
	collection: 'user-sessions'
});

// Catch any Session Store errors
store.on('error', (err)=>{
	console.error(err);
});

app.use(session({
	secret: process.env.SECRET, //used to sign the session id
	name: 'session-id', //name of the session id cookie
	saveUninitialized: false, //don't create session until something stored
	resave: false,
	store: store,
	cookie: {
		maxAge: SESSION_MAX_AGE, //time in ms
		secure: false,
		httpOnly: true, //can't be read by clientside JS
		sameSite: 'strict' //only sent for requests to same origin
	}
}));

/**
 * Compress all JSON responses, resulting in smaller data sizes
 */
app.use(compression());
app.use(express.static('dist'));

app.use('/api/docs', api_doc);
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
import express from 'express';
import api from '../server/api.mjs';
import auth from '../server/auth.mjs';
import session from 'express-session';

const app = express();

app.use(express.static('dist'));

app.use('/api', api);
app.use('/auth', auth);

/**
 * 404 response if sub-query not provided
 */
app.get('/auth', (req, res) => {
	res.status(404).send('query must be provided');
});

/**
 * 404 response if sub-query not provided
 */
app.get('/api', (req, res) => {
	res.status(404).send('query must be provided');
});

/**
 * React router will deal with the routes client side
 */
app.get('/*', (_, res) => {
	res.sendFile('index.html', { root: 'dist' });
});

export default app;
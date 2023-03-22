import express from 'express';
import api from '../server/api.mjs';
import auth from '../server/auth.mjs';
import compression from 'compression';

const app = express();

/**
 * Compress all JSON responses, resulting in smaller data sizes
 */
app.use(compression());

app.use(express.static('dist'));

app.use('/api', api);
app.use('/auth', auth);

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
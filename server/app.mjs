import express from 'express';
import api from '../server/api.mjs';
import compression from 'compression';

const app = express();

/**
 * Compress all JSON responses, resulting in smaller data sizes
 */
app.use(compression());

app.use(express.static('dist'));

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
app.get('/*', (_, res) => {
	res.sendFile('index.html', { root: 'dist' });
});

export default app;
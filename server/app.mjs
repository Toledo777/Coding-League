import express from 'express';
import api from '../server/api.mjs';
import compression from 'compression';

const app = express();

app.use(compression());

app.use(function (req, res, next) {
	res.set('Cache-control', 'public, max-age=31536000');
	next();
});

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
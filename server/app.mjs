import express from 'express';

const app = express();

app.use(express.static('dist'));

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
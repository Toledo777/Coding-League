// Production server

import app from './app.mjs';
import dbConnect from './lib/database.mjs';

const PORT = 8080;

await dbConnect();

/**
 * If these environment variables are not provided, exit the program.
 * SECRET is a environment that consist of any string of characters. Used to hash the session.
 **/
if (!process.env.SECRET || !process.env.CODE_RUNNER_URI || !process.env.GOOGLE_CLIENT_ID) {
	console.log('Error: SECRET, CODE_RUNNER_URI, GOOGLE_CLIENT_ID must be set in environment');
	process.exit(1);
}
app.listen(PORT, () => {
	console.log(`Production server listening at http://localhost:${PORT}`);
});

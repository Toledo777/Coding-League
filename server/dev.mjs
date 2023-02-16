// Developement server

import { watch } from '../build/utils.mjs';
import app from './app.mjs';
import dbConnect from './lib/database.mjs';
import { problem } from './models/problem.mjs';

const PORT = 8080;

await dbConnect();

app.listen(PORT, () => {
	console.log(`Development server listening at http://localhost:${PORT}`);
});

// Rebuild on source change
// DEV MODE ONLY
await watch();


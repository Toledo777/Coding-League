// Developement server

import { watch } from '../build/utils.mjs';
import app from './app.mjs';

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Development server listening at http://localhost:${PORT}`);
});

// Rebuild on source change
// DEV MODE ONLY
await watch();


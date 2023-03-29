// Developement server

import { watch } from '../build/utils.mjs';
import app from './app.mjs';
import dbConnect from './lib/database.mjs';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;

await dbConnect();

if(!process.env.SECRET){
	console.log('Error: add SECRET to .env (random set of characters)');
	process.exit(1);
}
app.listen(PORT, () => {
	console.log(`Development server listening at http://localhost:${PORT}`);
});

// Rebuild on source change
// DEV MODE ONLY
await watch();
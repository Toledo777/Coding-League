// Developement server

import { watch } from '../build/utils.mjs';
import app from './app.mjs';
import dbConnect from './lib/database.mjs';
import dotenv from 'dotenv';
dotenv.config();

import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';

app.use(requestIp.mw());

app.use(rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 30, // limit each IP to 30 requests per windowMs
	keyGenerator: (req, res) => {
		return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
	}
}));

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
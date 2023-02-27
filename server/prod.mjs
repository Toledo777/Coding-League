// Production server

// import { build } from '../build/utils.mjs';
import app from './app.mjs';
import dbConnect from './lib/database.mjs';

const PORT = 8080;
await dbConnect();


app.listen(PORT, () => {
	console.log(`Production server listening at http://localhost:${PORT}`);
});

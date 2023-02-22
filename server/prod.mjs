// Production server

// import { build } from '../build/utils.mjs';
import app from './app.mjs';

const PORT = 8080;

// await build();

app.listen(PORT, () => {
	console.log(`Production server listening at http://localhost:${PORT}`);
});

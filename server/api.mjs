import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';


router.get('/problem', async (req, res) => {
	console.log('problem api');
	const x = await problem.find();
	res.json(x[1].description);
});

export default router;
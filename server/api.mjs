import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';


router.get('/problem/random', async (req, res) => {
	console.log('problem api');
	const response = await problem.find();
	res.json(response[1]);
});

export default router;
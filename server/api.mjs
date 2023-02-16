import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';


router.get('/problem', async (req, res) => {
	console.log('problem api');
	const response = await problem.find();
	res.json(response[1]);
});

export default router;
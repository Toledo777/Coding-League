import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';


router.get('/problem/random', async (req, res) => {
	const response = await problem.find();
	res.json(response[1]);
});

router.get('/problem/id', async (req, res) => {
	const response = await problem.find();
	res.json(response[1]);
})

router.get('/problem/title', async (req, res) => {
	const response = await problem.find();
	res.json(response[1]);
})

router.get('/problem/tags', async (req, res) => {
	const response = await problem.find();
	res.json(response[1]);
})

router.get('/hello_world', (req, res) => {
	res.send("Hello World");
});

router.post('/attempt', (req, res) => {
	console.log(req.query.answer);
	res.status(200);
})

export default router;
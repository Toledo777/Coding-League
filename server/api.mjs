import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';
let id = '233B'

router.get('/problem/random', async (req, res) => {
	const response = await problem.findById({ _id: req.body.id });
	res.json(response);
});

router.get('/problem/id', async (req, res) => {
	const response = await problem.findById({ _id: req.query.id });
	res.json(response);
})

router.get('/problem/title', async (req, res) => {
	const response = await problem.find({});
	res.json(response[0]);
})

router.get('/problem/tags', async (req, res) => {
	if (req.query.difficulty) {
		console.log('there is difficulty range');
		const response = await problem.find({});
		res.json(response[0]);
	}
	else {
		console.log('there is no difficulty');
		const response = await problem.find({});
		res.json(response[0]);
	}
})

router.get('/hello_world', (req, res) => {
	res.send("Hello World");
});

router.post('/answer', (req, res) => {
	console.log(req.query.answer);
	res.status(200);
})

export default router;
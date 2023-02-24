import express from 'express';
const router = express.Router();
import { problem } from './models/problem.mjs';


router.get('/problem/random', async (req, res) => {
	const response = await problem.find({});
	let random = Math.floor(Math.random(50));
	res.json(response[random]);
});

router.get('/problem/id', async (req, res) => {
	if (req.query.id !== '' && req.query.id !== null) {
		const response = await problem.findById({ _id: req.query.id });
		res.json(response);
	}
	else {
		res.json({ title: 'No ID input' });
	}
});

router.get('/problem/title', async (req, res) => {
	const response = await problem.findOne({ title: req.query.title });
	res.json(response);
});
//preliminary difficulty implementation
router.get('/problem/tags', async (req, res) => {
	// if (req.query.difficulty) {
	// 	console.log('there is difficulty range');
	// 	const response = await problem.find({});
	// 	res.json(response[0]);
	// }
	// console.log('there is no difficulty');

	//finding multiple tags possible with $in
	const response = await problem.find({ tags: { $in: ['\n    ' + req.query.tags + '\n', '\n    ' + '*2300' + '\n'] } });
	res.json(response[0]);
});

router.get('/hello_world', (req, res) => {
	res.send('Hello World');
});

router.post('/answer', (req, res) => {
	console.log(req.query.answer);
	res.status(200);
});

export default router;
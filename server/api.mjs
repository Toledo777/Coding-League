import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
import { problem } from './models/problem.mjs';


const CODE_RUNNER_URI = process.env.CODE_RUNNER_URI;

// Parse body as json
router.use(bodyParser.json());

/**
 * gets a random problem, works on first 50 problems,
 *  incomplete until we decide how we want to implement difficulty
 */
router.get('/problem/random', async (req, res) => {
	const response = await problem.find({});
	let random = Math.floor(Math.random(50));
	res.json(response[random]);
});

/**
 * gets a single problem by its id
 */
router.get('/problem/id', async (req, res) => {
	if (req.query.id) {
		const response = await problem.findById(req.query.id);
		res.json(response);
	}
	else {
		res.json({ title: 'No ID input' });
	}
});

/**
 * gets a single problem by its title
 */
router.get('/problem/title', async (req, res) => {
	const response = await problem.findOne({ title: req.query.title });
	res.json(response);
});


/**
 * gets the first problem related to the tag sent by the user,
 * incomplete until difficulty implementation is complete and I figure out a way to deal with more than one tags with a space in them
 */
router.get('/problem/tags', async (req, res) => {
	//preliminary difficulty implementation

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


/**
 * Submits code to be ran by the code-runner
 *  for now this acts only as a proxy for the code-runner
 */
router.post('/problem/debug', async (req, res) => {
	console.log(req.body);
	const { code, problem_id } = req.body;
	const response = await fetch(`${CODE_RUNNER_URI}/debug_problem`, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}, method: 'POST', body: JSON.stringify({ code, problem_id })
	});
	const data = await response.json();
	res.json(data);
});

/**
 * useless hello world, can be deleted in a later commit
 */
router.get('/hello_world', (req, res) => {
	res.send('Hello World');
});

/**
 * post api for client to server posts, going to be used in a different sprint
 */
router.post('/answer', (req, res) => {
	console.log(req.query.answer);
	res.status(200);
});

export default router;
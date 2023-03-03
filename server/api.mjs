import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as fileIO from './fileIO/fileIO.mjs';

dotenv.config();

const router = express.Router();
import { problem } from './models/problem.mjs';

const CODE_RUNNER_URI = process.env.CODE_RUNNER_URI;

// Parse body as json
router.use(bodyParser.json());

/**
 * gets random problems in a range given by req.query.range (2941 is equal to the amount of problems in our db)
 * this is so we don't have to fetch the entire db every time we want some randoms
 *  
 */
router.get('/problem/random', async (req, res) => {
	// let random = Math.floor(Math.random() * 2941);
	// let array = [];
	// for (let i = 0; i < req.query.start; i++) {
	// 	array.push(await problem.findOne({}).skip(random));
	// 	random = Math.floor(Math.random() * 2941);
	// }
	let problem = await problem.find([{ $sample: { size: 1 } }]);
	res.json(problem);
});

//fetches {req.query.count} number of problems starting at {req.query.start} in the db's entire list of problems (for pagination) 
router.get('/problem/list', async (req, res) => {
	let array = [];
	let max = parseInt(req.query.start) + parseInt(req.query.count);
	for (let i = req.query.start; i < max; i++) {
		array.push(await problem.findOne({}).skip(i));
	}
	res.json(array);
});

/**
 * gets a single problem by its id
 */
router.get('/problem/id', async (req, res) => {
	if (req.query.id) {
		const response = await problem.findById(req.query.id);
		if (response != undefined) {
			res.json(response);
		}
		else {
			res.json({ title: 'bad ID' });
		}
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
 * get json result containing string array of all possible coding problem tags
 * used in react to populate the tag multiselect field in the filter component of the search page
 */
router.get('/allTags', async (req, res) => {
	console.log(process.cwd());
	let tags = await fileIO.readFile(fileIO.allTagsPath);
	// if (tags == null) {
	// 	res.status(404).json({ error: 'tags unavailable' });
	// } else {
	res.json({ tags });
	// }
});

/**
 * Submits code to be ran by the code-runner
 *  for now this acts only as a proxy for the code-runner
 */
router.post('/problem/debug', async (req, res) => {
	console.log(req.body);
	const { code, problem_id } = req.body;
	if (code != undefined) {
		const response = await fetch(`${CODE_RUNNER_URI}/debug_problem`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, method: 'POST', body: JSON.stringify({ code, problem_id })
		});
		const data = await response.json();
		res.json(data);
	}
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
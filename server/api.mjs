import express, { response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import fs from 'fs/promises';

import { problem } from './models/problem.mjs';
import { user } from './models/user.mjs';

import { searchProblems, insertProblems } from './search/searchManager.mjs';
import { create, insertBatch, search } from '@lyrasearch/lyra';

dotenv.config();
const router = express.Router();

(async function() {
	const dbFind = (await problem.find({}, { _id: 1, title: 1, tags: 1 })).map(({ _id, title, tags }) => ({ _id, title, tags }));
	await insertProblems(dbFind);
})();

const CODE_RUNNER_URI = process.env.CODE_RUNNER_URI;
const ONE_DAY = 86400;

let problemTags;

try {
	problemTags = await fs.readFile('./server/assets/all_tags.json', 'utf-8');
	problemTags = JSON.parse(problemTags);
} catch (e) {
	console.log(e);
}

// Parse body as json
router.use(bodyParser.json());

/**
 * gets random problems in a range given by req.query.start (2941 is equal to the amount of problems in our db)
 * this is so we don't have to fetch the entire db every time we want some randoms
 *  
 */
router.get('/problem/random', async (req, res) => {
	let response = await problem.aggregate([{ $sample: { size: 1 } }]);
	res.json(response[0]);
});

//fetches {req.query.count} number of problems starting at {req.query.start} in the db's entire list of problems (for pagination) 
router.get('/problem/list', async (req, res) => {
	let response = await problem.aggregate([
		{ $skip: parseInt(req.query.start) },
		{ $limit: parseInt(req.query.count) }
	]);
	res.json(response);
});

/**
 * gets a single problem by its id
 */
router.get('/problem/id', async (req, res) => {
	if (req.query.id) {
		const response = await problem.findById(req.query.id).cache(ONE_DAY);
		if (response != undefined) {
			res.json(response);
		} else {
			res.status(404).json({ title: 'invalid ID' });
		}
	} else {
		res.status(404).json({ title: 'No ID input' });
	}
});

/**
 * gets a single problem by its title
 */
router.get('/problem/title', async (req, res) => {
	const response = await problem.findOne({ title: req.query.title }).cache(ONE_DAY);
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
	//console.log(req.body);
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
 * get json result containing string array of all possible coding problem tags
 * used in react to populate the tag multiselect field in the filter component of the search page
 */
router.get('/allTags', async (req, res) => {
	if (problemTags == null) {
		res.status(500).json({ error: 'tags unavailable' });
	} else {
		res.json(problemTags);
	}
});

/**
 * get json result containing JSON array of titles and IDs of problems returned from Lyra Search
 * takes in a search query to search Lyra schema and a limit to specify search limit
 * used for search bar on search page
 */
router.get('/searchProblems', async (req, res) => {
	const limit = () => {
		if (!req.query.limit) {
			return 10;
		} else {
			return req.query.limit;
		}
	};
	if (req.query.search === undefined) {
		res.status(400).json({ error: 'missing search param' });
	} else if (req.query.search === '') {
		res.status(404).json({ error: 'Enter a title to search for problems' });
	} else {
		const distinctResults = await searchProblems(req.query.search, limit());
		res.status(200).json(distinctResults);
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

/**
 * GET api to get all data on a user based on userID
 * to use call '/api/user?email= with' or '/api/user?username= '
 */
router.get('/user', async(req, res) => {
	// check for email
	if (req.query.email) {
		
		const response = await user.findOne({email: req.query.email});
		if (response) {
			res.json(response);
		}
		// no data found with ID
		else {
			res.status(404).json({ title: 'No data found with that email' });
		}
	}

	// check for username
	else if (req.query.username) {
		// check for valid mongo object id format
		const response = await user.findOne({username: req.query.username});
		if (response) {
			res.json(response);
		}
		// no data found with username
		else {
			res.status(404).json({ title: 'No data found with that username' });
		}
	}
	// missing id parameter
	else {
		res.status(400).json({ title: 'No parameter given' });
	}
});


router.post('/user/create', async(req, res) => {
	// check for user data in body
	if (req.body.email) {
		const userData = new user(req.body);
		await userData.save();
		console.log('Account Created!');
		res.status(201).json({title: 'Account created'});
	}

	else {
		res.status(400).json({title: 'ERROR: Missing email or data in body'});
	}
});

/**
 * PUT api to update user data already present in database
 * uses email to update user
 * 
 */
router.put('/user/update', express.json(), async (req, res) => {
	// check for email
	const userData = req.body;
	if (req.body.email) {
		const response = await user.updateOne({email: userData.email}, userData);
		console.log(userData);

		// if response from db
		if (response.acknowledged) {
			console.log('Account updated succesfully');
			res.status(204).json({title: 'Account updated'});
		}

		// no data found with email
		else {
			res.status(404).json({ title: 'No data found' });
		}
	}
	// missing id parameter
	else {
		res.status(400).json({ title: 'ERROR: Missing email parameter' });
	}
});

export default router;
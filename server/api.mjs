import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { problem } from './models/problem.mjs';
import { user } from './models/user.mjs';
import { userAnswer } from './models/userAnswer.mjs';
import { searchProblems, insertProblems } from './search/searchManager.mjs';

dotenv.config();
const router = express.Router();

// global variable to store tags to be fetched using /allTags route for problem search filtering
let tags = [];

(async function () {
	const dbResults = await problem.find({}, { _id: 1, title: 1, tags: 1, description: 1 });

	// Remove all the wrapping that mongoose does so lyra will accept the data
	const problems = dbResults.map(
		({ _id, title, tags, description }) => ({ _id, title, tags, description })
	);

	// push unique tags to global scope tags array above this function
	problems.forEach((problem) => {
		problem.tags.forEach((tag) => {
			if (tags.indexOf(tag) == -1 && !tag.match(/\*\d{3,4}/gm)) {
				tags.push(tag);
			}
		});
	});

	// insert problems to lyra problems schema
	try {
		await insertProblems(problems);
		console.log('Lyra DB populated');
	} catch (e) {
		console.log('Error inserting problems: ' + e);
		console.log('Problem searching not active!');
	}
})();

const CODE_RUNNER_URI = process.env.CODE_RUNNER_URI;
const ENV_MODE = process.env.NODE_ENV || 'dev';
const ONE_DAY = 86400;

// Parse body as json
router.use(bodyParser.json());

// get user IP address for the purposes of limiting API requests
router.use(requestIp.mw());

// limit API requests for each IP address individually (max 30 requests every 1 minute)
const [timeout, limit] = [60 * 1000, 5]; // 5 requests across 1 minute
const codeRunnerLimiter = rateLimit({
	windowMs: timeout,
	max: limit,
	keyGenerator: (req, res) => {
		return req.clientIp; // rateLimit has req.ip but apparently it's not helpful, hence the requestIp.mw() above
	},
	standardHeaders: true
});

// values for calculating score
const [base, firstClear] = [100, 175];

/**
 * gets random problem from the DB
 */
router.get('/problem/random', async (req, res) => {
	const response = await problem.aggregate([{ $sample: { size: 1 } }]);
	response ? res.status(200).json(response[0]) : res.status(404).json({ error: 'Coding problem couldn\'t be found' });
});

/**
 *fetches {req.query.count} number of problems starting at {req.query.start} in the db's entire list of problems
 */
router.get('/problem/list', async (req, res) => {
	const response = await problem.aggregate([
		{ $skip: parseInt(req.query.start) },
		{ $limit: parseInt(req.query.count) }
	]);
	response ? res.status(200).json(response) : res.status(404).json({ error: 'Coding problems couldn\'t be found' });
});

/**
 * gets a single problem by its id
 */
router.get('/problem/id', async (req, res) => {
	if (req.query.id) {
		const response = ENV_MODE !== 'dev' ? await problem.findById(req.query.id).cache(ONE_DAY) : await problem.findById(req.query.id);
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
	const response = ENV_MODE !== 'dev' ? await problem.findOne({ title: req.query.title }).cache(ONE_DAY) : await problem.findOne({ title: req.query.title });
	response ? res.status(200).json(response) : res.status(404).json({ error: 'Coding problem not found' });
});

/**
 * Submits code for debugging to be ran by the code-runner
 * for now this acts only as a proxy for the code-runner
 */
router.post('/problem/debug', codeRunnerLimiter, async (req, res) => {
	const { code, problem_id } = req.body;
	if (code != undefined && problem_id != undefined) {
		const response = await fetch(`${CODE_RUNNER_URI}/debug_problem`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, method: 'POST', body: JSON.stringify({ code, problem_id })
		});
		const data = await response.json();
		res.status(200).json(data);
	} else {
		if (!code) {
			res.status(400).json({ 'error': 'No code submitted!' });
		}
		else if (!problem_id) {
			res.status(400).json({ 'error': 'No problem_id specified!' });
		}
	}
});

/**
 * Submits code solution to be ran by the code-runner
 * will update user answer row in userAnswerSchema if applicable (or create new row if non-existent)
 */
router.post('/problem/submit', codeRunnerLimiter, async (req, res) => {
	const { email, problem_id, problem_title, code } = req.body;
	if (code != undefined && email != undefined && problem_id != undefined) {
		const submitResp = await fetch(`${CODE_RUNNER_URI}/attempt_problem`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, method: 'POST', body: JSON.stringify({ code, problem_id })
		});
		const results = await submitResp.json();

		// fetch user answer and store solved variable representing their previous solved state
		let answerData = await userAnswer.findOne({ email: email, problem_id: problem_id });
		let solved;

		// if the user hasn't answered yet, make a new userAnswer and set solved state to false
		if (!answerData) {
			answerData = new userAnswer({ email: email, problem_id: problem_id, problem_title: problem_title, submission: code, pass_test: false });
			answerData.save();
			solved = false;
		}
		// if user has answered, set their previous solved state to what is in the stored userAnswer document
		else {
			solved = answerData.pass_test;
		}

		// check if posted answer parsed properly and the user has never submitted a correct answer yet
		if (results && !solved) {
			// save users submitted code
			await userAnswer.updateOne({ email: email, problem_id: problem_id }, { submission: code, pass_test: results.all_ok });

			// all of this only runs if they've answered it successfully for the first time
			if (results.all_ok) {
				// initialize points
				let points = 0;

				// fetch all attempts and pass attempts for calculating points
				let allAttempts = await userAnswer.find({ problem_id: problem_id });
				let passAttempts = allAttempts.filter((attempt) => { return attempt.pass_test; });

				// count all attempts and pass attempts
				[allCount, passCount] = [allAttempts.length, passAttempts.length];

				// if not first clear
				if (passCount > 1 && allCount > 1) {
					// store calculation so we can limit it to 100 later
					const calculation = base * (allCount / passCount);
					points = base + (base * ((calculation < 100) ? calculation : 100));
				}
				// if first clear
				else {
					points = base + firstClear;
				}

				// update user points by taking their current points and adding points from this new solution
				const fetchUser = await user.findOne({ email: email });
				await user.updateOne({ email: email }, { exp: (fetchUser.exp ?? 0) + points });
			}
		}

		res.json(results);
	} else {
		if (!code) {
			res.status(400).json({ 'error': 'No code submitted!' });
		}
		else if (!email) {
			res.status(401).json({ 'error': 'Must be logged in to submit code!' });
		}
		else if (!problem_id) {
			res.status(400).json({ 'error': 'No problem_id specified!' });
		}
	}
});

/**
 * get json result containing string array of all possible coding problem tags
 * used in react to populate the tag multiselect field in the filter component of the search page
 */
router.get('/allTags', async (req, res) => {
	if (tags.length == 0) {
		res.status(500).json({ error: 'tags unavailable' });
	} else {
		res.status(200).json(tags);
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
 * to use it: '/api/user?email=' or '/api/user?username=' or '/api/user?id='
 */
router.get('/user', async (req, res) => {
	// check for email
	if (req.query.email) {
		const response = ENV_MODE !== 'dev' ? await user.findOne({ email: req.query.email }).cache(ONE_DAY) : await user.findOne({ email: req.query.email });
		response ? res.status(200).json(response) : res.status(404).json({ title: 'No data found with that email' });
	}

	// check for id parameter
	else if (req.query.id) {
		// check if the id query is in valid ObjectId format
		if (mongoose.Types.ObjectId.isValid(req.query.id)) {
			const response = ENV_MODE !== 'dev' ? await user.findById(req.query.id).cache(ONE_DAY) : await user.findById(req.query.id);
			response ? res.status(200).json(response) : res.status(404).json({ title: 'No data found' });
		}
		else {
			res.status(400).json({ error: 'Error 400: Invalid ID' });
		}
	}

	// check for username
	else if (req.query.username) {
		// check for valid mongo object id format
		const response = ENV_MODE !== 'dev' ? await user.findOne({ username: req.query.username }).cache(ONE_DAY) : await user.findOne({ username: req.query.username });
		response ? res.status(200).json(response) : res.status(404).json({ title: 'No data found with that username' });
	}

	// missing parameter
	else {
		res.status(400).json({ error: 'Error 400: No parameter given' });
	}
});


/**
 * GET api to call the top X users
 * to use call '/api/users?count=X 
 * sorted by descending order
 * if a user is not in the leaderboard top X, they will be added to the bottom
 */
router.get('/topUsers', async (req, res) => {
	if (req.query.count) {
		let person = '';
		const response = await user.aggregate([
			{ $sort: { exp: -1 } },
			{ $limit: parseInt(req.query.count) },
		]);
		//check if a user is signed in, if so then find out if they're in the current leaderboard list, if not then create them to add at the bottom
		if (req.session.user) {
			let signedIn = response.find(({ username }) => username === req.session.user.username);
			if (!signedIn) {
				const response2 = await user.aggregate([
					{ $sort: { exp: -1 } },
				]);
				person = response2.find((element) => element.username === req.session.user.username);
				let position = (element) => element.username === req.session.user.username;
				let index = response2.findIndex(position);
				person = { ...person, position: index };
			}
		}

		if (response) {
			//if a person was created to be added
			if (person) {
				let together = [...response, { _id: 'null', username: '...' }, person];
				res.json(together);
			}
			else {
				res.json(response);
			}
		}
		else {
			res.status(404).json({ title: 'No users found' });
		}
	}
	else {
		res.status(400).json({ title: 'No parameter given' });
	}
});


/**
 * POST api to post new user into database
 * Checks if username / email exists before creating one.
 */
router.post('/user/create', async (req, res) => {
	// check for user data in body
	if (req.body.email) {
		const userData = new user(req.body);

		// Check if username / email already exists in DB before creating user
		if (await user.exists({ username: userData.username })) {
			res.status(409).json({ title: 'Username already exists' });
		} else if (await user.exists({ email: userData.email })) {
			res.status(409).json({ title: 'Email already exists' });
		} else {
			await userData.save();
			res.status(201).json({ title: 'Account created' });
		}
	} else {
		res.status(400).json({ title: 'ERROR: Missing email or data in body' });
	}
});

/**
 * PUT api to update user data already present in database
 * uses email to update user
 */
router.put('/user/update', express.json(), async (req, res) => {
	// check for email
	const userData = req.body;
	if (req.body.email) {
		const response = await user.updateOne({ email: userData.email }, userData);

		// if response from db
		if (response.acknowledged) {
			res.status(204).json({ title: 'Account updated' });
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

// return all answers associated with user
router.get('/user/answers', async (req, res) => {
	if (req.query.email) {

		// check if email exist
		let emailExist = await user.exists({ email: req.query.email });

		if (emailExist) {
			const response = await userAnswer.find({ email: req.query.email });
			// return data
			res.status(200).json(response);
		}

		// no problems found with email
		else {
			res.status(404).json({ title: 'No user associated with this email was found' });
		}
	}
	// missing id parameter
	else {
		res.status(400).json({ title: 'No parameter given' });
	}
});

export default router;
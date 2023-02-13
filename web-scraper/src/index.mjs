import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import puppeteer from 'puppeteer';
import urlToId from './urlToId.mjs';
import getCodeforcesProblems from './get_codeforces_problems.mjs';
import scrapeProblem from './scrape_problem.mjs';

const browser = await puppeteer.launch();
const BATCH_SIZE = 6;
const problems = await getCodeforcesProblems();
let processed = [];

mkdirSync('cache');

async function fetchProblem(problem) {
	return {
		...problem,
		...(await scrapeProblem(browser, problem.url))
	};
}

while (problems.length > 0) {
	const batch = [];
	for (let i = 0; i < BATCH_SIZE; i++) {
		let toAdd = problems.pop();

		if (toAdd) {
			if (!existsSync(`cache/${urlToId(toAdd.url)}`)) {
				batch.push(toAdd);
			} else {
				batch.push(JSON.parse(readFileSync(`cache/${urlToId(toAdd.url)}.json`)));
			}
		}
	}

	const done = await Promise.all(batch.map(async problem => {
		if (problem.id) {
			return problem;
		} else {
			try {
				return await fetchProblem(problem);
			} catch (e) {
				console.error(e);
			}
		}
	}));

	done.forEach(item => writeFileSync(`cache/${urlToId(item.url)}.json`, JSON.stringify(item)));

	processed.push(...done);
	console.log(processed.length);
}

writeFileSync('all_problems.json', JSON.stringify(processed));
browser.close();
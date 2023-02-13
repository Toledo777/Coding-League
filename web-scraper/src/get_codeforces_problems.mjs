import { readdir, readFile } from 'fs/promises';

// Returns a list of problems available on codeforces with expected input and output
export default async function getCodeforcesProblems() {
	const problem_folders = await readdir('data/codeforces_problems');
	return await Promise.all(problem_folders.map(async (folder) => {
		return {
			...asTestCase(JSON.parse(await readFile(`data/codeforces_problems/${folder}/input_output.json`))),
			...JSON.parse(await readFile(`data/codeforces_problems/${folder}/metadata.json`)),
		};
	}));
}

function asTestCase({ inputs, outputs }) {
	if (inputs.length != outputs.length) {
		throw new Error('test cases must have the same number of inputs and outputs');
	}

	return { testcases: inputs.map((input, i) => ({ input, output: outputs[i] })) };
}
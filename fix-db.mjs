import dbConnect from './server/lib/database.mjs';
import mongoose from 'mongoose';
import { problem } from './server/models/problem.mjs';

async function fetchAllProblems() {
	return await problem.find({});
}

const fixTag = (tag) => {
	return tag.replace('\n    ', '').replace('\n', '');
};

dbConnect().then(async () => {
	console.log('Connected');
	const problems = await fetchAllProblems();

	for (let prob of problems) {
		const fixedTags = prob.tags.map(fixTag);
		if (JSON.stringify(fixedTags) == JSON.stringify(prob.tags)) {
			console.log('Skipping', prob._id);
			continue;
		}

		console.log('update', prob._id);

		await problem.updateOne({ _id: prob._id }, { $set: { tags: fixedTags } });
		console.log('updated', prob._id);
	}
	console.log('DONE');
});


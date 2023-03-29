import { create, insertBatch, search } from '@lyrasearch/lyra';
import { problem } from '../models/problem.mjs';
const db = await create({
	schema: {
		_id: 'string',
		title: 'string',
		description: 'string',
		tags: 'string[]',
	},
});

function sanitizeRawText(text) {
	return text.replaceAll(/<[^>]*>/g, '') // Remove XML
		.replaceAll(/\s+/g, ' '); // Remove formatting whitespace
}

export async function searchProblems(term, limit) {
	const searchResults = await search(db, { term: term, limit: limit });
	return searchResults.hits.map(({ document }) => document);
}

export async function insertProblems(items) {
	let perf = performance.now();
	for (let item of items) {
		item.description = sanitizeRawText(item.description);
	}

	console.log(`sanitized in: ${performance.now() - perf}`);

	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

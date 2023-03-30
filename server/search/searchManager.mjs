import { create, insertBatch, search } from '@lyrasearch/lyra';
import { problem } from '../models/problem.mjs';

const searchDB = await create({
	schema: {
		_id: 'string',
		title: 'string',
		description: 'string',
		tags: 'string[]',
	},
});

const tagsDB = await create({
	schema: {
		tags: 'string',
	},
});

export async function searchProblems(term, limit) {
	const searchResults = await search(searchDB, { term: term, limit: limit });
	return searchResults.hits.map(({ document }) => document);
}

export async function fetchTags() {
	const searchResults = await search(tagsDB, { term: '*' });
	return searchResults.hits.map(({ document }) => document);
}

export async function insertProblems(items) {
	let perf = performance.now();
	for (let item of items) {
		item.description = sanitizeRawText(item.description);
	}
	console.log(`sanitized in: ${performance.now() - perf}`);

	await insertBatch(searchDB, items, { language: 'english', batchSize: 100 });
}

export async function insertTags(items) {
	console.log('inserting items: ' + items);
	await insertBatch(tagsDB, items, { language: 'english', batchSize: 100 });
}

function sanitizeRawText(text) {
	return text.replaceAll(/<[^>]*>/g, '') // Remove XML
		.replaceAll(/\s+/g, ' '); // Remove formatting whitespace
}

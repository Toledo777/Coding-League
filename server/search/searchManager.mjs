import { create, insertBatch, search } from '@lyrasearch/lyra';

const db = await create({
	schema: {
		_id: 'string',
		title: 'string',
		tags: 'string[]',
	},
});

export async function searchProblems(term, limit) {
	const searchResults = await search(db, { term: term, limit: limit });
	return searchResults.hits.map(({document}) => document);
}

export async function insertProblems(items) {
	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

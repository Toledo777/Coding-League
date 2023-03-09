import { create, insertBatch, search } from '@lyrasearch/lyra';

const db = await create({
	schema: {
		_id: 'string',
		title: 'string',
		tags: 'string[]',
	},
});

export async function searchProblems(term) {
	const searchResults = await search(db, { term: term, limit: 6 });
	return searchResults.hits.map((hit) => ({ _id: hit.document._id, title: hit.document.title, tags: hit.document.tags }));
}

export async function insertProblems(items) {
	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

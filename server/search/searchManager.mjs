import { create, insertBatch, search } from '@lyrasearch/lyra';

// const db = async create({
// 	defaultLanguage: 'english',
// 	schema: {
// 		_id: 'string',
// 		title: 'string',
// 		description: 'string',
// 	},
// });

const db = await create({
	schema: {
		_id: 'string',
		title: 'string',
	},
});

export async function searchProblems(term) {
	const searchResults = await search(db, { term: term, limit: 6 });
	searchResults = searchResults.hits.map((hit) => [hit.document._id, hit.document.title]);
	return searchResults.hits.map((hit) => [hit.document._id, hit.document.title]);
}

export async function insertProblems(items) {
	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

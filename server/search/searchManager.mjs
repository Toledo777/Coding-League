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
	return searchResults.hits.map((hit) => ({ _id: hit.document._id, title: hit.document.title }));
}

export async function insertProblems(items) {
	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

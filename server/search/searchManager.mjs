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
<<<<<<< HEAD
	//searchResults = searchResults.hits.map((hit) => [hit.document._id, hit.document.title]);
	return searchResults.hits.map((hit) => [hit.document._id, hit.document.title]);
=======
	return searchResults.hits.map((hit) => ({ _id: hit.document._id, title: hit.document.title }));
>>>>>>> 96b79b7fe73fe1ef180325fdb7c1db99ba94c1b1
}

export async function insertProblems(items) {
	await insertBatch(db, items, { language: 'english', batchSize: 100 });
}

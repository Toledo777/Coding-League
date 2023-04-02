import request from 'supertest';
import app from '../app.mjs';

describe('GET /api', () => {

	test('All tags route, should return 200', async () => {
		const response = await request(app).get('/api/allTags');
		expect(response.statusCode).toBe(200);
	});
});
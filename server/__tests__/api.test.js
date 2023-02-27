import request from 'supertest';
import app from '../app.mjs';

describe('GET /api', () => {
	test('Should return 200', async () => {
		const response = await request(app).get('/api/hello_world');
		expect(response.statusCode).toBe(200);
	});
});
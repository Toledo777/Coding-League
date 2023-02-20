import request from 'supertest';

describe('GET /api', () => {
    test('Should return 200', async () => {
        const response = await request(app).get('/api/hello_world');
        expect(response.statusCode).toBe(200);
    });
});
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Coding League\'s express APIs',
			version: '0.1.0',
			description:
				'This page contains information about our website and how our APIs are used used.',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
		},
		servers: [
			{
				url: 'http://localhost:8080',
				description: 'Development server',
			},
			{
				url: 'https://codingleague.azurewebsites.net',
				description: 'Production server'
			},
			{
				url: 'https://codingleaguetesting.azurewebsites.net',
				description: 'Deployed testing server'
			}
		],
	},
	apis: ['./*.mjs', './models/*.mjs', './search/*.mjs', './lib/*.mjs'],
};

const specs = swaggerJsdoc(options);

router.use('', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
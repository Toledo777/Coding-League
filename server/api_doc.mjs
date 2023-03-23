import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const api_doc = require('../openapi.json');

const router = express.Router();

router.use('', swaggerUi.serve, swaggerUi.setup(api_doc));

export default router;
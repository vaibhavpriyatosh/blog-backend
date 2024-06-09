import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import config from 'config';
import db from './knexDb/db';
import routes from './routes';
import logger from './utils/logger';
import { checkRedisConnection } from './redisDb/redisDb';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const testConnection = async () => {
	try {
		await db.raw('SELECT 1+1 AS result');
	} catch (error) {
		logger.error('Error connecting to the database:', error);
	} finally {
		await db.destroy();
	}
};

app.use(express.json());
app.use(routes);

app.listen(port, () => {
	checkRedisConnection();
	logger.info(`Server is running on http://localhost:${port}`);
});

import logger from '../utils/logger';
import client from './redisConnection';

export const checkRedisConnection = async (): Promise<boolean> => {
	try {
		const pong = await client.ping();
		return pong === 'PONG';
	} catch (error) {
		logger.error('Error checking Redis connection:', error);
		return false;
	}
};

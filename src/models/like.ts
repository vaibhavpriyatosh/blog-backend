import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
import { modelCreateLikeTs, returnId } from '../interface';

const connection = knex(configuration);

export const createLike = async ({
	count,
	postId,
}: modelCreateLikeTs): Promise<returnId[]> => {
	try {
		const result = await connection('like')
			.insert({
				count,
				post_id: postId,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`post : model : like : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

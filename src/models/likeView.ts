import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
import { modelCreateLikeViewTs, returnId } from '../interface';

const connection = knex(configuration);

export const updateLikeView = async ({
	postId,
	userId,
	isLiked,
	isViewed,
}: modelCreateLikeViewTs): Promise<number[]> => {
	try {
		const result = await connection('like_view')
			.insert({
				user_id: userId,
				post_id: postId,
				is_liked: isLiked,
				is_viewed: isViewed,
			})
			.onConflict(['user_id', 'post_id'])
			.merge(['is_liked', 'is_viewed']);
		return result;
	} catch (error: any) {
		logger.error(`post : model : like : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

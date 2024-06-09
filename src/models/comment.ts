import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
import { createCommentTs } from '../interface';

const connection = knex(configuration);

export const createPost = async ({
	postId,
	userId,
	parentId,
	content,
}: createCommentTs): Promise<any> => {
	try {
		const result = await connection('post')
			.insert({
				post_id: postId,
				user_id: userId,
				parentI_id: parentId,
				content,
				is_deleted: false,
			})
			.onConflict(['post_id', 'user_id', 'parent_id'])
			.merge(['content'])
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`post : model : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

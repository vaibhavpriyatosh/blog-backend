import { modelPostTs, returnId } from '../interface';
import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';

const connection = knex(configuration);

export const createPost = async ({
	text,
	image,
	hashTags,
	id,
}: modelPostTs): Promise<returnId[]> => {
	try {
		const result = await connection('post')
			.insert({
				text,
				image,
				hash_tags: hashTags,
				created_by: id,
				is_deleted: false,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

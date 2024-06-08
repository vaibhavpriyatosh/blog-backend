import { modelPostTs, modelupdatePostTs, returnId } from '../interface';
import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';

const connection = knex(configuration);

export const createPost = async ({
	text,
	image,
	hashTags,
	userId,
}: modelPostTs): Promise<returnId[]> => {
	try {
		const result = await connection('post')
			.insert({
				text,
				image,
				hash_tags: hashTags,
				created_by: userId,
				is_deleted: false,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const updatePost = async ({
	text,
	image,
	hashTags,
	id,
	userId,
}: modelupdatePostTs): Promise<any> => {
	try {
		const result = await connection('post')
			.update({
				text,
				image,
				hash_tags: hashTags,
				updated_at: 'now()',
			})
			.where('id', id)
			.andWhere('created_by', userId);
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

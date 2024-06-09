import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
import { modelCreateFollowListTs, returnId } from '../interface';

const connection = knex(configuration);

export const createFollowList = async ({
	fromUser,
	toUser,
}: modelCreateFollowListTs): Promise<returnId[]> => {
	try {
		const result = await connection('follow_list')
			.insert({
				from_user: fromUser,
				to_user: toUser,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`post : model : follow_list : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

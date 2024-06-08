import { createUserTs, returnId } from '../interface';
import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
const connection = knex(configuration);

export const createUser = async ({
	mobile,
	email,
	password,
}: createUserTs): Promise<returnId[]> => {
	try {
		const result = await connection('user')
			.insert({
				email,
				mobile,
				password,
				is_deleted: false,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

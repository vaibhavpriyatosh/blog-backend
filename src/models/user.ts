import {
	createUserTs,
	getUserModel,
	getUserTs,
	returnById,
	returnId,
	returnIdPass,
} from '../interface';
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

export const getUser = async ({
	mobile,
	email,
}: getUserModel): Promise<returnIdPass> => {
	try {
		const query = connection('user')
			.select('id', 'password')
			.where((builder) => {
				if (email) {
					builder.where('email', email);
				} else if (mobile) {
					builder.where('mobile', mobile);
				}
			})
			.first();

		const result = await query;
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const getUserById = async ({
	id,
}: {
	id: number;
}): Promise<returnById> => {
	try {
		const query = connection('user')
			.select('id', 'email', 'mobile')
			.where('id', id)
			.first();

		const result = await query;
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

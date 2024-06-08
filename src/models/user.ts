import {
	createUserTs,
	getUserModel,
	getUserTs,
	returnById,
	returnId,
	returnIdPass,
	returnUserByNameOrPhoneNumber,
	searchTextLimitTs,
	returnByNameC,
} from '../interface';
import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';
const connection = knex(configuration);

export const createUser = async ({
	name,
	mobile,
	email,
	password,
}: createUserTs): Promise<returnId[]> => {
	try {
		const result = await connection('user')
			.insert({
				name,
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
			.andWhere('is_deleted', false)
			.first();

		const result = await query;
		return result;
	} catch (error: any) {
		logger.error(`user : service : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const getUserByName = async ({
	searchText,
	page,
	pageSize,
}: searchTextLimitTs): Promise<returnByNameC> => {
	try {
		const offset = (page - 1) * pageSize;
		const query = connection('user')
			.select('id', 'mobile', 'name', 'email')
			.andWhere('is_deleted', false);

		if (searchText?.length !== 0) {
			query.where('email', 'like', `%${searchText}%`);
			query.orWhere('mobile', 'like', `%${searchText}%`);
			query.orWhere('name', 'like', `%${searchText}%`);
		}
		const total_count = await query.clone().clearSelect().count().first();
		query.limit(pageSize).offset(offset);
		const result = await query;
		return { result, total_count: Number(total_count?.count) ?? 0 };
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
			.select('id', 'email', 'mobile', 'name')
			.where('id', id)
			.andWhere('is_deleted', false)
			.first();

		const result = await query;
		return result;
	} catch (error: any) {
		logger.error(`user : service : get-user : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

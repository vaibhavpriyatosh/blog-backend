import { createUserTs, getUserTs } from '../interface';
import { generateToken } from '../utils/jwtToke';
import logger from '../utils/logger';
import { hashPassword, verifyPassword } from '../utils/passwordEncription';
import { v4 as uuidv4 } from 'uuid';
import * as modelUser from '../models/user';
import { error } from 'winston';

const createUser = async ({ mobile, email, password }: createUserTs) => {
	try {
		const securePassword = await hashPassword(password);
		const result = await modelUser.createUser({
			mobile,
			email,
			password: securePassword,
		});
		console.log({ result });
		const id = result[0]?.id;
		const token = generateToken({ id });

		return { ok: true, data: { token } };
	} catch (e) {
		logger.error(`user : service : create : ${e}`);
		throw e;
	}
};

const getUser = async ({ mobile, email, password }: getUserTs) => {
	try {
		const result = await modelUser.getUser({
			mobile,
			email,
		});

		if (!result?.id || !result?.password) {
			throw new Error('Wrong Result');
		}

		const verification = await verifyPassword(password, result?.password);

		if (!verification) {
			throw new Error('Password not verified');
		}
		const id = result?.id;

		const token = generateToken({ id });

		return { ok: true, data: { token } };
	} catch (e) {
		logger.error(`user : service : get : ${e}`);
		throw e;
	}
};

export { createUser, getUser };

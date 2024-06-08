import { createUserTs } from '../interface';
import { generateToken } from '../utils/jwtToke';
import logger from '../utils/logger';
import { hashPassword } from '../utils/passwordEncription';
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
		const id = result[0]?.id;
		const token = generateToken({ id, email, mobile });

		return { ok: true, data: { token } };
	} catch (e) {
		logger.error(`user : service : create : ${e}`);
		throw e;
	}
	return { ok: false };
};

export { createUser };

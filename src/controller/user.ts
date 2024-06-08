import { Request, Response } from 'express';
import logger from '../utils/logger';
import * as serviceUser from '../service/user';

const createUser = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { mobile, email, password },
		} = req;

		mobile = Number(mobile);

		//basic params check
		if (isNaN(Number(mobile)) || !email || !password) {
			throw new Error('Wrong params');
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email && !emailPattern.test(email)) {
			throw new Error('Wrong Email Type');
		}

		const result = await serviceUser.createUser({ mobile, email, password });

		if (result?.ok && result?.ok) {
			return res.status(200).json({ ok: true, data: result?.data });
		} else {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		logger.error(`user : controller : error : ${error}`);
		return res.status(200).json({ ok: false, error });
	}
};

const getUser = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			query: { mobile, email, password },
		} = req;

		mobile = mobile?.toString();
		email = email?.toString();
		password = password?.toString();

		//basic params check
		if ((!mobile && !email) || !password) {
			throw new Error('Wrong params');
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email && !emailPattern.test(email)) {
			throw new Error('Wrong Email Type');
		}

		const result = await serviceUser.getUser({ mobile, email, password });

		if (result?.ok && result?.ok) {
			return res.status(200).json({ ok: true, data: result?.data });
		} else {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		logger.error(`user : controller : error : ${error}`);
		return res.status(401).json({ ok: false, error });
	}
};

export { createUser, getUser };

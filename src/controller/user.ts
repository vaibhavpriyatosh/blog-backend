import { Request, Response } from 'express';
import logger from '../utils/logger';
import * as serviceUser from '../service/user';

const createUser = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { mobile, email, password, name },
		} = req;

		mobile = Number(mobile);

		//basic params check
		if (isNaN(Number(mobile)) || !email || !password || !name) {
			throw new Error('Wrong params');
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email && !emailPattern.test(email)) {
			throw new Error('Wrong Email Type');
		}

		const result = await serviceUser.createUser({
			mobile,
			email,
			password,
			name,
		});

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

const updateUser = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { mobile, email, password, name },
			user: { id: userId },
		} = req;

		mobile = mobile ? Number(mobile) : null;

		//basic params check

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email && !emailPattern.test(email)) {
			throw new Error('Wrong Email Type');
		}

		const result = await serviceUser.updateUser({
			mobile,
			email,
			password,
			name,
			userId,
		});

		if (result?.ok && result?.data) {
			return res.status(200).json({ ok: true, data: result?.data });
		} else {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		logger.error(`user : controller : error : ${error}`);
		return res.status(200).json({ ok: false, error });
	}
};

const createUserFollow = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { userList },
			user: { id: userId },
		} = req;

		//basic params check

		if (!userList || !Array.isArray(userList) || userList?.length === 0) {
			throw new Error('Wrong Params');
		}

		const result = await serviceUser.createFollowLIst({ userList, userId });

		if (result?.ok && result?.data) {
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

const getUserByName = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			query: { searchText, page = 1, pageSize = 10 },
		} = req;

		page = Number(page);
		pageSize = Number(pageSize);
		searchText = searchText?.toString();

		const result = await serviceUser.getUserByName({
			searchText,
			page,
			pageSize,
		});

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

export { createUser, getUser, getUserByName, updateUser, createUserFollow };

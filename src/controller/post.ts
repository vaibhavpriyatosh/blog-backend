import { Request, Response } from 'express';
import logger from '../utils/logger';
// import * as servicePost from '../service/post';

const createPost = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { text, image, hashTags },
		} = req;

		console.log({ text, image, hashTags });
		//basic params check
		if (
			(hashTags && !Array.isArray(hashTags)) ||
			(!text && !image && !hashTags)
		) {
			throw new Error('Wrong params');
		}

		const result = { ok: true, data: {} };
		// await serviceUser.createUser({ mobile, email, password });

		if (result?.ok && result?.ok) {
			return res.status(200).json({ ok: true, data: result?.data });
		} else {
			throw new Error('Something went wrong');
		}
	} catch (error) {
		logger.error(`user : controller : create : ${error}`);
		return res.status(200).json({ ok: false, error });
	}
};

// const getUser = async (
// 	req: Request,
// 	res: Response
// ): Promise<Express.Response> => {
// 	try {
// 		let {
// 			body: { mobile, email, password },
// 		} = req;

// 		mobile = Number(mobile);

// 		//basic params check
// 		if ((isNaN(Number(mobile)) || !email) && !password) {
// 			throw new Error('Wrong params');
// 		}

// 		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		if (email && !emailPattern.test(email)) {
// 			throw new Error('Wrong Email Type');
// 		}

// 		const result = await serviceUser.getUser({ mobile, email, password });

// 		if (result?.ok && result?.ok) {
// 			return res.status(200).json({ ok: true, data: result?.data });
// 		} else {
// 			throw new Error('Something went wrong');
// 		}
// 	} catch (error) {
// 		logger.error(`user : controller : get : ${error}`);
// 		return res.status(200).json({ ok: false, error });
// 	}
// };

export {
	createPost,
	//  getUser
};

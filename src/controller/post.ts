import { Request, Response } from 'express';
import logger from '../utils/logger';
import * as servicePost from '../service/post';

const createPost = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { text, image, hashTags },
			user: { id: userId },
		} = req;

		//basic params check
		if (
			(hashTags && !Array.isArray(hashTags)) ||
			(!text && !image && !hashTags)
		) {
			throw new Error('Wrong params');
		}

		const result = await servicePost.createPost({
			text,
			image,
			hashTags,
			userId,
		});

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

const updatePost = async (
	req: Request,
	res: Response
): Promise<Express.Response> => {
	try {
		let {
			body: { text, image, hashTags, id },
			user: { id: userId },
		} = req;

		//basic params check
		if (
			(hashTags && !Array.isArray(hashTags)) ||
			(!text && !image && !hashTags) ||
			!id
		) {
			throw new Error('Wrong params');
		}

		const result = await servicePost.updatePost({
			text,
			image,
			hashTags,
			id,
			userId,
		});

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

export { createPost, updatePost };

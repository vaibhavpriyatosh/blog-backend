import { modelPostTs, modelupdatePostTs, returnId } from '../interface';
import logger from '../utils/logger';
import * as modelPost from '../models/post';

import * as modelLike from '../models/like';

export const createPost = async ({
	text,
	image,
	hashTags,
	userId,
}: modelPostTs) => {
	try {
		const result = await modelPost.createPost({
			text,
			image,
			hashTags,
			userId,
		});

		if (!(result && result?.length !== 0 && result[0]?.id)) {
			throw Error('Post not created');
		}

		const id = result[0]?.id;

		await modelLike.createLike({ postId: id, count: 0 });

		return { ok: true, data: {} };
	} catch (e) {
		logger.error(`user : service : create : ${e}`);
		throw e;
	}
};

export const updatePost = async ({
	text,
	image,
	hashTags,
	id,
	userId,
}: modelupdatePostTs) => {
	try {
		const result = await modelPost.updatePost({
			text,
			image,
			hashTags,
			id,
			userId,
		});

		if (result !== 1) {
			throw Error('Post not updated');
		}

		return { ok: true, data: {} };
	} catch (e) {
		logger.error(`user : service : create : ${e}`);
		throw e;
	}
};

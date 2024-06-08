import { modelPostTs, returnId } from '../interface';
import logger from '../utils/logger';
import * as modelPost from '../models/post';

export const createPost = async ({
	text,
	image,
	hashTags,
	id,
}: modelPostTs) => {
	try {
		const result = await modelPost.createPost({ text, image, hashTags, id });
		console.log({ result });
		if (!(result && result?.length !== 0 && result[0]?.id)) {
			throw Error('Post not created');
		}

		return { ok: true, data: {} };
	} catch (e) {
		logger.error(`user : service : create : ${e}`);
		throw e;
	}
};

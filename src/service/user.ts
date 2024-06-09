import {
	createFollowerList,
	createUserTs,
	getUserTs,
	returnById,
	returnId,
	searchTextLimitTs,
	updateUserTs,
	viewLikeTs,
} from '../interface';
import { generateToken } from '../utils/jwtToken';
import logger from '../utils/logger';
import { hashPassword, verifyPassword } from '../utils/passwordEncription';
import * as modelUser from '../models/user';
import * as followList from '../models/followList';
import * as modelLikeView from '../models/likeView';

const createUser = async ({ mobile, email, password, name }: createUserTs) => {
	try {
		const securePassword = await hashPassword(password);
		const result = await modelUser.createUser({
			name,
			mobile,
			email,
			password: securePassword,
		});

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

const updateUser = async ({
	mobile,
	email,
	password,
	userId,
	name,
}: updateUserTs) => {
	try {
		const securePassword = password ? await hashPassword(password) : undefined;
		const result = await modelUser.updateUser({
			mobile,
			email,
			password: securePassword,
			userId,
			name,
		});

		if (!result || result?.length === 0 || !result[0]?.id) {
			throw new Error('Wrong Result');
		}

		const id = result[0]?.id;

		const token = generateToken({ id });

		return { ok: true, data: { token } };
	} catch (e) {
		logger.error(`user : service : get : ${e}`);
		throw e;
	}
};

const getUserByName = async ({
	searchText,
	page,
	pageSize,
}: searchTextLimitTs) => {
	try {
		const result = await modelUser.getUserByName({
			searchText,
			page,
			pageSize,
		});

		if (!result) {
			throw new Error('Not found');
		}

		return { ok: true, data: { ...result } };
	} catch (e) {
		logger.error(`user : service : get-user-by-name : ${e}`);
		throw e;
	}
};

const createFollowLIst = async ({ userList, userId }: createFollowerList) => {
	try {
		const promiseArray: Promise<returnId[]>[] = [];

		userList.forEach((uId: number) =>
			promiseArray.push(
				followList.createFollowList({
					fromUser: userId,
					toUser: uId,
				})
			)
		);

		await Promise.allSettled(promiseArray);

		return { ok: true, data: {} };
	} catch (e) {
		logger.error(`user : service : get-user-by-name : ${e}`);
		throw e;
	}
};

const updateLikeView = async ({ likeViewList, userId }: viewLikeTs) => {
	try {
		const promiseArray: Promise<number[]>[] = [];
		likeViewList.forEach(({ postId, isLiked, isViewed }) => {
			promiseArray.push(
				modelLikeView.updateLikeView({
					postId,
					userId,
					isLiked: isLiked ?? false,
					isViewed: isViewed ?? false,
				})
			);
		});

		await Promise.allSettled(promiseArray);

		return { ok: true, data: {} };
	} catch (e) {
		logger.error(`user : service : create-view-like : ${e}`);
		throw e;
	}
};

export {
	createUser,
	getUser,
	getUserByName,
	updateUser,
	createFollowLIst,
	updateLikeView,
};

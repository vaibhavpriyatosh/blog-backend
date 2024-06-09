import { modelPostTs, modelupdatePostTs, returnId } from '../interface';
import * as configuration from '../knexDb/knexfile';
import knex from 'knex';
import logger from '../utils/logger';

const connection = knex(configuration);

export const createPost = async ({
	text,
	image,
	hashTags,
	userId,
}: modelPostTs): Promise<returnId[]> => {
	try {
		const result = await connection('post')
			.insert({
				text,
				image,
				hash_tags: hashTags,
				created_by: userId,
				is_deleted: false,
			})
			.returning('id');
		return result;
	} catch (error: any) {
		logger.error(`post : model : create : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const updatePost = async ({
	text,
	image,
	hashTags,
	id,
	userId,
}: modelupdatePostTs): Promise<any> => {
	try {
		const result = await connection('post')
			.update({
				text,
				image,
				hash_tags: hashTags,
				updated_at: 'now()',
			})
			.where('id', id)
			.andWhere('created_by', userId);
		return result;
	} catch (error: any) {
		logger.error(`post : model : update : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const getPost = async ({
	userId,
	searchText,
	page,
	pageSize,
}: any): Promise<any> => {
	try {
		const offset = (page - 1) * pageSize;
		const query = connection('post as p')
			.leftJoin('follow_list as fl', function () {
				this.on('p.created_by', '=', 'fl.to_user').andOn(
					'fl.from_user',
					'=',
					userId
				);
			})
			.where('is_deleted', false)
			.orderByRaw(
				'CASE WHEN fl.to_user IS NOT NULL THEN 0 ELSE 1 END, p.created_at DESC'
			);

		if (searchText && searchText.trim().length > 0) {
			query
				.whereRaw('? = ANY (p.hash_tags)', searchText)
				.orWhere('p.text', 'like', `%${searchText}%`);
		}

		const totalCountQuery = await query
			.clone()
			.clearSelect()
			.clearOrder()
			.count('*')
			.first();
		const totalCount = Number(totalCountQuery?.count ?? 0);

		query
			.limit(pageSize)
			.offset(offset)
			.leftJoin('like_view as lv', function () {
				this.on('p.id', '=', 'lv.post_id').andOn('lv.user_id', '=', userId);
			})
			.select(
				'p.*',
				connection.raw('COALESCE(lv.is_liked, false) as is_liked'),
				connection.raw('COALESCE(lv.is_viewed, false) as is_viewed'),
				connection.raw(
					'CAST((SELECT COUNT(*) FROM like_view WHERE post_id = p.id AND is_liked = true) as INTEGER) as likeCount'
				),
				connection.raw(
					'CAST((SELECT COUNT(*) FROM like_view WHERE post_id = p.id AND is_viewed = true) as INTEGER) as viewCount'
				)
			);
		const posts = await query;
		return {
			posts,
			totalCount,
		};
	} catch (error: any) {
		logger.error(`post : model : get : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

export const deletePost = async ({ id, userId }: any) => {
	try {
		const query = connection('post as p')
			.update({
				is_deleted: false,
			})
			.where('id', id)
			.andWhere('created_by', userId);
		return query;
	} catch (error: any) {
		logger.error(`post : model : delete : ${error}`);
		throw error?.constraint ?? 'Something Went Wrong!!';
	}
};

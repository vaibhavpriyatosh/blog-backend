import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('like_view', (table) => {
		table.increments('id');
		table.integer('user_id').notNullable();
		table.integer('post_id').notNullable();
		table.boolean('is_liked').defaultTo(false);
		table.boolean('is_viewed').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		//relation to post
		table
			.foreign('post_id')
			.references('id')
			.inTable('post')
			.onDelete('CASCADE');

		table
			.foreign('user_id')
			.references('id')
			.inTable('user')
			.onDelete('CASCADE');

		table.unique(['user_id', 'post_id']);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('like_view');
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('like', (table) => {
		table.increments('id');
		table.integer('count');
		table.integer('post_id');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		//relation to post
		table
			.foreign('post_id')
			.references('id')
			.inTable('post')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('like');
}

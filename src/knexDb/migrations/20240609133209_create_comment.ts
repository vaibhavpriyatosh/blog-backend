import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('comments', (table) => {
		table.increments('id');
		table.integer('post_id').unsigned().notNullable();
		table.integer('user_id').unsigned().notNullable();
		table.integer('parent_id').unsigned().nullable();
		table.text('content').notNullable();
		table.boolean('is_deleted').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		// Setting up foreign key constraints
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
		table
			.foreign('parent_id')
			.references('id')
			.inTable('comments')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('comments');
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('follow_list', (table) => {
		table.increments('id');
		table.integer('from_user').unsigned().notNullable();
		table.integer('to_user').unsigned().notNullable();
		table.boolean('is_deleted').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		// Setting up the foreign key constraints
		table
			.foreign('from_user')
			.references('id')
			.inTable('user')
			.onDelete('CASCADE');
		table
			.foreign('to_user')
			.references('id')
			.inTable('user')
			.onDelete('CASCADE');

		table.unique(['from_user', 'to_user']);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('follow_list'); // Drops the 'follow_list' table
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('user', (table) => {
		table.increments('id');
		table.text('name');
		table.string('mobile').unique();
		table.string('email').unique();
		table.string('password').notNullable();
		table.boolean('is_deleted').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('user');
}

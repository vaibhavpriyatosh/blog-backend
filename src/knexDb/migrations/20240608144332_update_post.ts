import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('post', (table) => {
		table.dropColumn('created_by');
	});

	await knex.schema.alterTable('post', (table) => {
		table.integer('created_by').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('post', (table) => {
		table.dropColumn('created_by');
	});

	await knex.schema.alterTable('post', (table) => {
		table.string('created_by').notNullable();
	});
}

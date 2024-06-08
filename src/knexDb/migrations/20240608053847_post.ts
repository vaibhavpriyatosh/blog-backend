import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('post', (table) => {
		table.increments('id');
		table.text('text');
		table.text('image');
		table.specificType('hash_tags', 'text[]');
		table.boolean('is_deleted').defaultTo(false);
		table.string('created_by');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('post');
}

import { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("media", function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.enum("type", ["audio", "image"]);
    // @ts-ignore
    table.string("name", 255).notNullable().index("name_index", {
      indexTpe: "FULLTEXT",
      storageEngineIndexType: 'hash',
    }, );
    table.text("description");
    table.text("url");
    table.string("status").defaultTo('inactive');
    table.text("slug");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("deletedAt").nullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('media')
}


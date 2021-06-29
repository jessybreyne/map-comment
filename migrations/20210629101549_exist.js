
exports.up = function(knex) {
 return knex.schema.createTable('exist', function (table) {
    table.increments('id').primary();
    table.integer('created_by').notNullable();
    table.integer('id_location').notNullable();
    table.boolean('exist').notNullable();
    table.boolean('problem');
    table.string('problem_description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('exist');
};

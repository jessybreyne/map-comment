
exports.up = function(knex) {
 return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.integer('created_by').notNullable();
    table.integer('id_location').notNullable();
    table.integer('rating').notNullable();
    table.string('comment').notNullable();
    table.string('state').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};

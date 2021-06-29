
exports.up = function(knex) {
 return knex.schema.createTable('locations', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    table.string('state').notNullable();
    table.integer('created_by').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};

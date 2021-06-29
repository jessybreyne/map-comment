
exports.up = function(knex) {
 return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name');
    table.string('email').notNullable();
    table.string('password');
    table.timestamps(true, true);
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

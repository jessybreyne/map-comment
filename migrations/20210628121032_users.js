
exports.up = function(knex) {
 return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName');
    table.string('email').notNullable();
    table.string('password');
    table.timestamps(true, true);
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

const Knex = require("knex");

/**
 * @param {Knex} knex 
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
      t.text('id').notNullable()
      t.bigInteger('balance').defaultTo(0).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};

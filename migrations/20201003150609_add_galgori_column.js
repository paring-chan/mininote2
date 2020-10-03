const Knex = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.table('users', t => {
        t.bigInteger('galgories').defaultTo(0).notNullable()
    })
};


/**
 * @param {Knex} knex
 */
exports.down = function(knex) {
    return knex.schema.table('users', t => {
        t.dropColumn('galgories')
    })
};

const Knex = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.table('guilds', t => {
        t.json('warns').defaultTo('{}').notNullable()
    })
};


/**
 * @param {Knex} knex
 */
exports.down = function(knex) {
    return knex.schema.table('guilds', t => {
        t.dropColumn('warns')
    })
};

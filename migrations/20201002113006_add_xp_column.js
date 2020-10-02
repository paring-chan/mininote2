const Knex = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.table('users', t => {
        t.bigInteger('xp').defaultTo(0).notNullable()
        t.bigInteger('lastXp').nullable()
    })
};


/**
 * @param {Knex} knex
 */
exports.down = function(knex) {
    return knex.schema.table('users', t => {
        t.dropColumn('xp')
        t.dropColumn('lastXp')
    })
};

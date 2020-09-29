const Knex = require("knex");

const table = 'guilds'

/**
 * @param {Knex} knex 
 */
exports.up = function (knex) {
    return knex.schema.createTable(table, t => {
        t.text('id').notNullable()
        t.unique('id')
    })
}

/**
 * @param {Knex} knex 
 */
exports.down = function (knex) {
    return knex.schema.dropTable(table);
}
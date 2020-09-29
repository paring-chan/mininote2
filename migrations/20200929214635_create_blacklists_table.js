const Knex = require("knex");

const table = 'blacklists'

/**
 * @param {Knex} knex 
 */
exports.up = function (knex) {
    return knex.schema.createTable(table, t => {
        t.text('id').notNullable()
        t.text('reason').defaultTo('지정되지 않음').notNullable()
    })
}

/**
 * @param {Knex} knex 
 */
exports.down = function (knex) {
    return knex.schema.dropTable(table);
}
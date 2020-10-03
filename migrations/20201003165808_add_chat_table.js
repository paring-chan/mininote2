const Knex = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('chat', t => {
        t.string('id').notNullable()
        t.string('question').notNullable()
        t.string('response').notNullable()
    })
};


/**
 * @param {Knex} knex
 */
exports.down = function(knex) {
    return knex.schema.dropTable('chat')
};

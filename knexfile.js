// Update with your config settings.

module.exports = {

  development: {
    ...require('./config.json').database,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  staging: {
    ...require('./config.json').database,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  production: {
    ...require('./config.json').database,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};

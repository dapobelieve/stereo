require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.DB_URL,
    migrations: {
      directory: `./migrations`,
    },
    seeds: {
      directory: './seeds/data',
    },
  },
  staging: {
    client: 'mysql2',
    connection: process.env.DB_URL,
    pool: {
      min: 0,
      max: 10,
    },
    seeds: {
      directory: './seeds/data',
    },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DB_URL,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: `./migrations`,
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/data',
    },
  },
};

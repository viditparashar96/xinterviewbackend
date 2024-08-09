// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: any = {
  client: "pg",
  connection: {
    database: "url",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
  },
};

export default config;

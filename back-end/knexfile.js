/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://xoeewobb:pZ_tCe2mPmLm_d3p4Vf5aflvUfkNnGrz@mahmud.db.elephantsql.com/xoeewobb",
  DATABASE_URL_DEVELOPMENT = "postgres://pgvtceoo:sudn61KvlneWjnEnJ0LKLyX-M-v5O6Xb@mahmud.db.elephantsql.com/pgvtceoo",
  DATABASE_URL_TEST = "postgres://fekwzyik:30y4-z-voIKs2lSAAdKFzlweBX39Peem@mahmud.db.elephantsql.com/fekwzyik",
  DATABASE_URL_PREVIEW = "postgres://ifkwpexa:mDrw2Li4YEeJbZ9w0rN1dBVVHDcSyQjn@mahmud.db.elephantsql.com/ifkwpexa",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};

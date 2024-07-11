import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { dbConfig } from '../config';
import type { DB } from './db-types';
const pgTypes = require('pg').types;
const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: {
    rejectUnauthorized: false,
  },
});

const parseFn = function (val: unknown) {
  return new Date(val as string).toISOString();
};

const parseFnDate = function (val: unknown) {
  return val as string;
  //return val === null ? null : parseISO(val as string);
};

pgTypes.setTypeParser(pgTypes.builtins.TIMESTAMPTZ, parseFn);
pgTypes.setTypeParser(pgTypes.builtins.DATE, parseFnDate);

export const pgDB = new Kysely<DB>({
  log: ['query', 'error'],
  dialect: new PostgresDialect({
    pool: pool,
  }),
});

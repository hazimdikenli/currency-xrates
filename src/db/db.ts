import { Kysely, PostgresDialect, sql } from 'kysely'
import { Pool, types as pgTypes } from 'pg'
import type { DB } from './db-types'
import { dbConfig } from '../config'

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: false,
})

const parseFn = (val: unknown) => new Date(val as string).toISOString()


const parseFnDate = (val: unknown) => val as string

pgTypes.setTypeParser(pgTypes.builtins.TIMESTAMPTZ, parseFn)
pgTypes.setTypeParser(pgTypes.builtins.DATE, parseFnDate)

export const pgDB = new Kysely<DB>({
  log: ['query', 'error'],
  dialect: new PostgresDialect({
    pool: pool,
  }),
})

/**
 * Checks if the database connection is alive by performing a lightweight query
 * @returns Promise<boolean> - True if the database is responsive, false otherwise
 */
export async function checkDatabaseLiveness(): Promise<boolean> {
  try {
    // Perform a lightweight query to check the connection
    const res = await sql.raw<{ current_timestamp: Date }>('SELECT current_timestamp').execute(pgDB)
    return res.rows[0].current_timestamp !== undefined
  } catch (error) {
    console.error('Database liveness check failed:', error)
    return false // Connection is not alive
  }
}

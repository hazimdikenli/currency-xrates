import Elysia from 'elysia'
import { checkDatabaseLiveness } from '../db/db'

export const healthPlugin = new Elysia()
  .get('/health/ready', () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  })
  .get('/health/live', async () => {
    const status = (await checkDatabaseLiveness()) ? 'ok' : 'down'
    return {
      status,
      timestamp: new Date().toISOString(),
    }
  })

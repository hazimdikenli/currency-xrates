import Elysia from 'elysia'
import { checkDatabaseLiveness } from '../db/db'

export const healthPlugin = new Elysia().group('health', { detail: { tags: ['Health'] } }, app =>
  app
    .get('/ready', () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
      }
    })
    .get('/live', async () => {
      const status = (await checkDatabaseLiveness()) ? 'ok' : 'down'
      return {
        status,
        timestamp: new Date().toISOString(),
      }
    })
)

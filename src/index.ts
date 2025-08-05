import { logger } from '@bogeychan/elysia-logger'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { loggerConfig } from './config'
import { cronConfig } from './cron-jobs'
import { createIoCContainer } from './ioc-container'
import { healthPlugin } from './plugins/health'
import { rateRoutes } from './routes/rates'
import { conversionRoutes } from './routes/conversion'

const ioCContainer = createIoCContainer()

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      level: loggerConfig.level,
    })
  )
  .use(cronConfig(ioCContainer))
  .get('/', () => 'This is Elysia from bun.js, you may want to try /swagger endpoint')
  // reflect back request headers
  .get('/ping', ({ request }) => {
    return {
      greeting: 'This is Elysia from bun.js',
      date: new Date(),
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
    }
  })
  .use(swagger())
  .use(healthPlugin)
  .use(rateRoutes(ioCContainer))
  .use(conversionRoutes(ioCContainer))
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
console.info(`🦊 Check out API Documentation at:`, app.server?.url.href + `swagger`)

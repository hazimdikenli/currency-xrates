import { logger } from '@bogeychan/elysia-logger'
import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import createHttpError from 'http-errors'
import { loggerConfig } from './config'
import { checkDatabaseLiveness } from './db/db'
import { XRateRepository } from './db/xrate-repository'
import { createIoCContainer } from './ioc-container'
import { CurrencyConversionService } from './services/currency-conversion/currency-conversion.service'
import { EcbXRateService } from './services/ecb/ecb-xrates-service'
import { KznbXRateService } from './services/kznb/kznb-xrates-service'
import { TcmbXRateService } from './services/tcmb/tcmb-xrates-service'
import { cronConfig } from './cron-jobs'

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
  .use(cronConfig)
  .get('/', () => 'This is Elysia from bun.js, you may want to try /swagger endpoint')
  .use(swagger())
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
  .get(
    '/rates',
    async ({ query: { date, 'currency-code': currency_code } }) => {
      console.log('date:', date, 'currencyCode:', currency_code)
      if (!date && !currency_code) {
        throw createHttpError(400, 'either date or currency-code are required')
      }
      const xRateRepository = ioCContainer.getService<XRateRepository>(XRateRepository.name)
      return xRateRepository.findMany({
        exchange_date: date,
        currency_code,
      })
    },
    {
      query: t.Object({
        date: t.Optional(
          t.String({
            description: 'Date in format YYYY-MM-DD',
            default: new Date().toISOString().split('T')[0],
          })
        ),
        'currency-code': t.Optional(t.String({ description: 'ISO Currency Code, CAD USD EUR' })),
      }),
    }
  )
  .post(
    '/rates/ecb/daily',
    async ({ query: { date } }) => {
      const service = ioCContainer.getService<EcbXRateService>(EcbXRateService.name)
      return service.downloadDailyRates(date)
    },
    {
      query: t.Object({
        date: t.String({
          description: 'Date in format YYYY-MM-DD',
          default: new Date().toISOString().split('T')[0],
        }),
      }),
    }
  )
  .post(
    '/rates/tcmb/daily',
    async ({ query: { date } }) => {
      const service = ioCContainer.getService<TcmbXRateService>(TcmbXRateService.name)
      return service.downloadDailyRates(date)
    },
    {
      query: t.Object({
        date: t.String({
          description: 'Date in format YYYY-MM-DD',
          default: new Date().toISOString().split('T')[0],
        }),
      }),
    }
  )
  .post(
    '/rates/kznb/daily',
    async ({ query: { date } }) => {
      const service = ioCContainer.getService<KznbXRateService>(KznbXRateService.name)
      return service.downloadDailyRates(date)
    },
    {
      query: t.Object({
        date: t.String({
          description: 'Date in format YYYY-MM-DD',
          default: new Date().toISOString().split('T')[0],
        }),
      }),
    }
  )
  .get(
    '/convert-currency',
    async ({ query: { amount, fromCC, date, toCC, exchangeType = '' } }) => {
      const service = ioCContainer.getService<CurrencyConversionService>(
        CurrencyConversionService.name
      )
      return service.convert({
        amount: Number(amount),
        fromCC,
        date,
        toCC,
        exchangeType,
      })
    },
    {
      query: t.Object({
        date: t.String({
          description: 'Date in format YYYY-MM-DD',
          default: new Date().toISOString().split('T')[0],
        }),
        amount: t.Numeric({ default: 1 }),
        fromCC: t.String({ description: 'ISO Currency Code, CAD USD EUR' }),
        toCC: t.String({ description: 'ISO Currency Code, CAD USD EUR' }),
        exchangeType: t.Optional(t.String({ description: 'Exchange type, TCMB, ECB, KZNB' })),
      }),
    }
  )
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)

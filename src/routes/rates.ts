import { Elysia, t } from 'elysia'
import createHttpError from 'http-errors'
import { XRateRepository } from '../db/xrate-repository'
import { IoCContainer } from '../ioc-container'
import { CurrencyConversionService } from '../services/currency-conversion/currency-conversion.service'
import { EcbXRateService } from '../services/ecb/ecb-xrates-service'
import { KznbXRateService } from '../services/kznb/kznb-xrates-service'
import { TcmbXRateService } from '../services/tcmb/tcmb-xrates-service'

export const rateRoutes = (ioCContainer: IoCContainer) =>
  new Elysia()
    .get(
      '/rates',
      async ({ query: { date, 'currency-code': currency_code } }) => {
        console.log('date:', date, 'currencyCode:', currency_code)
        if (!date && !currency_code) {
          throw createHttpError(400, 'either date or currency-code are required')
        }
        const xRateRepository = ioCContainer.get<XRateRepository>(XRateRepository.name)
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
    .get('/rates/ecb/daily', async () => {
      const service = ioCContainer.get<EcbXRateService>(EcbXRateService.name)
      return service.downloadDailyRates()
    })
    .get(
      '/rates/tcmb/download-specific-date',
      async ({ query: { date } }) => {
        const service = ioCContainer.get<TcmbXRateService>(TcmbXRateService.name)
        return service.downloadSpecificDate(date)
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
    .get('/rates/tcmb/daily', async () => {
      const service = ioCContainer.get<TcmbXRateService>(TcmbXRateService.name)
      return service.downloadDailyRates()
    })
    .get(
      '/rates/kznb/daily',
      async ({ query: { date } }) => {
        const service = ioCContainer.get<KznbXRateService>(KznbXRateService.name)
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
        const service = ioCContainer.get<CurrencyConversionService>(CurrencyConversionService.name)
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

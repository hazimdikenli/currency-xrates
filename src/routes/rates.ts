import { Elysia, t } from 'elysia'
import createHttpError from 'http-errors'
import { XRateRepository } from '../db/xrate-repository'
import { IoCContainer } from '../ioc-container'
import { EcbXRateService } from '../services/ecb/ecb-xrates-service'
import { KznbXRateService } from '../services/kznb/kznb-xrates-service'
import { TcmbXRateService } from '../services/tcmb/tcmb-xrates-service'

export const rateRoutes = (ioCContainer: IoCContainer) =>
  new Elysia().group('rates', { detail: { tags: ['Rates'] } }, app =>
    app
      .get(
        '',
        async ({ query: { date, 'currency-code': currency_code } }) => {
          console.log('date:', date, 'currencyCode:', currency_code)
          if (!date && !currency_code) {
            throw createHttpError(400, 'either date or currency-code are required')
          }
          const xRateRepository = ioCContainer.get<XRateRepository>(XRateRepository.name)
          return xRateRepository.findMany({ exchange_date: date, currency_code })
        },
        {
          query: t.Object({
            date: t.Optional(
              t.String({
                description: 'Date in format YYYY-MM-DD',
                default: new Date().toISOString().split('T')[0],
              })
            ),
            'currency-code': t.Optional(
              t.String({ description: 'ISO Currency Code, CAD USD EUR' })
            ),
          }),
        }
      )
      .get('/ecb/daily', async () => {
        const service = ioCContainer.get<EcbXRateService>(EcbXRateService.name)
        return service.downloadDailyRates()
      })
      .get(
        '/tcmb/download-specific-date',
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
      .get('/tcmb/daily', async () => {
        const service = ioCContainer.get<TcmbXRateService>(TcmbXRateService.name)
        return service.downloadDailyRates()
      })
      .get(
        '/kznb/daily',
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
  )
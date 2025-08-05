import { Elysia, t } from 'elysia'
import { IoCContainer } from '../ioc-container'
import { CurrencyConversionService } from '../services/currency-conversion/currency-conversion.service'

export const conversionRoutes = (ioCContainer: IoCContainer) =>
  new Elysia().group('conversion', { detail: { tags: ['Conversion'] } }, app =>
    app.get(
      '/convert-currency',
      async ({ query: { amount, fromCC, date, toCC, exchangeType = '' } }) => {
        const service = ioCContainer.get<CurrencyConversionService>(CurrencyConversionService.name)
        return service.convert({ amount: Number(amount), fromCC: fromCC.toUpperCase(), date, toCC: toCC.toUpperCase(), exchangeType })
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
  )

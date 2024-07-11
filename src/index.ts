import { Elysia, t } from 'elysia';
import { logger } from '@bogeychan/elysia-logger';
import { createIoCContainer } from './ioc-container';
import swagger from '@elysiajs/swagger';
import createHttpError from 'http-errors';
import { XRateRepository } from './db/xrate-repository';
import { EcbXRateService } from './services/ecb/ecb-xrates-service';
import { TcmbXRateService } from './services/tcmb/tcmb-xrates-service';

const ioCContainer = createIoCContainer();

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      level: 'debug',
    })
  )
  .use(swagger())
  .get('/', () => 'Hello Elysia')

  .get(
    '/rates',
    async ({ query: { date, 'currency-code': currency_code } }) => {
      console.log('date:', date, 'currencyCode:', currency_code);
      if (!date && !currency_code) {
        throw createHttpError(400, 'either date or currency-code are required');
      }
      const xRateRepository = ioCContainer.getService<XRateRepository>(XRateRepository.name);
      return xRateRepository.findMany({
        exchange_date: date,
        currency_code,
      });
    },
    {
      query: t.Object({
        date: t.Optional(
          t.String({
            description: 'Date in format YYYY-MM-DD',
          })
        ),
        'currency-code': t.Optional(t.String({ description: 'ISO Currency Code, CAD USD EUR' })),
      }),
    }
  )
  .post(
    '/rates/ecb/daily',
    async ({ query: { date } }) => {
      const service = ioCContainer.getService<EcbXRateService>(EcbXRateService.name);
      return service.downloadDailyRates(date);
    },
    {
      query: t.Object({
        date: t.String({ description: 'Date in format YYYY-MM-DD' }),
      }),
    }
  )
  .post(
    '/rates/tcmb/daily',
    async ({ query: { date } }) => {
      const service = ioCContainer.getService<TcmbXRateService>(TcmbXRateService.name);
      return service.downloadDailyRates(date);
    },
    {
      query: t.Object({
        date: t.String({ description: 'Date in format YYYY-MM-DD' }),
      }),
    }
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

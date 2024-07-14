import { Elysia } from 'elysia'
import { cron } from '@elysiajs/cron'
import { createIoCContainer } from './ioc-container'
import { TcmbXRateService } from './services/tcmb/tcmb-xrates-service'

const ioCContainer = createIoCContainer()

export const cronConfig = new Elysia()
  // .use(
  //   cron({
  //     name: 'heartbeat',
  //     pattern: '*/10 * * * * *',
  //     run() {
  //       console.log('Heartbeat')
  //     },
  //   })
  // )
  .use(
    cron({
      name: 'tcmb-xrates',
      pattern: '33 15 * * 1-5',
      run() {
        console.log('TCMB')
        ioCContainer
          .getService<TcmbXRateService>(TcmbXRateService.name)
          .downloadDailyRates(new Date().toISOString().split('T')[0])
      },
    })
  )

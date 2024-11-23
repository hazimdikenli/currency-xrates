import { cron } from '@elysiajs/cron'
import { Elysia } from 'elysia'
import { IoCContainer } from './ioc-container'
import { TcmbXRateService } from './services/tcmb/tcmb-xrates-service'
import { EcbXRateService } from './services/ecb/ecb-xrates-service'
import { KznbXRateService } from './services/kznb/kznb-xrates-service'

export const cronConfig = (ioCContainer: IoCContainer) =>
  new Elysia()
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
        pattern: '33 15 * * *',
        run() {
          console.log('TCMB')
          ioCContainer.get<TcmbXRateService>(TcmbXRateService.name).downloadDailyRates()
        },
      })
    )
    .use(
      cron({
        name: 'ecb-xrates',
        pattern: '0 15 * * *',
        run() {
          console.log('ECB')
          ioCContainer.get<EcbXRateService>(EcbXRateService.name).downloadDailyRates()
        },
      })
    )
    .use(
      cron({
        name: 'kznb-xrates',
        pattern: '0 12 * * *',
        run() {
          console.log('KZNB')
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          ioCContainer
            .get<KznbXRateService>(KznbXRateService.name)
            .downloadDailyRates(tomorrow.toISOString().split('T')[0])
        },
      })
    )

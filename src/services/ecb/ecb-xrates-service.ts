import { CurrencyExchangeRateCreate } from '../../db/db-types'
import parseEcbDailyRatesXml from './ecb-xrates'
import { EcbXRatesDownloader } from './ecb-xrates-downloader'
import { XRateRepository } from '../../db/xrate-repository'

export class EcbXRateService {
  constructor(
    private xrateRepository: XRateRepository,
    private ecbXRatesDownloader: EcbXRatesDownloader
  ) {}

  async downloadDailyRates(date: string) {
    const xml = await this.ecbXRatesDownloader.downloadXML()

    const dailyRates = await parseEcbDailyRatesXml(xml)
    if (!dailyRates) throw new Error(`Failed to parse XML: ${xml}`)
    if (dailyRates.date !== date) throw new Error(`Invalid date: ${date}`)

    const rates: CurrencyExchangeRateCreate[] = dailyRates.rates.map(({ currency, rate }) => ({
      amount: 1,
      currency_code: 'EUR',
      exchange_date: date,
      exchange_type: 'ECB',
      target_amount: Number(rate),
      target_currency_code: currency,
    }))
    await this.xrateRepository.createAll(rates)
  }
}

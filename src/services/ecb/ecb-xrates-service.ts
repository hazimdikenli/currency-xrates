import { CurrencyExchangeRateCreate } from '../../db/db-types'
import parseEcbDailyRatesXml from './ecb-xrates'
import { EcbXRatesDownloader } from './ecb-xrates-downloader'
import { XRateRepository } from '../../db/xrate-repository'

export class EcbXRateService {
  constructor(
    private xrateRepository: XRateRepository,
    private ecbXRatesDownloader: EcbXRatesDownloader
  ) {}

  async downloadDailyRates() {
    const xml = await this.ecbXRatesDownloader.downloadXML()

    const dailyRates = await parseEcbDailyRatesXml(xml)
    if (!dailyRates) throw new Error(`Failed to parse XML: ${xml}`)
    const date = new Date(dailyRates.date)
    date.setDate(date.getDate() + 1)
    const exchange_date = date.toISOString().split('T')[0]

    const rates: CurrencyExchangeRateCreate[] = dailyRates.rates.map(({ currency, rate }) => ({
      amount: 1,
      currency_code: 'EUR',
      exchange_date,
      exchange_type: 'ECB',
      target_amount: Number(rate),
      target_currency_code: currency,
    }))
    await this.xrateRepository.createAll(rates)
  }
}

import { TcmbXRatesDownloader } from './tcmb-xrates-downloader'
import parseTcmbDailyKurlarXML from './tcmb-xrates-parser'
import { XRateRepository } from '../../db/xrate-repository'

export class TcmbXRateService {
  constructor(
    private xrateRepository: XRateRepository,
    private ratesDownloader: TcmbXRatesDownloader
  ) {}

  async downloadDailyRates() {
    const xml = await this.ratesDownloader.downloadXML()

    const { exchangeRates } = await parseTcmbDailyKurlarXML(xml)
    if (!exchangeRates) throw new Error(`Failed to parse XML: ${xml}`)

    const today = new Date()

    // if today is friday, we need to save for three days
    let daysToSave = 1
    if (today.getDay() === 5) {
      daysToSave = 3
      console.log('saving for three days')
    }
    for (let i = 1; i <= daysToSave; i++) {
      const dateToSave = today
      dateToSave.setDate(dateToSave.getDate() + i)
      const exchange_date = dateToSave.toISOString().split('T')[0]
      const rates = exchangeRates.map(f => ({ ...f, exchange_date }))
      await this.xrateRepository.createAll(rates)
    }
  }
  // try to get a specific date
  async downloadSpecificDate(dateAsIso: string) {
    const date = new Date(dateAsIso)
    // we need to go back one day, as turkish rates are declared on the previous day
    date.setDate(date.getDate() - 1)
    // it the day is on weekend we need to go back to friday
    if (date.getDay() === 6) {
      date.setDate(date.getDate() - 1)
    } else if (date.getDay() === 0) {
      date.setDate(date.getDate() - 2)
    }
    const xml = await this.ratesDownloader.downloadXMLForSpecificDate(
      date.toISOString().split('T')[0]
    )

    const { exchangeRates, tarihDate } = await parseTcmbDailyKurlarXML(xml)
    if (!exchangeRates) throw new Error(`Failed to parse XML: ${xml}`)
    const [day, month, year] = tarihDate.Tarih.split('.')
    // const downloadedDate = `${year}-${month}-${day}`
    const downloadedDate = new Date(`${year}-${month}-${day}`)

    // if it is saturday
    let daysToSave = 1
    if (downloadedDate.getDay() === 6) {
      daysToSave = 3
    }
    for (let i = 0; i < daysToSave; i++) {
      const dateToSave = new Date(`${year}-${month}-${day}`)
      dateToSave.setDate(dateToSave.getDate() + i)
      const exchange_date = dateToSave.toISOString().split('T')[0]
      const rates = exchangeRates.map(f => ({ ...f, exchange_date }))
      await this.xrateRepository.createAll(rates)
    }
  }
}

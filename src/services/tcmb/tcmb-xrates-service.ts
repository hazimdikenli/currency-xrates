import { IoCContainer } from '../../ioc-container'
import { TcmbXRatesDownloader } from './tcmb-xrates-downloader'
import parseTcmbDailyKurlarXML from './tcmb-xrates-parser'
import { XRateRepository } from '../../db/xrate-repository'

export class TcmbXRateService {
  constructor(
    private xrateRepository: XRateRepository,
    private ratesDownloader: TcmbXRatesDownloader
  ) {}

  async downloadDailyRates(date: string) {
    const xml = await this.ratesDownloader.downloadXML()

    const { currencies, exchangeRates, tarihDate } = await parseTcmbDailyKurlarXML(xml)
    if (!exchangeRates) throw new Error(`Failed to parse XML: ${xml}`)
    const [day, month, year] = tarihDate.Tarih.split('.')
    // const downloadedDate = `${year}-${month}-${day}`
    let downloadedDate = new Date(`${year}-${month}-${day}`)
    // go to next day
    downloadedDate.setDate(downloadedDate.getDate() + 1)
    if (downloadedDate.toISOString().split('T')[0] !== date)
      throw new Error(`Invalid date: requested ${date} , received: ${downloadedDate}`)

    // if it is saturday
    let daysToSave = 1
    if (downloadedDate.getDay() === 6) {
      daysToSave = 3
      console.log('saving for three days')
    }
    for (let i = 0; i < daysToSave; i++) {
      let dateToSave = new Date(`${year}-${month}-${day}`)
      dateToSave.setDate(dateToSave.getDate() + i)
      const exchange_date = dateToSave.toISOString().split('T')[0]
      const rates = exchangeRates.map(f => ({
        ...f,
        exchange_date,
      }))
      await this.xrateRepository.createAll(rates)
    }
  }
}

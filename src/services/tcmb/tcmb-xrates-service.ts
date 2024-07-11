import { IoCContainer } from '../../ioc-container';
import { TcmbXRatesDownloader } from './tcmb-xrates-downloader';
import parseTcmbDailyKurlarXML from './tcmb-xrates-parser';
import { XRateRepository } from '../../db/xrate-repository';

export class TcmbXRateService {
  constructor(private xrateRepository: XRateRepository, private ratesDownloader: TcmbXRatesDownloader) {}

  async downloadDailyRates(date: string) {
    const xml = await this.ratesDownloader.downloadXML();

    const { currencies, exchangeRates, tarihDate } = await parseTcmbDailyKurlarXML(xml);
    if (!exchangeRates) throw new Error(`Failed to parse XML: ${xml}`);
    const [day, month, year] = tarihDate.Tarih.split('.');
    const downloadedDate = `${year}-${month}-${day}`;
    if (downloadedDate !== date) throw new Error(`Invalid date: requested ${date} , received: ${downloadedDate}`);

    const rates = exchangeRates.map((f) => ({
      ...f,
      exchange_date: date,
    }));
    await this.xrateRepository.createAll(rates);
  }
}


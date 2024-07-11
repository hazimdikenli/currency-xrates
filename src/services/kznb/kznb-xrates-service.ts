import { IoCContainer } from '../../ioc-container';
import { XRateRepository } from '../../db/xrate-repository';
import { KznbXRatesDownloader } from './kznb-xrates-downloader';
import parseKznbRatesXML from './kznb-xrates-parser';
import { CurrencyExchangeRate, CurrencyExchangeRateCreate } from '../../db/db-types';

const ExchangeType = 'KZNB';
export class KznbXRateService {
  constructor(private xrateRepository: XRateRepository, private ratesDownloader: KznbXRatesDownloader) {}

  async downloadDailyRates(dateToDownload: string) {
    const xml = await this.ratesDownloader.downloadXML(dateToDownload);

    const { date, rates: exchangeRates } = await parseKznbRatesXML(xml);
    if (!exchangeRates) throw new Error(`Failed to parse XML: ${xml}`);
    const [day, month, year] = date.split('.');
    const downloadedDate = `${year}-${month}-${day}`;
    if (downloadedDate !== dateToDownload) throw new Error(`Invalid date: requested ${dateToDownload} , received: ${downloadedDate}`);

    const rates: CurrencyExchangeRateCreate[] = exchangeRates.map(({ rate, currency_code, amount }) => ({
      amount,
      currency_code,
      target_amount: rate,
      target_currency_code: 'KZT',
      exchange_type: 'KZNB',
      exchange_date: dateToDownload,
    }));
    await this.xrateRepository.createAll(rates);
  }
}

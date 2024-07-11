import { IoCContainer } from '../../ioc-container';

const TCMB_DAILY_RATES_URL = 'https://www.tcmb.gov.tr/kurlar/today.xml';

export class TcmbXRatesDownloader {
  async downloadXML(): Promise<string> {
    try {
      const response = await fetch(TCMB_DAILY_RATES_URL);
      if (!response.ok) {
        throw new Error(`Failed to download XML: ${response.statusText}`);
      }
      return await response.text();
    } catch (error: unknown) {
      throw new Error(`Failed to download XML: ${error}`);
    }
  }
}
export default (container: IoCContainer) => {
  container.service(TcmbXRatesDownloader.name, (c) => new TcmbXRatesDownloader());
};

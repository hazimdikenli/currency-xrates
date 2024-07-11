// URL to download the ECB exchange rates XML
const ECB_DAILY_RATES_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

export class EcbXRatesDownloader {
  async downloadXML(): Promise<string> {
    try {
      const response = await fetch(ECB_DAILY_RATES_URL);
      if (!response.ok) {
        throw new Error(`Failed to download XML: ${response.statusText}`);
      }
      return await response.text();
    } catch (error: unknown) {
      throw new Error(`Failed to download XML: ${error}`);
    }
  }
}

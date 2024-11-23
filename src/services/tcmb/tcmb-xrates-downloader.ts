const TCMB_DAILY_RATES_URL = 'https://www.tcmb.gov.tr/kurlar/today.xml'

export class TcmbXRatesDownloader {
  async downloadXML(): Promise<string> {
    try {
      const response = await fetch(TCMB_DAILY_RATES_URL)
      if (!response.ok) {
        throw new Error(`Failed to download XML: ${response.statusText}`)
      }
      return await response.text()
    } catch (error: unknown) {
      throw new Error(`Failed to download XML: ${error}`)
    }
  }
  async downloadXMLForSpecificDate(date: string): Promise<string> {
    const [year, month, day] = date.split('-')

    // https://www.tcmb.gov.tr/kurlar/202411/22112024.xml
    const url = `https://www.tcmb.gov.tr/kurlar/${year}${month}/${day}${month}${year}.xml`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to download XML: ${response.statusText}`)
      }
      return await response.text()
    } catch (error: unknown) {
      throw new Error(`Failed to download XML: ${error}`)
    }
  }
}

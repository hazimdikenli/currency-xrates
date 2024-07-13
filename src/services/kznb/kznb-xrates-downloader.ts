export class KznbXRatesDownloader {
  async downloadXML(date: string): Promise<string> {
    const url =
      'https://nationalbank.kz/rss/get_rates.cfm?fdate=' + new Date(date).toLocaleDateString('tr')
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

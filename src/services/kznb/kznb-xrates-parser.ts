import { parseStringPromise } from 'xml2js'

interface Rate {
  currency_name: string
  currency_code: string
  rate: number
  amount: number
}

interface Rates {
  // generator: string;
  // title: string;
  // link: string;
  // description: string;
  // copyright: string;
  date: string
  rates: Rate[]
}

async function parseKznbRatesXML(xmlData: string) {
  try {
    const result = await parseStringPromise(xmlData, { explicitArray: false })

    const ratesData: Rates = {
      date: result.rates.date,
      rates: result.rates.item.map((item: any) => ({
        currency_name: item.fullname,
        currency_code: item.title,
        rate: parseFloat(item.description),
        amount: parseInt(item.quant, 10),
      })),
    }

    return ratesData
  } catch (error) {
    console.error('Error parsing XML:', error)
    throw error
  }
}

export default parseKznbRatesXML

import { expect, test, describe } from 'bun:test'
import assert from 'node:assert'
import parseKznbRatesXML from './kznb-xrates-parser'

describe('kznb-xrates', () => {
  test('test tcmb-xrates', async () => {
    const result = await parseKznbRatesXML(xmlString)
    assert(result !== undefined)
    assert(result.date === '06.05.2024')
    assert(result.rates?.length)
    const rates = result.rates
    assert(rates[0].currency_code === 'AUD')
    assert(rates[0].rate === 291.85)
    assert(rates[0].amount === 1)
    assert(rates[1].currency_code === 'IRR')
    assert(rates[1].rate === 10.5)
    assert(rates[1].amount === 1000)
    //     console.log('TarihDate:', result.date);
    //     console.log('Currencies:', result.rates);
  })
})

var xmlString = `<?xml version="1.0" encoding="utf-8"?>
<rates>
        <generator>Alternate RSS Builder</generator>
        <title>Official exchange rates of National Bank of Republic Kazakhstan</title>
        <link>www.nationalbank.kz</link>
        <description>Official exchange rates of National Bank of Republic Kazakhstan</description>
        <copyright>www.nationalbank.kz</copyright>
        <date>06.05.2024</date>

        <item>
                <fullname>АВСТРАЛИЙСКИЙ ДОЛЛАР</fullname>
                <title>AUD</title>
                <description>291.85</description>
                <quant>1</quant>
                <index></index>
                <change>0.00</change>
        </item>
        <item>
                <fullname>ИРАНСКИЙ РИАЛ</fullname>
                <title>IRR</title>
                <description>10.5</description>
                <quant>1000</quant>
                <index></index>
                <change>0.00</change>
        </item>
</rates>
`

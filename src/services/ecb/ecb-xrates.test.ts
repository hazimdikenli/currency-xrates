import { expect, test, describe } from 'bun:test';
import parseEcbDailyRatesXml from './ecb-xrates';

describe('ecb-xrates', () => {
  test('test ecb-xrates', async () => {
    const result = await parseEcbDailyRatesXml(xmlString);
    expect(result).toBeDefined();
    expect(result.date).toEqual('2024-05-22');
    expect(result.rates).toBeArray();
    expect(result.rates).toContainEqual({
      currency: 'USD',
      rate: '1.0729',
    });
    // console.log('Result:', result);
  });
});

var xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
	<gesmes:subject>Reference rates</gesmes:subject>
	<gesmes:Sender>
		<gesmes:name>European Central Bank</gesmes:name>
	</gesmes:Sender>
	<Cube>
		<Cube time='2024-05-22'>
			<Cube currency='USD' rate='1.0729'/>
			<Cube currency='JPY' rate='173.31'/>
			<Cube currency='BGN' rate='1.9558'/>
			<Cube currency='TRY' rate='35.0707'/>
		</Cube>
	</Cube>
</gesmes:Envelope>`;

import { parseStringPromise } from 'xml2js';

interface Currency {
  currencyCode: string;
  currencyNameEn: string;
  currencyNameTr: string;
}

interface ExchangeRate {
  currency_code: string;
  amount: number;
  target_currency_code: string;
  target_amount: number;
  exchange_type: string;
}

interface TarihDateAttributes {
  Tarih: string;
  Date: string;
  Bulten_No: string;
}
export enum TcmbExchangeType {
  ForexBuying = 'TCMB.FB',
  ForexSelling = 'TCMB.FS',
  BanknoteBuying = 'TCMB.BB',
  BanknoteSelling = 'TCMB.BS',
  CrossRate = 'TCMB.CR',
}

async function parseTcmbDailyKurlarXML(xmlData: string) {
  try {
    const result = await parseStringPromise(xmlData);

    const tarihDate: TarihDateAttributes = {
      Tarih: result.Tarih_Date.$.Tarih,
      Date: result.Tarih_Date.$.Date,
      Bulten_No: result.Tarih_Date.$.Bulten_No,
    };

    const currencies: Currency[] = result.Tarih_Date.Currency.map((currency: any) => ({
      currencyCode: currency.$.CurrencyCode,
      currencyNameEn: currency.CurrencyName[0],
      currencyNameTr: currency.Isim[0],
    }));

    const exchangeRates: ExchangeRate[] = result.Tarih_Date.Currency.flatMap((currency: any) => {
      const currencyCode = currency.$.CurrencyCode;
      const sourceAmount = parseFloat(currency.Unit[0]);

      const rates = [
        {
          currency_code: currencyCode,
          amount: sourceAmount,
          target_currency_code: 'TRY',
          target_amount: parseFloat(currency.ForexBuying[0]),
          exchange_type: TcmbExchangeType.ForexBuying,
        },
        {
          currency_code: currencyCode,
          amount: sourceAmount,
          target_currency_code: 'TRY',
          target_amount: parseFloat(currency.ForexSelling[0]),
          exchange_type: TcmbExchangeType.ForexSelling,
        },
        {
          currency_code: currencyCode,
          amount: sourceAmount,
          target_currency_code: 'TRY',
          target_amount: parseFloat(currency.BanknoteBuying[0]),
          exchange_type: TcmbExchangeType.BanknoteBuying,
        },
        {
          currency_code: currencyCode,
          amount: sourceAmount,
          target_currency_code: 'TRY',
          target_amount: parseFloat(currency.BanknoteSelling[0]),
          exchange_type: TcmbExchangeType.BanknoteSelling,
        },
      ];

      // Add cross rates if they exist
      if (currency.CrossRateUSD && currency.CrossRateUSD[0]) {
        rates.push({
          currency_code: 'USD',
          amount: 1,
          target_currency_code: currencyCode,
          target_amount: parseFloat(currency.CrossRateUSD[0]),
          exchange_type: TcmbExchangeType.CrossRate,
        });
      }
      if (currency.CrossRateOther && currency.CrossRateOther[0]) {
        rates.push({
          currency_code: currencyCode,
          amount: 1,
          target_currency_code: currencyCode === 'USD' ? 'EUR' : 'USD',
          target_amount: parseFloat(currency.CrossRateOther[0]),
          exchange_type: TcmbExchangeType.CrossRate,
        });
      }

      return rates.filter((rate) => !isNaN(rate.target_amount)); // Filter out any NaN values
    });

    // console.log('Tarih_Date Attributes:', tarihDate);
    // console.log('Currencies:', currencies);
    // console.log('Exchange Rates:', exchangeRates);
    return {
      tarihDate,
      currencies,
      exchangeRates,
    };
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw error;
  }
}

export default parseTcmbDailyKurlarXML;

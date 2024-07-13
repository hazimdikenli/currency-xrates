import { expect, test, describe, beforeEach, mock } from 'bun:test';
import { CurrencyConversionService } from './currency-conversion.service';
import { CurrencyExchangeRate } from '../../db/db-types';

class XRateRepositoryStub {
  async findMany(criteria: any): Promise<CurrencyExchangeRate[]> {
    return [
      {
        amount: 1,
        currency_code: 'TRY',
        target_amount: '12.345',
        target_currency_code: 'USD',
        exchange_date: '2020-01-01',
        exchange_type: 'X1',
      } as CurrencyExchangeRate,
      {
        amount: 1,
        currency_code: 'TRY',
        target_amount: '2',
        target_currency_code: 'ABC',
        exchange_date: '2020-01-01',
        exchange_type: 'X1',
      } as CurrencyExchangeRate,
    ];
  }
}

describe('currency-conversion', () => {
  test('test xact match currency-conversion', async () => {
    let currencyConversionService = new CurrencyConversionService(new XRateRepositoryStub());
    const resp = await currencyConversionService.convert({ amount: 10, fromCC: 'TRY', dateAsIso: '2020-01-01', toCC: 'USD', exchangeType: 'X1' });
    expect(resp).toEqual(123.45);
  });
  test('test xact match currency-conversion in reverse order', async () => {
    let currencyConversionService = new CurrencyConversionService(new XRateRepositoryStub());
    const resp = await currencyConversionService.convert({ amount: 12.345, fromCC: 'USD', dateAsIso: '2020-01-01', toCC: 'TRY', exchangeType: 'X1' });
    expect(resp).toEqual(1);
  });
  test('test match through common currency in 2 different currency entries', async () => {
    let currencyConversionService = new CurrencyConversionService(new XRateRepositoryStub());
    const resp = await currencyConversionService.convert({ amount: 2, fromCC: 'ABC', dateAsIso: '2020-01-01', toCC: 'USD', exchangeType: 'X1' });
    expect(resp).toEqual(12.345);
  });
});

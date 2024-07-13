import { CurrencyExchangeRateDto, XRateRepository } from '../../db/xrate-repository';
import { TcmbExchangeType } from '../tcmb/tcmb-xrates-parser';

type CurrencyCode = 'TRY' | 'GBP' | 'USD' | 'EUR' | 'CHF' | string;
export interface ConversionParams {
  amount: number;
  fromCC: CurrencyCode;
  dateAsIso: string;
  toCC: CurrencyCode;
  exchangeType: TcmbExchangeType | string;
}

interface IXRateGetter {
  findMany(criteria: { exchange_date: string }): Promise<CurrencyExchangeRateDto[]>;
}

export class CurrencyConversionService {
  constructor(private xrateRepository: IXRateGetter) {}

  async convert({ amount, fromCC, dateAsIso, toCC, exchangeType }: ConversionParams): Promise<number> {
    if (fromCC === toCC) return amount;
    if (Number(amount) === 0) return amount;

    let xrates = await this.xrateRepository.findMany({
      exchange_date: dateAsIso,
    });
    if (exchangeType) xrates = xrates.filter((f) => f.exchange_type === exchangeType);
    return this.doConversion(amount, fromCC, toCC, xrates);
  }
  private doConversion(amount: number, fromCC: CurrencyCode, toCC: CurrencyCode, xrates: CurrencyExchangeRateDto[]): number {
    const exactMatch = xrates.find((f) => f.currency_code === fromCC && f.target_currency_code === toCC);

    if (exactMatch) {
      return (amount / exactMatch.amount) * Number(exactMatch.target_amount);
    }
    const reverseMatch = xrates.find((f) => f.currency_code === toCC && f.target_currency_code === fromCC);
    if (reverseMatch) {
      return (amount * reverseMatch.amount) / Number(reverseMatch.target_amount);
    }
    // try match through common currency
    const sourceMatch = xrates.filter((f) => f.currency_code === fromCC || f.target_currency_code === fromCC);
    const targetMatch = xrates.filter((f) => f.currency_code === toCC || f.target_currency_code === toCC);
    const commonCurrenciesSet = new Set(sourceMatch.flatMap((f) => [f.currency_code, f.target_currency_code]).concat(targetMatch.flatMap((f) => [f.currency_code, f.target_currency_code])));
    const commonCurrencies = Array.from(commonCurrenciesSet).filter((f) => f !== fromCC && f !== toCC);
    if (commonCurrencies.length > 0) {
      const commonCurrency = commonCurrencies[0];

      const amountInCommonCurrency = this.doConversion(amount, fromCC, commonCurrency, xrates);
      return this.doConversion(amountInCommonCurrency, commonCurrency, toCC, xrates);
    }
    throw new Error(`cannot convert ${fromCC} to ${toCC}`);
  }
}

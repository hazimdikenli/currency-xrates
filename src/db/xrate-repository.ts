import { CurrencyExchangeRate, CurrencyExchangeRateCreate, KyselyPGDB } from './db-types'

const tableName = 'currency_exchange_rate'
export type CurrencyExchangeRateDto = {
  amount: number
  currency_code: string
  exchange_date: string
  exchange_type: string
  target_amount: string
  target_currency_code: string
}

export class XRateRepository {
  constructor(private db: KyselyPGDB) {}
  findMany(criteria: CriteriaType): Promise<CurrencyExchangeRateDto[]> {
    return this.db
      .selectFrom(tableName)
      .select([
        'exchange_date',
        'exchange_type',
        'amount',
        'currency_code',
        'target_amount',
        'target_currency_code',
      ])
      .where(eb => eb.and(criteria))
      .execute()
  }

  async createAll(rates: CurrencyExchangeRateCreate[]) {
    const created = await this.db.insertInto(tableName).values(rates).execute()
    console.log('Inserted:', created)
    return created
  }
}

type CriteriaType = Partial<Pick<CurrencyExchangeRate, 'exchange_date' | 'currency_code'>>

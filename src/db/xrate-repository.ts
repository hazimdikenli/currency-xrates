import { differenceBy, extend, isEqual, omit } from 'lodash';
import { CurrencyExchangeRate, CurrencyExchangeRateCreate, CurrencyExchangeRateTable, DB } from './db-types';
import { Kysely } from 'kysely';

const tableName = 'currency_exchange_rate';

export class XRateRepository {
  constructor(private db: Kysely<DB>) {}
  findMany(criteria: CriteriaType) {
    return this.db
      .selectFrom(tableName)
      .select(['exchange_date', 'exchange_type', 'amount', 'currency_code', 'target_amount', 'target_currency_code'])
      .where((eb) => eb.and(criteria))
      .execute();
  }

  async createAll(rates: CurrencyExchangeRateCreate[]) {
    const created = await this.db.insertInto(tableName).values(rates).execute();
    console.log('Inserted:', created);
    return created;
  }
}

type CriteriaType = Partial<Pick<CurrencyExchangeRate, 'exchange_date' | 'currency_code'>>;

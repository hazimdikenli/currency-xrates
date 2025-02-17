import type { Kysely, ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Numeric = ColumnType<string, number | string, number | string>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface CurrencyExchangeRateTable {
  amount: number
  created_at: Generated<Timestamp | null>
  currency_code: string
  exchange_date: string
  exchange_type: string
  id: Generated<number>
  target_amount: Numeric
  target_currency_code: string
}

export interface DB {
  currency_exchange_rate: CurrencyExchangeRateTable
}
export type KyselyPGDB = Kysely<DB>

export type CurrencyExchangeRate = Selectable<CurrencyExchangeRateTable>
export type CurrencyExchangeRateUpdate = Updateable<CurrencyExchangeRateTable>
export type CurrencyExchangeRateCreate = Insertable<CurrencyExchangeRateTable>

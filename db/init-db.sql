create table currency_exchange_rate
(
    id                   serial
        unique,
    exchange_date        date not null,
    amount               integer not null,
    currency_code        text not null,
    exchange_type        text not null,
    target_amount        numeric(17, 5) not null,
    target_currency_code text not null,
    created_at           timestamp default now(),
    primary key (exchange_date, exchange_type, currency_code, target_currency_code)
);
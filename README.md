# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/swagger with your browser to see the result.

## DB
Setup you db through env variables
`run db/init-db.sql`

## ENV
DB_HOST=
DB_PORT=5432
DB_USER=dba
DB_PASSWORD=very-secret
DB_NAME=db-name

LOG_LEVEL=debug


import { Elysia } from 'elysia';
import { logger } from '@bogeychan/elysia-logger';
import { createIoCContainer } from './ioc-container';

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      level: 'debug',
    })
  )
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

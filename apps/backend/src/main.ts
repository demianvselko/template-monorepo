import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppBootstrapFactory } from './infraestructure/http/bootstrap/app-bootstrap.factory';
import type { AppConfig } from './infraestructure/http/config/app.config';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await AppBootstrapFactory.create();

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    logger.error('App configuration could not be loaded');
    process.exit(1);
    return;
  }

  await app.listen(appConfig.port, appConfig.host);
  const url = await app.getUrl();

  logger.log(`Backend started at ${url}`);
}

bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error('Fatal error on bootstrap', error);
  process.exit(1);
});
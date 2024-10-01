import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EnvConfigServiceImpl } from './shared/infrastructure/env-config/env-config.service';
import { applyGlobalConfig } from 'global-configs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const envConfigService = app.get(EnvConfigServiceImpl);

  applyGlobalConfig(app, envConfigService);

  await app.listen(envConfigService.getPort(), '0.0.0.0');
}
bootstrap();

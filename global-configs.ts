import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigService } from 'src/shared/application/env-config/env-config.service';
import { BadRequestErrorFilter } from 'src/shared/infrastructure/exception-filters/bad-request-error.filter';
import { ConflictErrorFilter } from 'src/shared/infrastructure/exception-filters/conflict-error.filter';
import { InvalidCredentialsErrorFilter } from 'src/shared/infrastructure/exception-filters/invalid-credentials-error.filter';
import { ResourceFoundErrorFilter } from 'src/shared/infrastructure/exception-filters/resource-found-error.filter';
import { ResourceNotFoundErrorFilter } from 'src/shared/infrastructure/exception-filters/resource-not-found-error.filter';

export function applyGlobalConfig(
  app: INestApplication,
  envConfigService: EnvConfigService,
) {
  // Swagger configs
  if (envConfigService.getNodeEnv() === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Título do projeto')
      .setDescription('Descrição do projeto')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Informar o JWT para autorizar o acesso',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Cors configs
  app.enableCors({
    origin: envConfigService.getOrigin(),
    methods: envConfigService.getAllowedMethods(),
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Pipes config
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  // Error filters configs
  app.useGlobalFilters(
    new ConflictErrorFilter(),
    new InvalidCredentialsErrorFilter(),
    new ResourceNotFoundErrorFilter(),
    new ResourceFoundErrorFilter(),
    new BadRequestErrorFilter(),
  );
}

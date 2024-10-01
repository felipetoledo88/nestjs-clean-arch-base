import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigServiceImpl } from './env-config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: 'EnvConfigService', useClass: EnvConfigServiceImpl },
    EnvConfigServiceImpl,
  ],
  exports: ['EnvConfigService', EnvConfigServiceImpl],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      ...options,
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ],
    });
  }
}

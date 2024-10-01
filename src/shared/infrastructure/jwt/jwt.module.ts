import { JwtServiceImpl } from './jwt.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigServiceImpl } from '../env-config/env-config.service';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigServiceImpl) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpiresInSeconds(),
        },
      }),
      inject: [EnvConfigServiceImpl],
    }),
  ],
  controllers: [],
  providers: [{ provide: 'JwtService', useClass: JwtServiceImpl }],
  exports: ['JwtService'],
})
export class JwtConfigModule {}

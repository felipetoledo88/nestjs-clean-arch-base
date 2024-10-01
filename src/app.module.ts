import { EncryptionModule } from './shared/infrastructure/encryption/encryption.module';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/infrastructure/auth.module';

@Module({
  imports: [
    EncryptionModule,
    JwtModule,
    EnvConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EncryptionImpl } from './encryption';
import { EnvConfigModule } from '../env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [{ provide: 'Encryption', useClass: EncryptionImpl }],
  exports: ['Encryption'],
})
export class EncryptionModule {}

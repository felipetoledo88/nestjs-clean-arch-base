import { compareSync, hashSync } from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { Encryption } from 'src/shared/application/encryption/encryption';
import { EnvConfigService } from 'src/shared/application/env-config/env-config.service';

@Injectable()
export class EncryptionImpl implements Encryption {
  constructor(
    @Inject('EnvConfigService')
    private readonly envConfigService: EnvConfigService,
  ) {}

  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return compareSync(passwordCompare, passwordEncrypted);
  }

  generateHash(password: string): string {
    const salts = this.envConfigService.getEncryptionSalts();
    console.log('🚀 ~ EncryptionImpl ~ generateHash ~ salts:', salts);
    return hashSync(password, salts);
  }
}

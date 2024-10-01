import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '../../application/env-config/env-config.service';
import { ConfigService } from '@nestjs/config';

// Métodos que buscam as variáveis de ambiente
@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return +this.configService.get<string>('PORT');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpiresInSeconds(): number {
    return +this.configService.get<string>('JWT_EXPIRES_IN');
  }

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDbPort(): number {
    return +this.configService.get<string>('DB_PORT');
  }

  getDbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDbUsername(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getEncryptionSalts(): number {
    return +this.configService.get<string>('ENCRYPTION_SALTS');
  }

  getOrigin(): string {
    return this.configService.get<string>('ORIGIN');
  }

  getAllowedMethods(): string {
    return this.configService.get<string>('ALLOWED_METHODS');
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}

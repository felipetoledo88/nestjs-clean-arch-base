export interface EnvConfigService {
  getPort(): number;
  getJwtSecret(): string;
  getJwtExpiresInSeconds(): number;
  getDbHost(): string;
  getDbPort(): number;
  getDbName(): string;
  getDbUsername(): string;
  getDbPassword(): string;
  getEncryptionSalts(): number;
  getNodeEnv(): string;
  getOrigin(): string;
  getAllowedMethods(): string;
}

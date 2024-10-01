import { Users } from 'src/user/domain/user.entity';

export type GenerateJwtToken = {
  token: string;
};

export interface JwtService {
  generateJwt(user: Users): Promise<GenerateJwtToken>;
}
